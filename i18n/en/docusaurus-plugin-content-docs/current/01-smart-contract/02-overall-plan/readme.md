---
sidebar_position: 1
---

# Overall Planning

## Functional Design

This project aims to design a cute pet chain game, with the following required features:

1. Users entering the game should receive a pet egg.
2. Users can earn points through check-ins. Points can be deducted to hatch the egg into a kitten.
3. Kitten attributes include health, intimacy with the owner (factors include growth rate, food, etc.), growth stage, hunger level, and excretion time interval (exceeding the limit affects health), etc.
4. Ways to earn points: check-ins, cleaning excrement, and playing with the cat.
5. Point uses:
   - Food acquisition: leftovers (0 points to ensure the game can continue when there are no points), small fish, canned cat food.
   - Accessories: hats, scarves, clothes.

## Initial Implementation

To implement the above functions, we need to write two Solidity files: `egg.sol` and `icat.sol`. In this context, `egg.sol` is used to implement various functions related to pet eggs, including casting and hatching, while `icat.sol` is used to implement various functions related to pet cats, including feeding and playing with the cat.

Starting from the next subsection, we will begin learning about the smart contract writing and testing for this project.

