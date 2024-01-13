---
sidebar_position: 0
---


# Introduction to Solidity

Solidity is an object-oriented high-level language used to implement smart contracts. It is influenced by C++, Python, and JavaScript. It is a statically-typed language that supports features such as inheritance, libraries, and complex user-defined types.

With Solidity, you can create smart contracts for purposes such as voting, crowdfunding, blind auctions, and multi-signature wallets. Here is a simple Solidity smart contract example:

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

In the above code, the first line informs you that the source code is licensed under the GPL 3.0 version. When releasing the source code, having a machine-readable license description is essential.

The next line specifies that the source code is written for Solidity version 0.4.16 or newer versions up to, but not including, version 0.9.0. This is to ensure that the contract cannot be compiled by newer (significantly changed) compiler versions, where it might behave differently.

In the context of Solidity, a contract is a collection of code (functions) and data (state) residing at a specific address on the Ethereum blockchain. The line uint storedData; declares a state variable named storedData, of type uint (unsigned integer, 256 bits). You can think of it as a slot in a database that you can query and modify by calling code functions that manage the database. In this example, the contract defines functions set and get that can be used to modify or retrieve the variable value.

:::tip

Note that commonly used data types in Solidity are written as uint, uint256, etc., not as unit, unit256.

:::

If you want to further learn the Solidity language, we recommend checking out the Solidity tutorial at WTF academy.

Starting from the next subsection, we will begin preparing the project.