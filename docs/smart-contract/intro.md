---
sidebar_position: 0
---


# Solidity 简介


Solidity 是一种用于实现智能合约的面向对象的高级语言。它受到 C++、Python 和 JavaScript 的影响。它是一种是静态类型的，支持继承、库和复杂的用户定义类型等功能的语言。

借助 Solidity，您可以创建用于投票、众筹、盲拍和多重签名钱包等用途的智能合约。以下是一个简单的 solidity 智能合约示例：
```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

上述代码中，第一行告诉您，源代码是根据GPL3.0版本授权的。 在发布源代码是默认的情况下，机器可读的许可证说明是很重要的。

下一行指定源代码是为Solidity 0.4.16版本编写的，或该语言的较新版本，直到但不包括0.9.0版本。 这是为了确保合约不能被新的（有重大改变的）编译器版本编译，在那里它可能会有不同的表现。 

Solidity意义上的合约是代码（函数）和数据（状态）的集合， 驻留在以太坊区块链的一个特定地址。 这一行 `uint storedData;` 声明了一个名为 `storedData` 的状态变量， 类型为 `uint` （ *u*nsigned *int*eger，共 *256* 位）。 您可以把它看作是数据库中的一个`slot`，您可以通过调用管理数据库的代码函数来查询和改变它。 在这个例子中，合约定义了可以用来修改或检索变量值的函数 `set` 和 `get`。

:::tip

注意solidity中常用的数据类型写为`uint`、`uint256`等，而不是`unit`、`unit256`。

:::

想要进一步学习solidity语言，我们建议参考[WTF acadamy](https://www.wtf.academy/solidity-start)的solidity教程。在掌握了solidity语言之后，我们就可以正式编写智能合约了。