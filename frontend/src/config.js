export const API_URL = 'http://localhost:5000';

// Remplace par l'adresse donnee par Remix après déploiement sur Sepolia
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

export const CONTRACT_ABI = [
  "function buyVehicle(string memory vin) external payable returns (uint256)",
  "event VehiclePurchased(uint256 indexed tokenId, address indexed buyer, string vin, uint256 price)"
];
