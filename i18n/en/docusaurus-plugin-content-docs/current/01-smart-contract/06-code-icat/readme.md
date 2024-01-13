---
sidebar_position: 5
---

# Writing `icat.sol`

In this section, we will focus on writing `icat.sol` and implementing its functionality.
## Writing Smart Contract

`icat.sol` is the main file for the entire project's smart contract, aiming to implement all major functions of the entire game. Since there will be many functions in this contract, we will break it down and complete this large project step by step.

In this section, we will first complete the task of initializing relevant variables in the contract. Open `icat.sol` and paste the following code:

```solidity
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
        TEEN,  // Larval stage
        GROWING,  // Growing stage
        ADULT  // Mature
    }

    enum Food {
        leftover,
        fishChip,
        tin
    }

    enum Ornament {
        hat,
        scarf,
        clothes
    }

    struct catDetail {
        string characterName;
        uint256 healthy;
        uint256 intimacy;  
        Stage stage;
        uint256 progress;  
        uint256 hungry;  
        uint256 feces;  
        bool hat;
        bool scarf;
        bool clothes;
    }

    mapping ( uint256 => catDetail ) public detail;  
    mapping ( address => uint256[] ) public ownedTokenId;  
    mapping ( uint256 => uint256 ) public growingProgress;  
    mapping ( address => uint256 ) public credit;  
    mapping ( address => mapping ( uint256 => uint256 )) public foodBalance;  
    mapping ( address => mapping ( uint256 => uint256 )) public ornamentBalance;  
    mapping ( address => uint256 ) public medicine;  
    mapping ( uint256 => uint256 ) public foodPrice;  
    mapping ( uint256 => uint256 ) public foodEnergy;  
    mapping ( address => uint256 ) public lastCheckin;  
    mapping ( uint256 => uint256 ) public lastFeed;  
    mapping ( uint256 => uint256 ) public lastClear;  

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

    event StageAfter(Stage indexed _stage);
    event BuryCat(uint256 indexed tokenId);
    event DataUpdated(uint256 tokenId, uint256 indexed healthy, uint256 indexed hungry, uint256 indexed feces, uint256 intimacy);

    constructor() ERC721("iCat", "iCat") {
        growingProgress[uint256(Stage.TEEN)] = 100;  
        growingProgress[uint256(Stage.GROWING)] = 1000;  
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(HATCH_ROLE, msg.sender);
        _initialFoodPrice(0, 5, 10);
        _initialFoodEnergy(1, 5, 10);
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

    function _initialFoodPrice(uint256 _leftover, uint256 _fishChip, uint256 _tin) internal onlyRole(ADMIN_ROLE) {
        setFoodPrice(_leftover, _fishChip, _tin);
    }

    function _initialFoodEnergy(uint256 _leftover, uint256 _fishChip, uint256 _tin) internal onlyRole(ADMIN_ROLE) {
        setFoodEnergy(_leftover, _fishChip, _tin);
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
        // 
    }

    function grantAdmin(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(ADMIN_ROLE, account);
    }

    function grantHatch(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(HATCH_ROLE, account);
    }

    modifier onlyOwner(uint256 tokenId) {
        _checkOwner(tokenId);
        _;
    }

    modifier onlyNotAdult(uint256 tokenId) {
        _checkStageAdultOrNot(tokenId);
        _;
    }

    modifier onlyNotDead(uint256 tokenId) {
        _checkDeadOrNot(tokenId);
        _;
    }

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



Let's break down the new code:
### Modifiers (`modifier`)

First, let's focus on lines 143 to 159.

```solidity
modifier onlyOwner(uint256 tokenId) {
    _checkOwner(tokenId);
    _;
}

modifier onlyNotAdult(uint256 tokenId) {
    _checkStageAdultOrNot(tokenId);
    _;
}

modifier onlyNotDead(uint256 tokenId) {
    _checkDeadOrNot(tokenId);
    _;
}
```



These three functions, starting with `modifier`, are called **modifiers** . Using modifiers allows functions to automatically execute some statements before execution. For this contract, these three modifiers will respectively call `_checkOwner(uint256)`, `_checkStageAdultOrNot(uint256)`, and `_checkDeadOrNot(uint256)` before the function is executed. If these three functions execute successfully, the function can continue; otherwise, it will revert.
### Variables

Next, let's go back to line 11. In lines 11 to 20, among these variables, the following line is a new addition:

```solidity
using SafeMath for uint256;
```



Similar to the `using Counters for Counters.Counter` mentioned [here](https://chat.openai.com/05-egg-detail/readme.md) , `using SafeMath for uint256` imparts the arithmetic rules of `SafeMath` to the `uint256` variable type.

:::info

`SafeMath` is a set of secure integer operation specifications developed by OpenZeppelin, designed to avoid vulnerabilities such as overflow during integer operations.

:::
### `enum` and Structs

The `enum` and `struct` variables from lines 22 to 51 respectively define the growth stages of iCat, the classification of food, the classification of ornaments, and all the attributes a cat possesses.
### Mappings

Next, from lines 53 to 64, we define several mapping variables, similar to dictionaries in other programming languages. Each mapping variable corresponds to a specific function, as indicated in the comments.
### Events

The `event` statements from lines 79 to 81 allow the contract to emit events after executing specific code, which can be captured and further processed by block explorers or backend services.

:::tip

An `event` can only index 3 parameters, so choices need to be made.

:::
### Initialization Function

Next, lines 92 to 114 are used to set the initial values of variables.

Up to this point, the contract code explanation is complete, and we can proceed with deployment testing.
## Testing Smart Contract

Continue using Hardhat to write test cases.
### Write Test Cases

Open `test.js`, comment out the test cases for the `egg` contract from the `main` function, and then add the following code at the top of the `main` function:

```js
// Deploy the cat contract
const catFactory = await ethers.getContractFactory("iCat");
const catContract = await catFactory.deploy();
await catContract.deployed();
console.log("Cat NFT deployed to:", catContract.address);
```


### Run Test Cases

In the terminal, run the following command:

```sh
npx hardhat run .\scripts\test.js
```



If you see the following output, it means the execution is correct:

```sh
Compiled 2 Solidity files successfully
Cat NFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```



In the next section, we will further enhance our `iCat` contract.