---
sidebar_position: 3
---

# 编写`egg.sol`

在本小节中，我们将致力于编写`egg.sol`并实现其功能。

## 准备工作

首先，删除 hardhat 为我们生成的初始代码。将`contracts`文件夹下的`Lock.sol`删除，`scripts`下的`deploy.js`删除。

:::warning

在删除文件过程中，请不要删除任何文件夹！

:::

然后在`contracts`文件夹下创建新文件`egg.sol`和`icat.sol`，在`scripts`文件夹下创建新文件`test.js`。

## 编写智能合约

打开`egg.sol`，在其中粘贴如下代码：

```solidity showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract iCatEgg is ERC721 {

    constructor() ERC721("iCat Egg", "EGG") {}
}
```

让我们一行一行来看。

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```



我们的宠物蛋被设计为 NFT，因此，在代码的第4行，我们引用了OpenZeppelin的ERC-721库，方便后面将合约部署为NFT。

```solidity
contract iCatEgg is ERC721 {
```



这一行代码，通过合约继承关系，，利用上面提到的OpenZeppelin库，将iCatEgg合约设置成了一个NFT的合约。

```solidity
constructor() ERC721("iCat Egg", "EGG") {}
```



这一行代码，通过将两个字符串作为参数传递给构造函数，并将NFT的名字设置为`iCat Egg`，符号设置为`EGG`。

通过上面的描述，我们可以看到，solidity的智能合约有点像其他语言中的`class`，拥有构造函数等，了解这一点可能会对接下来的学习有帮助。

:::note

OpenZeppelin 是一个开源的智能合约开发框架，它为以太坊和其他区块链平台上的去中心化应用（DApps）提供了一套安全、可靠的智能合约组件和工具。该框架旨在帮助开发者构建安全的区块链应用，防范潜在的智能合约漏洞和攻击。更多信息请访问[官网](https://www.openzeppelin.com/)。

:::

:::info

在VSCode中编写solidity代码的时候，引用 OpenZeppelin 库可能会报错：`Expected string literal (path), "*" or alias list.`，或`Source "@openzeppelin/contracts/token/ERC721/ERC721.sol" not found: File import callback not supported`，解决办法见[这篇文章](https://blog.csdn.net/kongtaoxing/article/details/131255941)，如有更好的解决办法欢迎在[github discussion](https://github.com/iCatGame/tutorial/discussions)讨论。

:::

## 测试智能合约

### 编写测试用例

打开`test.js`，在其中粘贴以下代码

```js showLineNumbers
const { ethers } = require("hardhat");

const main = async () => {
    // 部署蛋的合约
    const eggFactory = await ethers.getContractFactory("iCatEgg");
    const eggContract = await eggFactory.deploy();
    await eggContract.deployed();
    console.log('NFT contract deployed to:', eggContract.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch(e) {
        console.log(e);
        process.exit(1);
    }
}

runMain();
```

一行一行解释代码执行逻辑：

```js
const eggFactory = await ethers.getContractFactory("iCatEgg");
```

这一行实际上是在编译智能合约，并在`artifacts`文件夹下生成必要的文件。

```js
const eggContract = await eggFactory.deploy();
```

在hardhat脚本运行时，它会在电脑上创建一个本地的以太坊网络，在脚本执行完成之后，该网络随即被销毁。因此，这行代码就是将`iCatEgg`合约部署在这个本地的以太坊网络上。

```js
await eggContract.deployed();
```
这行代码是等待合约部署完成，避免代码异步执行，后面用到前面的变量，但是变量是空值，类似于`await`。

```js
console.log('NFT contract deployed to:', eggContract.address);
```

这一行将部署到本地区块链上的合约地址打印出来。

### 运行测试用例

在运行之前，切换到`hardhat.config.js`，并将其中的solidity版本设置为`0.8.17`。

现在打开终端，在终端之中输入

```sh
npx hardhat run .\scripts\test.js
```

当你看到下面的输出的时候，证明智能合约编译运行成功

```sh
Compiled 13 Solidity files successfully
NFT contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

在下一小节中，我们将进一步完善宠物蛋的功能。