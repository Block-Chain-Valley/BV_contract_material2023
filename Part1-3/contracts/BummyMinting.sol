// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

// Auction wrapper functions
import './BummyOwnership.sol';

/// @title all functions related to creating kittens
contract BummyMinting is BummyOwnership {

    // Limits the number of cats the contract owner can ever create.
    uint256 public promoCreationLimit = 5000;
    uint256 public gen0CreationLimit = 50000;

    // Counts the number of bummies the contract owner has created.
    uint256 public promoCreatedCount;
    uint256 public gen0CreatedCount;

    /// @dev we can create promo bummies, up to a limit. Only callable by COO
    /// @param _genes the encoded genes of the bummies to be created, any value is accepted
    /// @param _owner the future owner of the created bummies. Default to contract COO
    function createPromoBummy(uint256 _genes, address _owner) public onlyCOO {
        if (_owner == address(0)) {
             _owner = cooAddress;
        }
        require(promoCreatedCount < promoCreationLimit);
        require(gen0CreatedCount < gen0CreationLimit);

        promoCreatedCount++;
        gen0CreatedCount++;
        _createBummy(0, 0, 0, _genes, _owner);
    }

}
