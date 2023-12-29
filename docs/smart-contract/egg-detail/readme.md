---
sidebar_position: 4
---

# 完善宠物蛋功能

在上一小节中，我们开发并测试了最初版本的宠物蛋合约，在本小节中，我们将进一步完善其功能。

## 编写智能合约

将上述`egg.sol`中的代码扩展为下面的内容：

```solidity showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract iCatEgg is ERC721, AccessControl {

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    enum Color {
        WHITE,
        GREEN,
        BLUE,
        PURPLE,
        RED
    }

    mapping ( uint256 => Color ) colorOfEgg;
    mapping ( address => uint256[] ) public ownedTokenId;  // 查看拥有的所有tokenId

    // 使用error处理错误更加省gas
    error notOwner(uint256 tokenId, address account);

    constructor() ERC721("iCat Egg", "EGG") {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function getColor(uint256 tokenId) public view returns (Color) {
        return colorOfEgg[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://";
    }

    function getOwnedTokenId(address owner) public view returns (uint256[] memory, uint256) {
        return (ownedTokenId[owner], ownedTokenId[owner].length);
    }

    // 铸造蛋
    function mint() public {
        // 随机赋予蛋颜色
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
        );
        uint256 enumLength = uint256(Color.RED) + 1;
        uint256 selectedIndex = randomNumber % enumLength;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        colorOfEgg[tokenId] = Color(selectedIndex);

        // 铸造蛋NFT
        _safeMint(msg.sender, tokenId);  
        ownedTokenId[tx.origin].push(tokenId);
    }

    // 二分查找特定值的索引
    function binarySearch(uint256[] storage arr, uint256 value) internal view returns (int256) {
        int256 left = 0;
        int256 right = int256(arr.length) - 1;

        while (left <= right) {
            int256 mid = left + (right - left) / 2;
            if (arr[uint256(mid)] == value) {
                return mid;
            }
            if (arr[uint256(mid)] < value) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    // 孵化蛋
    function hatchOut(uint256 tokenId) public {
        // 只有蛋的拥有者才能孵化
        if (ownerOf(tokenId) != msg.sender) {
            revert notOwner(tokenId, msg.sender);
        }

        // 燃烧掉蛋，铸造iCat
        _burn(tokenId);
        int256 index = binarySearch(ownedTokenId[msg.sender], tokenId);
        if (index >= 0) {
            for (uint256 i = uint256(index); i < ownedTokenId[msg.sender].length - 1; i++) {
                ownedTokenId[msg.sender][i] = ownedTokenId[msg.sender][i + 1];
            }
            ownedTokenId[msg.sender].pop();
        }
    }


    /** 
    * @dev This is the admin function
    */
    function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, account);
    }


    /**
    * @dev The following functions are overrides required by Solidity.
    */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
```

让我们尽可能拆解上述代码进行讲解。

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

这两行通过引入两个 OpenZeppelin 的库，来解决智能合约的细粒度访问控制，以及实现ERC721代币计数管理。

```solidity
bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
```

这行代码是将字符串形式的`ADMIN_ROLE`通过`keccak256`函数哈希化为一个`bytes32`变量，有利于gas优化和slot管理。

```solidity
using Counters for Counters.Counter;
Counters.Counter private _tokenIdCounter;
```

这两行代码是将`Counters`的运算规则赋予`Counters.counter`，方便后续运算；然后创建一个新的计数变量`_tokenIdCounter`。

```solidity
enum Color {
    WHITE,
    GREEN,
    BLUE,
    PURPLE,
    RED
}
```

这几行是创建了一组`enum`变量，最后得到的就是`WHITE`为 0 ，`GREEN`为 1 ，以此类推，`enum`变量可以与`uint256`等类型相互转化。

```solidity
mapping ( uint256 => Color ) colorOfEgg;
mapping ( address => uint256[] ) public ownedTokenId;  // 查看拥有的所有tokenId
```

这两行是创建了两个映射变量，`colorOfEgg`用以查看某个`tokenId`的宠物蛋NFT的颜色，`ownedTokenId`用以查看某地址所拥有的所有宠物蛋NFT的`tokenId`（不包括已经 burn 掉的）。

```solidity
error notOwner(uint256 tokenId, address account);
```

这行是 solidity 0.8 之后添加的新的错误处理方式，不同于以往的 `revert`和`require`，通过`error`方式进行错误处理，能够对错误进行统一管理，并且限制了错误消息的长度，更加省gas，我们后面会经常使用这种错误处理方式。

```solidity
constructor() ERC721("iCat Egg", "EGG") {
    _grantRole(ADMIN_ROLE, msg.sender);
}
```

这里我们在构造函数终添加了一行`_grantRole(ADMIN_ROLE, msg.sender);`，通过调用 OpenZeppelin 的 AccessControl 中的库函数，给部署本合约的地址（`msg.sender`）授予`ADMIN_ROLE`。

```solidity
function getColor(uint256 tokenId) public view returns (Color) {
    return colorOfEgg[tokenId];
}

function totalSupply() public view returns (uint256) {
    return _tokenIdCounter.current();
}

function _baseURI() internal pure override returns (string memory) {
    return "https://";
}

function getOwnedTokenId(address owner) public view returns (uint256[] memory, uint256) {
    return (ownedTokenId[owner], ownedTokenId[owner].length);
}

```

上述四个函数分别用来获取宠物蛋的颜色、目前共有多少宠物蛋在流通、宠物蛋的 metadata URI、以及某个地址所拥有的宠物蛋所有编号以及总数量。

:::info

最通用的区块浏览器 Etherscan 通过读取`totalSupply`函数来获取目前流通的该种 NFT 的数量，因此需要自定义一个`totalSupply`函数来供 Etherscan 调用。

:::

:::tip

注意上述函数名后面的修饰成分，包括`public`、`view`、`pure`等，一定要清楚每一个修饰成分的用法。

:::

```solidity showLineNumbers
function mint() public {
    // 随机赋予蛋颜色
    uint256 randomNumber = uint256(
        keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
    );
    uint256 enumLength = uint256(Color.RED) + 1;
    uint256 selectedIndex = randomNumber % enumLength;
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    colorOfEgg[tokenId] = Color(selectedIndex);

    // 铸造蛋NFT
    _safeMint(msg.sender, tokenId);  
    ownedTokenId[tx.origin].push(tokenId);
}
```

上述函数中，第 3-7 行用以生成一个随机的颜色变量，使得每一次铸造的新的宠物蛋都能够随机获得颜色。剩下的代码就是`tokenId`顺延加1，并为`msg.sender`铸造 token id 为`tokenId`的NFT。

:::warning

注意，由于以太坊主网已经从 PoW 过度到了 PoS ，因此`block.difficulty`已经被弃用了，如果想要在以太坊主网上部署智能合约，请不要这样生成随机数。

:::

```solidity
// 孵化蛋
function hatchOut(uint256 tokenId) public {
    // 只有蛋的拥有者才能孵化
    if (ownerOf(tokenId) != msg.sender) {
        revert notOwner(tokenId, msg.sender);
    }

    // 燃烧掉蛋，铸造iCat
    _burn(tokenId);
    int256 index = binarySearch(ownedTokenId[msg.sender], tokenId);
    if (index >= 0) {
        for (uint256 i = uint256(index); i < ownedTokenId[msg.sender].length - 1; i++) {
            ownedTokenId[msg.sender][i] = ownedTokenId[msg.sender][i + 1];
        }
        ownedTokenId[msg.sender].pop();
    }
}
```

上述代码实现了孵化宠物蛋的功能，首先燃烧掉宠物蛋，并通过合约内调用`icat`合约 的`mint`函数铸造一个新的宠物猫（等 icat 合约写好后添加）。

```solidity
function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
    _grantRole(ADMIN_ROLE, account);
}
```

上述代码实现了`ADMIN_ROLE`的权限授予。

<br></br>

至此，合约代码设计完成。接下来，就是合约测试环节。

## 测试智能合约

仍然使用 hardhat 编写智能合约测试用例。

### 编写测试用例

打开`test.js`，在`main`函数中`console.log`下一行插入下面代码：

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
// 铸造一个蛋
const mintEgg = await eggContract.mint();
console.log("Mint succesful");

// 查看蛋的颜色
const getColor = await eggContract.getColor(0);
console.log("The color of egg #0 is", getColor);

// 授予第二个admin以admin权限
const grantAdmin = await eggContract.grantAdmin(randomGuy.address);
console.log("grant successful")

// 孵化蛋
const hatch = await eggContract.hatchOut(0);
console.log("Hatched out successfully");
```

让我们逐行来看

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
```

hardhat 在运行脚本时，会使用助记词`test test test test test test test test test test test junk`生成一系列钱包，在脚本执行过程中，会默认使用生成的第一个地址。通过本行代码，可以逐个获取改助记词下生成的一系列地址，例如，在本代码中，`guy`、`randomGuy`和`hacker`分别为该助记词下生成的前三个地址。

```js
const mintEgg = await eggContract.mint();
console.log("Mint succesful");
```

这两行代码用以使用默认地址铸造一个宠物蛋，铸造成功之后输出`Mint successful`，铸造不成功则中断并抛出异常。

后面的测试用例用途均可从注释获取，这里不做进一步阐述。

### 运行测试用例

打开终端，执行以下命令：

```sh
npx hardhat run .\scripts\test.js
```

看到以下输出则证明执行正确。

```sh
Compiled 16 Solidity files successfully
NFT contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Mint succesful
The color of egg #0 is 0
grant successful
Hatched out successfully
```

