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

并将`icat.sol`扩展为下面的代码：
<details>
  <summary>`icat.sol`，<u>点击展开</u></summary>
  <div>
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;

    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/access/AccessControl.sol";
    import "@openzeppelin/contracts/utils/Counters.sol";
    import "@openzeppelin/contracts/utils/math/SafeMath.sol";

    interface egg {
        // 方便签到的时候查看蛋的余额
        function balanceOf(address account) external view returns (uint256);
    }

    contract iCat is ERC721, AccessControl {

        bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
        bytes32 public constant HATCH_ROLE = keccak256("HATCH_ROLE");

        uint256 public ornamentPrice = 10;
        address public eggContract;
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

        function getDetail(uint256 tokenId) public view returns (catDetail memory) {
            return detail[tokenId];
        }

        function getOwnedTokenId(address owner) public view returns (uint256[] memory, uint256) {
            return (ownedTokenId[owner], ownedTokenId[owner].length);
        }

        function totalSupply() public view returns (uint256) {
            return _tokenIdCounter.current();
        }

        function mint() public onlyRole(HATCH_ROLE) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            // 这里使用tx.origin是因为孵蛋是由egg合约调用的
            _safeMint(tx.origin, tokenId);
            ownedTokenId[tx.origin].push(tokenId);

            // mint完猫之后给猫初始化Detail数据
            catDetail memory defaultDetail = catDetail({
                characterName: "iCat",  // 默认名字为iCat
                healthy: 100,  // 初始健康值100
                intimacy: 0,  // 初始亲密度为0
                stage: Stage.TEEN,  // 默认为幼生期
                progress: 0,  // 初始成长进度为0
                hungry: 0,  // 初始饥饿度为0
                feces: 0,  // 初始排泄物为0
                hat: false,
                scarf: false,
                clothes: false
            });
            detail[tokenId] = defaultDetail;
            lastFeed[tokenId] = block.timestamp;
            lastClear[tokenId] = block.timestamp;
        }

        // 初始化用户积分，用于外部调用
        function initCredit(address _user, uint256 _credit) public onlyRole(HATCH_ROLE) {
            if (balanceOf(_user) == 0) {
                credit[_user] = _credit;
            }
        }

        // 更改用户积分，用于孵蛋扣除积分
        function updateCredit(address _user, uint256 _credit) public onlyRole(HATCH_ROLE) {
            credit[_user] -= _credit;
        }

        function canCheckIn(address _user) public view returns (bool) {
            // 没有猫也没有蛋才算未注册
            if (balanceOf(_user) == 0 && egg(eggContract).balanceOf(_user) == 0) {
                return false;
            }
            else if (lastCheckin[_user] == 0) {
                return true;
            }
            else if (block.timestamp < lastCheckin[_user] + 1 days) {
                return false;
            }
            return true;
        }

        // 每日签到
        function checkIn() public {
            if (!canCheckIn(msg.sender)) {
                revert notYet();
            }
            credit[msg.sender] += 5;
            lastCheckin[msg.sender] = block.timestamp;
        }

        // 添加iCat昵称
        function changeNickname(uint256 tokenId, string memory newName) public onlyOwner(tokenId) {
            detail[tokenId].characterName = newName;
        }

        // 购买装饰品
        function buyOrnament(Ornament _ornament, uint256 _amount) public {
            if (credit[msg.sender] < SafeMath.mul(ornamentPrice, _amount)) {
                revert creditNotEnough();
            }
            ornamentBalance[msg.sender][uint256(_ornament)] += _amount;
            credit[msg.sender] -= SafeMath.mul(ornamentPrice, _amount);
        }

        // 添加装饰品
        function addOrnament(uint256 tokenId, Ornament ornament) public onlyOwner(tokenId) onlyNotDead(tokenId) {
            if (ornament == Ornament.hat) {
                detail[tokenId].hat = true;
            }
            else if (ornament == Ornament.scarf) {
                detail[tokenId].scarf = true;
            }
            else if (ornament == Ornament.clothes) {
                detail[tokenId].clothes = true;
            }
            else {
                revert notExist();
            }
            ornamentBalance[msg.sender][uint256(ornament)] -= 1;

            // 悄悄加上上链函数
            examCat(tokenId);
        }

        // 取下饰品
        function removeOrnament(uint256 tokenId, Ornament ornament) public onlyOwner(tokenId) onlyNotDead(tokenId) {
            if (credit[msg.sender] < ornamentPrice) {
                revert creditNotEnough();
            }
            if (ornament == Ornament.hat) {
                detail[tokenId].hat = false;
            }
            else if (ornament == Ornament.scarf) {
                detail[tokenId].scarf = false;
            }
            else if (ornament == Ornament.clothes) {
                detail[tokenId].clothes = false;
            }
            else {
                revert notExist();
            }
            ornamentBalance[msg.sender][uint256(ornament)] += 1;

            // 悄悄加上上链函数
            examCat(tokenId);
        }

        function buyFood(Food _food, uint256 _amount) public {
            if (credit[msg.sender] < SafeMath.mul(foodPrice[uint256(_food)], _amount)) {
                revert creditNotEnough();
            }
            foodBalance[msg.sender][uint256(_food)] += _amount;
        }

        // 撸猫加积分和亲密度
        function pet(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) returns (uint256) { 
            credit[msg.sender] += 5;
            detail[tokenId].intimacy += 5;
            return credit[msg.sender];
        }

        // 给小猫喂食
        function feedCat(uint256 tokenId, Food _food, uint256 _amount) public onlyOwner(tokenId) onlyNotAdult(tokenId) onlyNotDead(tokenId) returns (bool) {
            if (foodBalance[msg.sender][uint256(_food)] < _amount) {
                revert foodNotEnough();
            }
            foodBalance[msg.sender][uint256(_food)] -= _amount;
            /**
            * 更新成长进度
            */
            //  成长进度加上亲密度权重
            uint256 weightEnergy = SafeMath.mul((calculateIntimacy(tokenId) + 1), foodEnergy[uint256(_food)]);
            uint256 simulateProgress = SafeMath.add(detail[tokenId].progress, SafeMath.mul(_amount, weightEnergy));
            // 如果加上食物的能量之后小猫能够突破下一阶段
            if (growingProgress[uint256(detail[tokenId].stage)] <= simulateProgress) {
                // 设置新的小猫progress
                detail[tokenId].progress = SafeMath.sub(simulateProgress, growingProgress[uint256(detail[tokenId].stage)]);
                // 小猫进阶到下一阶段
                detail[tokenId].stage = Stage(uint256(detail[tokenId].stage) + 1);
            }
            // 如果不能突破
            else {
                detail[tokenId].progress = SafeMath.add(detail[tokenId].progress, SafeMath.mul(_amount, weightEnergy));
            }

            /**
            * 减少饥饿度
            */
            if (calculateHunger(tokenId) < SafeMath.mul(_amount, foodEnergy[uint256(_food)])) {
                detail[tokenId].hungry = 0;
            }
            else {
                detail[tokenId].hungry = SafeMath.sub(calculateHunger(tokenId), SafeMath.mul(_amount, foodEnergy[uint256(_food)]));
            }
            // 无论如何都能增加亲密度
            detail[tokenId].intimacy = calculateIntimacy(tokenId) + 1;

            lastFeed[tokenId] = block.timestamp;

            // 返回值用于证明小猫是否成熟
            emit StageAfter(detail[tokenId].stage);
            if (detail[tokenId].stage == Stage.ADULT) {
                return true;
            }
            return false;
        }

        // 清理排泄物
        function clearFeces(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) {
            // 排泄物清除
            detail[tokenId].feces = 0;
            // 好感度+1
            detail[tokenId].intimacy += 1;
            lastClear[tokenId] = block.timestamp;
        }

        // 计算猫的排泄物
        function calculateFeces(uint256 tokenId) public view returns (uint256) {
            return (block.timestamp - lastClear[tokenId]) / 3600;
        }

        // 计算饥饿度
        function calculateHunger(uint256 tokenId) public view returns (uint256) {
            uint256 startTime;
            if (detail[tokenId].hungry == 0) {
                startTime = SafeMath.add(lastFeed[tokenId], 8 hours);
            }
            else {
                startTime = lastFeed[tokenId];
            }
            if (startTime > block.timestamp) {
                return detail[tokenId].hungry;
            }
            return SafeMath.sub(block.timestamp, startTime) / 3600 + detail[tokenId].hungry;
        }

        // 计算实时健康度
        function calculateHealth(uint256 tokenId) public view returns (uint256) {
            uint256 fecesDamage;
            uint256 hungryDamage;
            if (calculateFeces(tokenId) < 10) {
                fecesDamage = 0;
            }
            else {
                fecesDamage = calculateFeces(tokenId) - 10;
            }
            if (calculateHunger(tokenId) < 10) {
                hungryDamage = 0;
            }
            else {
                hungryDamage = calculateHunger(tokenId) - 10;
            }
            if (detail[tokenId].healthy < fecesDamage + hungryDamage) {
                return 0;
            }
            return SafeMath.sub(detail[tokenId].healthy, SafeMath.add(fecesDamage, hungryDamage));
        }

        // 计算上述因素导致的亲密度变化
        function calculateIntimacy(uint256 tokenId) public view returns (uint256) {
            uint256 fecesDamage;
            uint256 hungryDamage;
            if (calculateFeces(tokenId) < 10) {
                fecesDamage = 0;
            }
            else {
                fecesDamage = calculateFeces(tokenId) - 10;
            }
            if (calculateHunger(tokenId) < 10) {
                hungryDamage = 0;
            }
            else {
                hungryDamage = calculateHunger(tokenId) - 10;
            }
            if (detail[tokenId].intimacy < (hungryDamage) + (hungryDamage)) {
                return 0;
            }
            return detail[tokenId].intimacy - (hungryDamage) - (hungryDamage);
        }

        // 买药
        function buyMedicine(uint256 _amount) public {
            if (credit[msg.sender] < SafeMath.mul(_amount, priceOfMedicine)) {
                revert creditNotEnough();
            }
            credit[msg.sender] = SafeMath.sub(credit[msg.sender], SafeMath.mul(_amount, priceOfMedicine));
            medicine[msg.sender] += _amount;
        }

        // 恢复健康度
        function cure(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) {
            if (medicine[msg.sender] == 0) {
                revert medicineNotEnough();
            }
            detail[tokenId].healthy = 100;
            medicine[msg.sender] -= 1;
        }

        // 将猫的健康值、排泄物、饥饿值上链
        function examCat(uint256 tokenId) public {
            uint256 healthy = calculateHealth(tokenId);
            uint256 hungry = calculateHunger(tokenId);
            uint256 feces = calculateFeces(tokenId);
            uint256 intimacy = calculateIntimacy(tokenId);
            detail[tokenId].healthy = healthy;
            detail[tokenId].hungry = hungry;
            detail[tokenId].feces = feces;
            detail[tokenId].intimacy = intimacy;
            emit DataUpdated(tokenId, healthy, hungry, feces, intimacy);
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

        // 将去世的猫埋葬
        function buryCat(uint256 tokenId) public onlyOwner(tokenId) {
            if (calculateHealth(tokenId) != 0) {
                revert notDead(tokenId);
            }
            _burn(tokenId);
            int256 index = binarySearch(ownedTokenId[msg.sender], tokenId);
            if (index >= 0) {
                for (uint256 i = uint256(index); i < ownedTokenId[msg.sender].length - 1; i++) {
                    ownedTokenId[msg.sender][i] = ownedTokenId[msg.sender][i + 1];
                }
                ownedTokenId[msg.sender].pop();
            }
            emit BuryCat(tokenId);
        }

        /** 
        * @dev This is the admin function
        */
        function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
            _grantRole(ADMIN_ROLE, account);
        }

        function grantHatch(address account) public onlyRole(ADMIN_ROLE) {
            _grantRole(HATCH_ROLE, account);
        }

        function setOrnamentPrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
            ornamentPrice = _price;
        }

        function setMedicinePrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
            priceOfMedicine = _price;
        }

        function setEggContract(address _eggCA) public onlyRole(ADMIN_ROLE) {
            eggContract = _eggCA;
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
            if (calculateHealth(tokenId) == 0) {
                revert alreadyDead(tokenId);
            }
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
    }
    ```
  </div>
</details>
具体添加的代码可以到[这里](https://www.sojson.com/gongju/textdiff.html)自行对比。通过添加的代码，将两份代码文件组合成了一个完成的项目智能合约文件。

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