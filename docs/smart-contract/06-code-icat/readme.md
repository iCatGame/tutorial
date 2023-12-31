---
sidebar_position: 5
---

# 编写`icat.sol`

在本小节中，我们将致力于编写`icat.sol`并实现其功能。

## 编写智能合约

`icat.sol`是整个项目智能合约的主文件，用以实现整个游戏的所有主要功能，因此其中的函数将会很多，我们会将其分解，一步一步完成这个大工程。

本小节中，我们首先完成合约中相关变量初始化的任务。打开`icat.sol`，在其中粘贴如下代码：

```solidity showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract iCat is ERC721, AccessControl {

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant HATCH_ROLE = keccak256("HATCH_ROLE");

    uint256 public ornamentPrice = 10;
    uint256 public priceOfMedicine = 30;

    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _tokenIdCounter;

    enum Stage {
        TEEN,  // 幼生期
        GROWING,  // 成长期
        ADULT  // 成熟
    }

    enum Food {
        leftover,  // 剩饭
        fishChip,  // 小鱼干
        tin  // 罐头
    }

    enum Ornament {
        hat,
        scarf,
        clothes
    }

    struct catDetail {
        string characterName;
        uint256 healthy;
        uint256 intimacy;  // 亲密度
        Stage stage;  // 成长时期
        uint256 progress;  // 成长进度
        uint256 hungry;  // 饥饿度
        uint256 feces;  // 排泄物
        bool hat;
        bool scarf;
        bool clothes;
    }

    mapping ( uint256 => catDetail ) public detail;  // 查看 NFT 详情(tokenId => detail)
    mapping ( address => uint256[] ) public ownedTokenId;  // 查看拥有的所有tokenId
    mapping ( uint256 => uint256 ) public growingProgress;  // 成长进度(Stage => 点数)
    mapping ( address => uint256 ) public credit;  // 用户的分数(userAddress => credit)
    mapping ( address => mapping ( uint256 => uint256 )) public foodBalance;  // 用户食物余额(userAddress => (Food => balance))
    mapping ( address => mapping ( uint256 => uint256 )) public ornamentBalance;  // 用户饰品余额(userAddress => (Ornament => balance))
    mapping ( address => uint256 ) public medicine;  // 药物余额
    mapping ( uint256 => uint256 ) public foodPrice;  // 食品价格(Food => price)
    mapping ( uint256 => uint256 ) public foodEnergy;  // 食品的能量(用于消除饥饿度)(Food => energy)
    mapping ( address => uint256 ) public lastCheckin;  // 记录上次签到时间(userAddress => lastCheckinTimestamp)
    mapping ( uint256 => uint256 ) public lastFeed;  // 记录上次喂食时间(tokenId => lastFeedTimestamp)
    mapping ( uint256 => uint256 ) public lastClear;  // 记录上次清理排泄物时间(tokenId => lastClearTimestamp)

    // 使用error减少gas消耗
    error notOwner(uint256 tokenId, address _user );
    error notYet();
    error creditNotEnough();
    error foodNotEnough();
    error medicineNotEnough();
    error notRegistered();
    error notExist();
    error alreadyAdult(uint256 tokenId);
    error alreadyDead(uint256 tokenId);
    error notDead(uint256 tokenId);

    // 定义事件用于检测小猫是否成熟
    event StageAfter(Stage indexed _stage);
    event BuryCat(uint256 indexed tokenId);
    event DataUpdated(uint256 tokenId, uint256 indexed healthy, uint256 indexed hungry, uint256 indexed feces, uint256 intimacy);

    constructor() ERC721("iCat", "iCat") {
        growingProgress[uint256(Stage.TEEN)] = 100;  // 幼生期长到成长期需要100点
        growingProgress[uint256(Stage.GROWING)] = 1000;  // 成长期长到成熟需要1000点
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(HATCH_ROLE, msg.sender);
        _initialFoodPrice(0, 5, 10);
        _initialFoodEnergy(1, 5, 10);  // 剩饭能量1防止没积分之后游戏陷入死锁
    }
    
    function setFoodPrice(uint256 _leftover, uint256 _fishChip, uint256 _tin) public onlyRole(ADMIN_ROLE) {
        foodPrice[uint256(Food.leftover)] = _leftover;
        foodPrice[uint256(Food.fishChip)] = _fishChip;
        foodPrice[uint256(Food.tin)] = _tin;
    }

    function setFoodEnergy(uint256 _leftover, uint256 _fishChip, uint256 _tin) public onlyRole(ADMIN_ROLE) {
        foodEnergy[uint256(Food.leftover)] = _leftover;
        foodEnergy[uint256(Food.fishChip)] = _fishChip;
        foodEnergy[uint256(Food.tin)] = _tin;
    }

    /**
    * @dev This is internal function
    */
    function _initialFoodPrice(uint256 _leftover, uint256 _fishChip, uint256 _tin) internal onlyRole(ADMIN_ROLE) {
        setFoodPrice(_leftover, _fishChip, _tin);
    }

    function _initialFoodEnergy(uint256 _leftover, uint256 _fishChip, uint256 _tin) internal onlyRole(ADMIN_ROLE) {
        setFoodEnergy(_leftover, _fishChip, _tin);
    }

    /** 
    * @dev This is the admin function
    */
    
    function _checkOwner(uint256 tokenId) internal view {
        if (ownerOf(tokenId) != msg.sender) {
            revert notOwner(tokenId, msg.sender);
        }
    }

    function _checkStageAdultOrNot(uint256 tokenId) internal view {
        if (detail[tokenId].stage == Stage.ADULT) {
            revert alreadyAdult(tokenId);
        }
    }

    function _checkDeadOrNot(uint256 tokenId) internal view {
        // 
    }

    function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, account);
    }

    function grantHatch(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(HATCH_ROLE, account);
    }

    // 对单独的NFT操作需要单独的访问控制
    modifier onlyOwner(uint256 tokenId) {
        _checkOwner(tokenId);
        _;
    }

    // 小猫成熟之后就不需要操作了
    modifier onlyNotAdult(uint256 tokenId) {
        _checkStageAdultOrNot(tokenId);
        _;
    }

    // 小猫死亡之后就不能进行操作了
    modifier onlyNotDead(uint256 tokenId) {
        _checkDeadOrNot(tokenId);
        _;
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

让我们分步拆解之前没见到过的代码：

### 修饰器（`modifier`）

首先让我们把目光放到第143行到159行。

```solidity
// 对单独的NFT操作需要单独的访问控制
modifier onlyOwner(uint256 tokenId) {
    _checkOwner(tokenId);
    _;
}

// 小猫成熟之后就不需要操作了
modifier onlyNotAdult(uint256 tokenId) {
    _checkStageAdultOrNot(tokenId);
    _;
}

// 小猫死亡之后就不能进行操作了
modifier onlyNotDead(uint256 tokenId) {
    _checkDeadOrNot(tokenId);
    _;
}
```

这三个以`modifier`开头的、类似于函数的成分被称为**修饰器（`modifier`）**，使用修饰器可以让函数在执行之前自动执行一些语句。对于本合约来说，上述三个修饰器分别会在函数执行之前，分别调用`_checkOwner(uint256)`、`_checkStageAdultOrNot(uint256)`、`_checkDeadOrNot(uint256)`，如果这三个函数执行成功，则该函数就可以继续执行下去，否则就会 revert。

### 变量

让我们把目光返回到第11行，在11行到20行这些变量中，下面这行代码是个全新的面孔：

```solidity
using SafeMath for uint256;
```

与[这里](../05-egg-detail/readme.md)提到的`using Counters for Counters.Counter`类似，`using SafeMath for uint256`就是将`SafeMath`的运算规则赋予`uint256`变量类型。

:::info

`SafeMath`是一套由 OpenZeppelin 开发的安全的整数运算规范，可以避免整数在运算过程中出现溢出等漏洞。

:::

### `enum`和结构体

第22行到51行的`enum`和`struct`变量，分别定义了 iCat 的成长阶段、食物的分类、装饰品的分类以及一只猫所具有的所有属性。

### 映射

接下来从第53行到64行的代码，定义了若干类似于其他语言中字典的映射变量，每个映射变量所对应的功能都在后面以注释的方式注明，这里不再赘述。

### 事件

79行到81行的`event`语句，能够在合约执行相应代码之后抛出，被区块浏览器或者后端等捕捉之后进一步处理逻辑。

:::tip

一个`event`只能 index 3个参数，因此需要做好取舍。

:::

### 变量初始化函数

接下来92行到114行用于设置变量的初始值。

至此，合约代码解释完毕，下面开始部署测试。

## 测试智能合约

仍使用 hardhat 编写测试用例。

### 编写测试用例

打开`test.js`，将之前`main`函数中的`egg`合约的测试用例都注释掉，然后在`main`函数的最上面加入以下代码：

```js
// 部署cat合约
const catFactory = await ethers.getContractFactory("iCat");
const catContract = await catFactory.deploy();
await catContract.deployed();
console.log("Cat NFT deployed to:", catContract.address);
```



### 运行测试用例

在终端输入`npx hardhat run .\scripts\test.js`，看到以下输出日志则证明合约执行正确。

```sh
Compiled 2 Solidity files successfully
Cat NFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```



下一小节中，我们将进一步完善我们的`iCat`合约。
