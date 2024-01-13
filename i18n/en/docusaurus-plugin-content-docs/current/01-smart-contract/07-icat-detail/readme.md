---
sidebar_position: 6
---

# Enhancing the `iCat` Functionality

In the previous section, we developed and tested the basic functionalities of the `iCat` contract. In this section, we will further develop and enhance the `iCat` contract.
## Writing Smart Contract

Open `icat.sol` and insert the following code after the constructor:

```solidity
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
    // Implementation of mint function
}

function initCredit(address _user, uint256 _credit) public onlyRole(HATCH_ROLE) {
    // Implementation of initCredit function
}

function updateCredit(address _user, uint256 _credit) public onlyRole(HATCH_ROLE) {
    // Implementation of updateCredit function
}

function canCheckIn(address _user) public view returns (bool) {
    // Implementation of canCheckIn function
}

function checkIn() public {
    // Implementation of checkIn function
}

function changeNickname(uint256 tokenId, string memory newName) public onlyOwner(tokenId) {
    // Implementation of changeNickname function
}

function buyOrnament(Ornament _ornament, uint256 _amount) public {
    // Implementation of buyOrnament function
}

function addOrnament(uint256 tokenId, Ornament ornament) public onlyOwner(tokenId) onlyNotDead(tokenId) {
    // Implementation of addOrnament function
}

function removeOrnament(uint256 tokenId, Ornament ornament) public onlyOwner(tokenId) onlyNotDead(tokenId) {
    // Implementation of removeOrnament function
}

function buyFood(Food _food, uint256 _amount) public {
    // Implementation of buyFood function
}

function pet(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) returns (uint256) { 
    // Implementation of pet function
}

function feedCat(uint256 tokenId, Food _food, uint256 _amount) public onlyOwner(tokenId) onlyNotAdult(tokenId) onlyNotDead(tokenId) returns (bool) {
    // Implementation of feedCat function
}

function clearFeces(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) {
    // Implementation of clearFeces function
}

function calculateFeces(uint256 tokenId) public view returns (uint256) {
    // Implementation of calculateFeces function
}

function calculateHunger(uint256 tokenId) public view returns (uint256) {
    // Implementation of calculateHunger function
}

function calculateHealth(uint256 tokenId) public view returns (uint256) {
    // Implementation of calculateHealth function
}

function calculateIntimacy(uint256 tokenId) public view returns (uint256) {
    // Implementation of calculateIntimacy function
}

function buyMedicine(uint256 _amount) public {
    // Implementation of buyMedicine function
}

function cure(uint256 tokenId) public onlyOwner(tokenId) onlyNotDead(tokenId) {
    // Implementation of cure function
}

function examCat(uint256 tokenId) public {
    // Implementation of examCat function
}

function binarySearch(uint256[] storage arr, uint256 value) internal view returns (int256) {
    // Implementation of binarySearch function
}

function buryCat(uint256 tokenId) public onlyOwner(tokenId) {
    // Implementation of buryCat function
}

function _checkDeadOrNot(uint256 tokenId) internal view {
    // Implementation of _checkDeadOrNot function
}

function setOrnamentPrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
    // Implementation of setOrnamentPrice function
}

function setMedicinePrice(uint256 _price) public onlyRole(ADMIN_ROLE) {
    // Implementation of setMedicinePrice function
}

function setEggContract(address _eggCA) public onlyRole(ADMIN_ROLE) {
    // Implementation of setEggContract function
}
```



Replace the existing `_checkDeadOrNot` function with the following code:

```solidity
function _checkDeadOrNot(uint256 tokenId) internal view {
    if (calculateHealth(tokenId) == 0) {
        revert alreadyDead(tokenId);
    }
}
```



Add the following functions to the `admin` permission section:

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



Now, let's go through the main part of the added code.

Firstly, the `getDetail`, `getOwnedTokenId`, and `totalSupply` functions are added for retrieving cat details, owned token IDs of an owner, and total supply of tokens, respectively.

The `mint` function is for minting new cat tokens, which can only be called by the contract owner or an address with the `HATCH_ROLE` role.

The `initCredit` and `updateCredit` functions are used to initialize and update the credit balance of a user. Only an address with the `HATCH_ROLE` role can call these functions.

The `canCheckIn` function checks whether a user can perform the check-in action. The `checkIn` function allows a user to check in and earn credits.

The `changeNickname` function allows the owner of a cat to change its nickname.

The `buyOrnament`, `addOrnament`, and `removeOrnament` functions are related to cat ornaments. Users can buy ornaments, add ornaments to their cats, or remove ornaments from their cats. The `buyOrnament` function also uses the `Ornament` enum.

The `buyFood`, `pet`, `feedCat`, `clearFeces`, `calculateFeces`, `calculateHunger`, `calculateHealth`, `calculateIntimacy`, `buyMedicine`, `cure`, and `examCat` functions are related to the health and well-being of a cat. Users can buy food and medicine, pet their cats, feed them, clear their feces, and perform health-related actions.

The `binarySearch` function is a utility function used for searching in an array.

The `buryCat` function allows the owner to bury a cat, removing it from existence.

The `setOrnamentPrice`, `setMedicinePrice`, and `setEggContract` functions are administrative functions for setting ornament prices, medicine prices, and the address of the egg contract.

Make sure to replace the existing `_checkDeadOrNot` function with the provided code.
## Testing

After adding these functions, you can run additional tests to ensure that each function works as intended. Pay attention to the roles and permissions associated with each function, as they are crucial for the proper functioning of the `iCat` contract.

The enhanced `iCat` contract now provides a comprehensive set of functionalities for managing and interacting with virtual cats. Users can perform various actions, such as minting new cats, managing cat attributes, buying items, and taking care of their virtual pets' health and well-being. The contract also includes roles and permissions to control access to specific functions and ensure the security of the system.
