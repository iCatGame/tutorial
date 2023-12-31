---
sidebar_position: 8
---

# 将两个合约结合

在以上四个小节中，我们分别完成和测试了`egg.sol`和`icat.sol`两个智能合约。为了完成整个项目的智能合约，在本小节中，我们会将两个智能合约结合起来，形成一个具有完整功能的体系。

## 智能合约编写

首先让我们来完善`egg.sol`。要使`iCatEgg`智能合约在孵蛋的同时能够铸造`iCat`，那么在`iCatEgg`合约里就必须能够调用`iCat`合约中的`mint`函数，因此将`egg.sol`扩展为下面的代码：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./icat.sol";

contract iCatEgg is ERC721, AccessControl {
    iCat public icat;

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

    constructor(address iCatAddress) ERC721("iCat Egg", "EGG") {
        icat = iCat(iCatAddress);
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

        // 初始积分100
        icat.initCredit(msg.sender, 100);
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
        // 孵化扣除积分10
        icat.updateCredit(msg.sender, 10);

        // 燃烧掉蛋，铸造iCat
        _burn(tokenId);
        int256 index = binarySearch(ownedTokenId[msg.sender], tokenId);
        if (index >= 0) {
            for (uint256 i = uint256(index); i < ownedTokenId[msg.sender].length - 1; i++) {
                ownedTokenId[msg.sender][i] = ownedTokenId[msg.sender][i + 1];
            }
            ownedTokenId[msg.sender].pop();
        }
        icat.mint();
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

具体添加的代码可以到[这里](https://www.sojson.com/gongju/textdiff.html)自行对比。`icat.sol`代码较长，就不放在这里了，可以到本项目的[仓库](https://github.com/iCatGame/smartContract/blob/main/contracts/icat.sol)中查看。通过添加的代码，将两份代码文件组合成了一个完成的项目智能合约文件。

## 测试用例的编写和运行

将`test.js`中`main`函数的内容替换为以下内容：

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();

// 部署cat合约
const catFactory = await ethers.getContractFactory("iCat");
const catContract = await catFactory.deploy();
await catContract.deployed();
console.log("Cat NFT deployed to:", catContract.address);

// 部署蛋的合约
const eggFactory = await ethers.getContractFactory("iCatEgg");
const eggContract = await eggFactory.deploy(catContract.address);
await eggContract.deployed();
console.log('NFT contract deployed to:', eggContract.address);

// 给予蛋的合约以孵化的权限
await catContract.grantHatch(eggContract.address);
console.log("grant successful");

// 将蛋的合约设置进猫的合约中
await catContract.setEggContract(eggContract.address);
console.log("set successfully")

// 铸造一个蛋
const mintEgg = await eggContract.mint();
console.log("Mint succesful");

// // 查看蛋的颜色
// const getColor = await eggContract.getColor(1);
// console.log("The color of egg #1 is", getColor);

// 授予第二个admin以admin权限
const grantAdmin = await eggContract.grantAdmin(randomGuy.address);
console.log("grant successful")

// 孵化蛋
const hatch = await eggContract.hatchOut(0);
console.log("Hatched out successfully");

// 查看孵化完有多少分
const creditAfterHatch = await catContract.credit(guy.address);
console.log("Credit after hatching out is", creditAfterHatch);

// // 有蛋的用户和没蛋的用户分别签到
// await catContract.checkIn();
// console.log("Check successfully");
// await catContract.connect(randomGuy).checkIn();
// console.log("Check successfully, there must be something wrong in ca")

// 查看默认情况下猫的属性
const defaultCat = await catContract.getDetail(0);
console.log(defaultCat);

// 更改猫的名字并重新查看
await catContract.changeNickname(0, "小黑子");
const newCat = await catContract.getDetail(0);
console.log(newCat);
// // 其他账号也想改，测试访问控制
// await catContract.connect(randomGuy).changeNickname(0, "ikun");
// const newCat2 = await catContract.getDetail(0);
// console.log(newCat2);

// 购买饰品然后查看积分和小猫状态
await catContract.buyOrnament(0, 0);
const creditAfterBuy = await catContract.credit(guy.address);
console.log("Credit after buying ornament is", creditAfterBuy);
const catAfterBuy = await catContract.getDetail(0);
console.log(catAfterBuy);

// 购买2个小鱼干并输出购买后的积分与小鱼干余额
await catContract.buyFood(1, 3);
const creditAfterBuyFood = await catContract.credit(guy.address);
console.log("Credit after buying food is", creditAfterBuyFood);
const foodAfterBuy = await catContract.foodBalance(guy.address, 1);
console.log("FIsh chips balance:", foodAfterBuy);

// 喂食
const feed = await catContract.feedCat(0, 1, 2);
const stage = await feed.wait();
console.log("Adult?:", stage.events[0].args);
const catAfterFeed = await catContract.getDetail(0);
console.log('Cat After Feed:', catAfterFeed);

// 计算排泄物
const poop = await catContract.calculateFeces(0);
console.log("Feces of iCat #0 is", poop);

const hungery = await catContract.calculateHunger(0);
console.log("The cat's hungry data is", hungery);

await catContract.mint();
await catContract.mint();
await catContract.mint();
const cats = await catContract.getOwnedTokenId(guy.address);
console.log("Owned token ids:", cats);

// 测试未死亡能不能埋葬
// await catContract.buryCat(2);
// const newCats = await catContract.getOwnedTokenId(guy.address);
// console.log(newCats)

const canCheckedIn = await catContract.canCheckIn(guy.address);
console.log(canCheckedIn);
```

运行之后得到以下输出：

```log
Cat NFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
NFT contract deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
grant successful
set successfully
Mint succesful
grant successful
Hatched out successfully
Credit after hatching out is BigNumber { value: "90" }
[
  'iCat',
  BigNumber { value: "100" },
  BigNumber { value: "0" },  
  0,
  BigNumber { value: "0" },  
  BigNumber { value: "0" },  
  BigNumber { value: "0" },  
  false,
  false,
  false,
  characterName: 'iCat',
  healthy: BigNumber { value: "100" },
  intimacy: BigNumber { value: "0" },
  stage: 0,
  progress: BigNumber { value: "0" },
  hungry: BigNumber { value: "0" },
  feces: BigNumber { value: "0" },
  hat: false,
  scarf: false,
  clothes: false
]
[
  '小黑子',
  BigNumber { value: "100" },
  BigNumber { value: "0" },
  0,
  BigNumber { value: "0" },
  BigNumber { value: "0" },
  BigNumber { value: "0" },
  false,
  false,
  false,
  characterName: '小黑子',
  healthy: BigNumber { value: "100" },
  intimacy: BigNumber { value: "0" },
  stage: 0,
  progress: BigNumber { value: "0" },
  hungry: BigNumber { value: "0" },
  feces: BigNumber { value: "0" },
  hat: false,
  scarf: false,
  clothes: false
]
Credit after buying ornament is BigNumber { value: "90" }
[
  '小黑子',
  BigNumber { value: "100" },
  BigNumber { value: "0" },
  0,
  BigNumber { value: "0" },
  BigNumber { value: "0" },
  BigNumber { value: "0" },
  false,
  false,
  false,
  characterName: '小黑子',
  healthy: BigNumber { value: "100" },
  intimacy: BigNumber { value: "0" },
  stage: 0,
  progress: BigNumber { value: "0" },
  hungry: BigNumber { value: "0" },
  feces: BigNumber { value: "0" },
  hat: false,
  scarf: false,
  clothes: false
]
Credit after buying food is BigNumber { value: "90" }
FIsh chips balance: BigNumber { value: "3" }
Adult?: [ 0, _stage: 0 ]
Cat After Feed: [
  '小黑子',
  BigNumber { value: "100" },
  BigNumber { value: "1" },
  0,
  BigNumber { value: "10" },
  BigNumber { value: "0" },
  BigNumber { value: "0" },
  false,
  false,
  false,
  characterName: '小黑子',
  healthy: BigNumber { value: "100" },
  intimacy: BigNumber { value: "1" },
  stage: 0,
  progress: BigNumber { value: "10" },
  hungry: BigNumber { value: "0" },
  feces: BigNumber { value: "0" },
  hat: false,
  scarf: false,
  clothes: false
]
Feces of iCat #0 is BigNumber { value: "0" }
The cat's hungry data is BigNumber { value: "0" }
Owned token ids: [
  [
    BigNumber { value: "0" },
    BigNumber { value: "1" },
    BigNumber { value: "2" },
    BigNumber { value: "3" }
  ],
  BigNumber { value: "4" }
]
true
```

并且注释中的错误处理部分，在取消注释之后能够正常识别错误并抛出异常，则表明合约运行成功。

在下一小节中，我们将把写好的智能合约部署到 arbitrum goerli 测试网上。