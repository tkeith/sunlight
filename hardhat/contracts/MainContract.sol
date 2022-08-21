// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MainContract is Initializable, ContextUpgradeable, OwnableUpgradeable {
    
  function initialize() public initializer {
    __Context_init();
    __Ownable_init();
  }
  
}
