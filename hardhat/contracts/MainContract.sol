// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

enum TradeDirection {
    SELL_NFT,
    BUY_NFT
}

struct Fee {
    address recipient;
    uint256 amount;
    bytes feeData;
}

struct Property {
    address propertyValidator;
    bytes propertyData;
}

struct ERC721Order {
    TradeDirection direction;
    address maker;
    address taker;
    uint256 expiry;
    uint256 nonce;
    address erc20Token;
    uint256 erc20TokenAmount;
    uint256 fees; // HACK - UNUSED
    address erc721Token;
    uint256 erc721TokenId;
    uint256 erc721TokenProperties; // HACK - UNUSED
}

enum SignatureType {
    ILLEGAL,
    INVALID,
    EIP712,
    ETHSIGN,
    PRESIGNED
}

struct Signature {
    // How to validate the signature.
    SignatureType signatureType;
    // EC Signature data.
    uint8 v;
    // EC Signature data.
    bytes32 r;
    // EC Signature data.
    bytes32 s;
}

contract MainContract is Initializable, ContextUpgradeable, OwnableUpgradeable {

  struct Offer {
    ERC721Order order;
    Signature signature;
  }

  event OfferCreated(Offer offer);

  mapping(uint256 => Offer) offers;
  uint256 numberOfOffers;

  function initialize() public initializer {
    __Context_init();
    __Ownable_init();
  }

  function createOffer(ERC721Order calldata order, Signature calldata signature) external {
    numberOfOffers += 1;
    offers[numberOfOffers] = Offer(ERC721Order(
      order.direction,
      order.maker,
      order.taker,
      order.expiry,
      order.nonce,
      order.erc20Token,
      order.erc20TokenAmount,
      0,
      order.erc721Token,
      order.erc721TokenId,
      0
    ), signature);
    emit OfferCreated(offers[numberOfOffers]);
  }
  
}
