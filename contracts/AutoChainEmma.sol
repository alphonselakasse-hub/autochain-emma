// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AutoChainEmma is ERC721, Ownable {
    uint256 private _nextTokenId;

    struct VehicleCertificate {
        string vin;
        uint256 purchaseDate;
        uint256 pricePaid;
    }

    mapping(uint256 => VehicleCertificate) public certificates;

    event VehiclePurchased(uint256 indexed tokenId, address indexed buyer, string vin, uint256 price);

    constructor() ERC721("AutoChain Certificate", "ACEMMA") Ownable(msg.sender) {}

    function buyVehicle(string memory vin) external payable returns (uint256) {
        require(msg.value > 0, "Le montant doit etre superieur a 0");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        certificates[tokenId] = VehicleCertificate({
            vin: vin,
            purchaseDate: block.timestamp,
            pricePaid: msg.value
        });

        emit VehiclePurchased(tokenId, msg.sender, vin, msg.value);
        return tokenId;
    }
}
