---
sidebar_position: 4
---

# Improving Pet Egg Functionality

In the previous section, we developed and tested the initial version of the pet egg contract. In this section, we will further enhance its functionality.
## Writing Smart Contract

Extend the code in the `egg.sol` as follows:

```solidity
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
    mapping ( address => uint256[] ) public ownedTokenId;  // View all owned token IDs

    // Use error for more gas-efficient error handling
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

    // Minting a new egg
    function mint() public {
        // Assign a random color to the egg
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
        );
        uint256 enumLength = uint256(Color.RED) + 1;
        uint256 selectedIndex = randomNumber % enumLength;
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        colorOfEgg[tokenId] = Color(selectedIndex);

        // Mint the egg NFT
        _safeMint(msg.sender, tokenId);  
        ownedTokenId[tx.origin].push(tokenId);
    }

    // Binary search for the index of a specific value
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

    // Hatching the egg
    function hatchOut(uint256 tokenId) public {
        // Only the owner of the egg can hatch it
        if (ownerOf(tokenId) != msg.sender) {
            revert notOwner(tokenId, msg.sender);
        }

        // Burn the egg and mint an iCat
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



Let's break down the code as much as possible for explanation.

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```



These two lines resolve fine-grained access control in the smart contract and implement ERC721 token counting management by importing two OpenZeppelin libraries.

```solidity
bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
```



This line hashes the string `ADMIN_ROLE` into a `bytes32` variable using the `keccak256` function, which is advantageous for gas optimization and slot management.

```solidity
using Counters for Counters.Counter;
Counters.Counter private _tokenIdCounter;
```



These two lines assign the rules of `Counters` to `Counters.counter`, making subsequent operations easier. Then, a new counter variable `_tokenIdCounter` is created.

```solidity
enum Color {
    WHITE,
    GREEN,
    BLUE,
    PURPLE,
    RED
}
```



These lines create a set of `enum` variables, resulting in `WHITE` being 0, `GREEN` being 1, and so on. `enum` variables can be converted to other types such as `uint256`.

```solidity
mapping ( uint256 => Color ) colorOfEgg;
mapping ( address => uint256[] ) public ownedTokenId;  // View all owned token IDs
```



These two lines create two mapping variables. `colorOfEgg` is used to check the color of a specific `tokenId` of the pet egg NFT, and `ownedTokenId` is used to view all the `tokenId` of pet egg NFTs owned by a particular address (excluding those already burned).

```solidity
error notOwner(uint256 tokenId, address account);
```



This line is a new error handling method added in Solidity 0.8. Unlike the previous `revert` and `require`, this uses the `error` method for error handling. It allows unified management of errors and restricts the length of error messages, making it more gas-efficient. We will often use this error handling method in the future.

```solidity
constructor() ERC721("iCat Egg", "EGG") {
    _grantRole(ADMIN_ROLE, msg.sender);
}
```



In the constructor, we added the line `_grantRole(ADMIN_ROLE, msg.sender);`, which grants the `ADMIN_ROLE` to the address deploying this contract by calling the library function from OpenZeppelin's AccessControl.

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



The above four functions are used to get the color of a pet egg, the total number of circulating pet eggs, the metadata URI of the pet egg, and all the IDs and the total number owned by a specific address, respectively.

:::info

The most common block explorer, Etherscan, retrieves the number of circulating NFTs of a particular kind by reading the `totalSupply` function. Therefore, a custom `totalSupply` function is needed for Etherscan to call.

:::

:::tip

Pay attention to the modifiers at the end of the function names, including `public`, `view`, `pure`, etc. It's crucial to understand the purpose of each modifier.

:::

```solidity
function mint() public {
    // Assign a random color to the egg
    uint256 randomNumber = uint256(
        keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
    );
    uint256 enumLength = uint256(Color.RED) + 1;
    uint256 selectedIndex = randomNumber % enumLength;
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    colorOfEgg[tokenId] = Color(selectedIndex);

    // Mint the egg NFT
    _safeMint(msg.sender, tokenId);  
    ownedTokenId[tx.origin].push(tokenId);
}
```



In this function, lines 3-7 generate a random color variable, ensuring that each newly minted pet egg receives a random color. The rest of the code increments `tokenId` and mints an NFT with `tokenId` for `msg.sender`.

:::warning

Note that since Ethereum's mainnet has transitioned from PoW to PoS, `block.difficulty` has been deprecated. If you intend to deploy a smart contract on the Ethereum mainnet, avoid generating random numbers in this way.

:::

```solidity
// Hatching the egg
function hatchOut(uint256 tokenId) public {
    // Only the owner of the egg can hatch it
    if (ownerOf(tokenId) != msg.sender) {
        revert notOwner(tokenId, msg.sender);
    }

    // Burn the egg and mint an iCat
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



This code implements the functionality to hatch a pet egg. First, it burns the pet egg, and then it mints a new iCat by calling the `mint` function from the `icat` contract (to be added later).

```solidity
function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
    _grantRole(ADMIN_ROLE, account);
}
```



This code implements granting the `ADMIN_ROLE` permission.

<br></br>

The contract code design is complete. Next is the contract testing phase.
## Testing Smart Contract

Use Hardhat to write smart contract test cases.
### Write Test Cases

Open `test.js`, insert the following code after the `console.log` line in the `main` function:

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
// Mint an egg
const mintEgg = await eggContract.mint();
console.log("Mint succesful");

// Check the color of the egg
const getColor = await eggContract.getColor(0);
console.log("The color of egg #0 is", getColor);

// Grant admin role to the second admin
const grantAdmin = await eggContract.grantAdmin(randomGuy.address);
console.log("Grant successful");

// Hatch the egg
const hatch = await eggContract.hatchOut(0);
console.log("Hatched out successfully");
```



Let's go through it line by line:

```js
const [guy, randomGuy, hacker] = await ethers.getSigners();
```



When running the script, Hardhat will generate a series of wallets using the mnemonic `test test test test test test test test test test test junk`. During the script execution, the first address generated by default will be used. With this line, we can obtain the first three addresses generated by this mnemonic, for example, in this code, `guy`, `randomGuy`, and `hacker` represent the first three addresses.

```js
const mintEgg = await eggContract.mint();
console.log("Mint succesful");
```



These two lines of code are used to mint a pet egg using the default address. If minting is successful, "Mint successful" will be output; otherwise, an exception will be thrown and the execution will be interrupted.

The purposes of the remaining test cases can be obtained from the comments; further explanation is not provided here.
### Run Test Cases

Open the terminal and execute the following command:

```sh
npx hardhat run .\scripts\test.js
```



If you see the following output, it means the execution is correct:

```sh
Compiled 16 Solidity files successfully
NFT contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Mint succesful
The color of egg #0 is 0
Grant successful
Hatched out successfully
```