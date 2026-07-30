import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { API_URL, CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

export default function App() {
  const [account, setAccount] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (err) {
        alert("Erreur de connexion a MetaMask");
      }
    } else {
      alert("Veuillez installer l'extension MetaMask !");
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vehicles`);
      const data = await res.json();
      if (data.success) {
        setVehicles(data.data);
      }
    } catch (err) {
      console.error("Erreur de chargement des vehicules:", err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleBuy = async (vehicle) => {
    if (!account) return alert("Connecte ton wallet MetaMask d'abord !");
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.buyVehicle(vehicle.vin_number, {
        value: ethers.parseEther(vehicle.price_eth.toString())
      });
      
      await tx.wait();

      await fetch(`${API_URL}/api/vehicles/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          ownerAddress: account,
          tokenId: 1
        })
      });

      alert("Achat effectue avec succes ! NFT genere.");
      fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>AutoChain Emma+ 🚗</h2>
        {!account ? (
          <button onClick={connectWallet} style={{ padding: '10px 15px', backgroundColor: '#e67e22', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Connecter MetaMask
          </button>
        ) : (
          <span style={{ background: '#e8f8f5', padding: '8px 12px', borderRadius: '5px' }}>
            Wallet : <code>{account.substring(0, 6)}...{account.substring(38)}</code>
          </span>
        )}
      </header>

      <main>
        <h3>Catalogue des Véhicules Disponibles</h3>
        {vehicles.length === 0 ? <p>Aucun véhicule disponible pour le moment.</p> : null}
        {vehicles.map((v) => (
          <div key={v.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{v.brand} - {v.model}</h4>
              <p style={{ margin: 0, color: '#666' }}>VIN : <code>{v.vin_number}</code></p>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>Prix : {v.price_eth} ETH</p>
            </div>
            <button 
              disabled={loading} 
              onClick={() => handleBuy(v)}
              style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              {loading ? "Achat en cours..." : "Acheter (MetaMask)"}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
