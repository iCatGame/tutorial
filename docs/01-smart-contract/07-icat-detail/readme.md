---
sidebar_position: 6
---

# 完善`iCat`功能

在上一小节中，我们开发并测试了`iCat`合约中最基本的功能。在本小节中，我们将进一步开发并完善`iCat`合约。

## 编写智能合约

打开`icat.sol`，在构造函数后面插入下面的代码：

```solidity showLineNumbers
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

functioncanCheckIn(address _user) public view returns (bool) {
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
```

将`_checkDeadOrNot`函数替换为下面内容：

```solidity
function _checkDeadOrNot(uint256 tokenId) internal view {
    if (calculateHealth(tokenId) == 0) {
        revert alreadyDead(tokenId);
    }
}
```

在`admin`权限的那些函数中添加如下函数：

```solidity
function setOrnamentPrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
    ornamentPrice = _price;
}

function setMedicinePrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
    priceOfMedicine = _price;
}

function setEggContract(address _eggCA) public onlyRole(ADMIN_ROLE) {
    eggContract = _eggCA;
}
```

让我们解释一下添加代码的主体部分。

首先`getDetail`、`getOwnedTokenId`和`totalSupply`函数分别用来获取宠物猫的属性、某个地址拥有的所有宠物猫和宠物猫的发行量。

:::tip

solidity 语言会标注为`public`的变量（包括映射）都分配一个`getter`函数，可以像函数一样直接调用变量名得到结果。实际生产环境中，为了节省gas，无需像本合约一样单独为`public`变量单独设置读取函数。

:::

接下来要讲解的是一个`mint`函数：

```solidity
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
```

在铸造iCat之后为新铸造的猫初始化一个默认属性。并将上次喂食时间和上次清理排泄物的时间都设置为铸造该 NFT 时的时间戳。

:::info

本函数和接下来的很多函数都添加了`onlyRole(HATCH_ROLE)`和`onlyRole(ADMIN_ROLE)`，这是由 OpenZeppelin 提供的更细粒度的访问控制（Access Control）方式，有助于提升合约安全。

:::

```solidity
functioncanCheckIn(address _user) public view returns (bool) {
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
```

接下来这两个函数用来实现每日签到的功能。之所以拆成两个函数，是为了让前端能够根据是否能签到而渲染出不同的按钮。

接下来第144行到187行的喂食函数是本合约中需要考虑因素最多的函数。需要考虑到的因素包括相应类型食物的数量、小猫的状态、成长进度、亲密度等。需要注意的是，本函数包括合约中的其他函数，四则运算都采用的是`SafeMath`库中提供的函数，可以防止数据出现溢出。

从198行到260行的三个计算函数，用于获取小猫实时的饥饿度、健康度和与主人的亲密度。需要注意的是，在有四则运算的地方，最好都使用`SafeMath`库来保证没有溢出漏洞。比如，在`calculateHunger`函数的最后一行`return SafeMath.sub(block.timestamp, startTime) / 3600 + detail[tokenId].hungry;`，如果写成了`return (block.timestamp - startTime) / 3600 + detail[tokenId].hungry;`，那么当调用该函数的时间并没有在喂食的8小时之后，就会导致相减之后为负数，就会出现溢出漏洞。

理解了合约中主体函数的用途，我们就可以为他编写测试用例了。

## 测试智能合约

仍使用 hardhat 编写智能合约测试用例。

### 编写测试用例并运行

本小节中，由于智能合约已经变得很长，因此在编译之后获得的字节码可能会超过区块链中一个块的gas上限。因此想要让该只能合约正常部署上链，我们需要压缩编译之后获得的字节码。

打开`hardhat.config.js`，将文件中的内容替换为以下内容

```js
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
};
```

这样就可以将编译好的代码进行优化，并优化 999999 轮，以达到压缩字节码的目的。

下面正式开始编写测试用例。

首先先将`test.js`里`main`函数中的代码替换为下面的代码：

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
// 部署cat合约
const catFactory = await ethers.getContractFactory("iCat");
const catContract = await catFactory.deploy();
await catContract.deployed();
console.log("Cat NFT deployed to:", catContract.address);

await catContract.mint();
console.log("Mint successfully");

// 查看默认情况下猫的属性
const defaultCat = await catContract.getDetail(0);
console.log(defaultCat);

// 更改猫的名字并重新查看
await catContract.changeNickname(0, "小黑子");
const newCat = await catContract.getDetail(0);
console.log(newCat);
// 其他账号也想改，测试访问控制
await catContract.connect(randomGuy).changeNickname(0, "ikun");
const newCat2 = await catContract.getDetail(0);
console.log(newCat2);
```

其中，最后三行是测试`onlyOwner`的访问控制是否生效，如果报错并抛出`notOwner`异常则证明设置成功。

打开终端，执行以下命令：

```sh
npx hardhat run .\scripts\test.js
```

看到以下输出：

```sh
Cat NFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Mint successfully
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
Error: VM Exception while processing transaction: reverted with custom error 'notOwner(0, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8")'
    at iCat.approve (@openzeppelin/contracts/token/ERC721/ERC721.sol:114)
    at iCat.onlyOwner (contracts/icat.sol:522)
    at iCat.changeNickname (contracts/icat.sol:185)
```

证明合约代码成功实现了 NFT 铸造、名称修改以及访问控制的功能，并且抛出异常`notOwner(0, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8")`也表明钱包地址`0x70997970C51812dc3A010C7d01b50e0d17dc79C8`不是 token id 0 的主人。如果之后合约出问题的话，也方便 debug。

:::tip

这种异常消息来自于之前提到过的`error`错误处理方式。

:::

继续编写剩下的测试用例，首先将测试访问控制的语句注释掉，防止影响到后面的测试。然后将测试用例修改为如下内容：

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
// 部署cat合约
const catFactory = await ethers.getContractFactory("iCat");
const catContract = await catFactory.deploy();
await catContract.deployed();
console.log("Cat NFT deployed to:", catContract.address);

// 初始化用户积分
await catContract.initCredit(guy.address, 100);
console.log("Initial credits:", (await catContract.credit(guy.address)));

await catContract.mint();
console.log("Mint successfully");

// 查看默认情况下猫的属性
const defaultCat = await catContract.getDetail(0);
console.log(defaultCat);

// 更改猫的名字并重新查看
await catContract.changeNickname(0, "小黑子");
const newCat = await catContract.getDetail(0);
console.log(newCat);
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

 const canCheckedIn = await catContract.canCheckIn(randomGuy.address);
 console.log(canCheckedIn);
```

当测试结果为下述内容时，则表明运行正确。

```sh
Cat NFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Initial credits: BigNumber { value: "100" }
Mint successfully
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
Credit after buying ornament is BigNumber { value: "100" }
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
Credit after buying food is BigNumber { value: "100" }
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
false
```

在下一小节中，我们将致力于将`egg.sol`和`icat.sol`两个智能合约结合形成一个项目。