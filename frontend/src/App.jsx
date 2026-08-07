import React, { useState, useEffect } from 'react';
import Car3DScene from './Car3DScene';
import ParachuteLoader from './components/ParachuteLoader'; // Ajuste le chemin si besoin
import BuyCar from './components/BuyCar';

export default function App() {
 const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6500); // 6.5 secondes de chargement

    return () => clearTimeout(timer);
  }, []);
  const [activeTab, setActiveTab] = useState('autochain');
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [activeContact, setActiveContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [currentCarModel, setCurrentCarModel] = useState('/test.glb');

  const [messages, setMessages] = useState([
    { id: 1, sender: "Client", text: "La Ferrari est dispo ?", time: "14:20" },
    { id: 2, sender: "Moi", text: "Oui, toujours disponible ! Prêt pour le transfert ETH.", time: "14:22" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const [savedRequests, setSavedRequests] = useState([
    { id: 1, type: "Achat Web3", car: "Ferrari LaFerrari", status: "Validé (2.5 ETH)", date: "02/08/2026" },
    { id: 2, type: "Réservation 3D", car: "BMW E34 Stance", status: "En attente", date: "01/08/2026" }
  ]);

  const [userProfile] = useState({
    name: "Taylor (Gamix)",
    phone: "+242 06 837 2733",
    email: "taylor@autochain.com",
    accountNumber: "AC-8894-2026-X",
    bio: "Passionné d'automobile & Web3 🏎️"
  });

 const [vehicles] = useState([
    { id: 1, brand: "BMW", model: "E34 Stance", price: "2.5 ETH", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80", model3D: "/bwm.glb", seller: "Vendeur BMW Certified (#1092)" },
    { id: 2, brand: "Ferrari", model: "LaFerrari Element 6", price: "6.5 ETH", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80", model3D: "/ferrari_laferrari.glb", seller: "VIP Exotic Cars (#001)" },
    { id: 3, brand: "Lamborghini", model: "Aventador", price: "7.0 ETH", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80", model3D: "/lamborghini.glb", seller: "Lambo Direct (#500)" },
    { id: 4, brand: "Nissan", model: "GT-R 2015", price: "3.2 ETH", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80", model3D: "/nissan_gt_r.glb", seller: "JDM Imports (#770)" },
    { id: 5, brand: "Porsche", model: "911 GT3 RS", price: "5.8 ETH", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80", model3D: "/porsche_gt3_rs.glb", seller: "Motorsport Store (#312)" }
  ]);

  const contactsList = [
    { id: 1, name: "AutoDealer Paris", role: "Concessionnaire officiel", phone: "+33 1 42 68 00 00", status: "En ligne" },
    { id: 2, name: "Vendeur BMW Certified", role: "Partenaire AutoChain", phone: "+242 05 555 88 99", status: "Absent" },
    { id: 3, name: "VIP Exotic Cars", role: "Expert Supercars", phone: "+971 4 333 22 11", status: "En ligne" }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "Moi", text: inputMessage, time: "14:25" }]);
    setInputMessage('');
  };

  const handleContactSeller = (car) => {
    setActiveChat("Discussion avec " + car.seller + " (" + car.brand + " " + car.model + ")");
    setActiveTab('chats');
  };

  const handleMetaMaskPay = async (car) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert("Connexion MetaMask réussie ! Achat de la " + car.brand + " " + car.model + " pour " + car.price + ".");
        setSavedRequests([
          { id: Date.now(), type: "Achat Web3", car: car.brand + " " + car.model, status: "Confirmé (" + car.price + ")", date: "Aujourd'hui" },
          ...savedRequests
        ]);
      } catch (err) {
        alert("Erreur de connexion MetaMask.");
      }
    } else {
      alert("Portefeuille MetaMask non détecté.");
    }
  };
 if (isLoading) {
  return (
    <div style={{
      backgroundColor: '#07090e',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>

      {/* Notre composant animé dynamique */}
      <ParachuteLoader duration={6500} />

      <h2 style={{
        background: 'linear-gradient(45deg, #00d2ff, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginTop: '30px',
        fontSize: '1.4rem',
        letterSpacing: '1px'
      }}>
        AutoChain 3D
      </h2>

    </div>
  );
}
  return (
    <div style={{ backgroundColor: '#07090e', color: '#f1f5f9', minHeight: '100vh', paddingBottom: '90px', fontFamily: 'Segoe UI, sans-serif' }}>
      
      <header style={headerStyle}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 'bold', background: 'linear-gradient(45deg, #00d2ff, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AutoChain 3D
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
            />
          </div>
          <span style={icon3dInteractive} onClick={() => setShowFolderModal(true)} title="Dossier des requêtes">📁</span>
          <span style={icon3dInteractive} onClick={() => { setActiveTab('settings'); setActiveSubMenu(null); }} title="Paramètres">⚙️</span>
        </div>
      </header>

      {showFolderModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#00d2ff' }}>📁 Dossier des Requêtes & Commandes</h3>
              <button onClick={() => setShowFolderModal(false)} style={closeModalBtn}>✕</button>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '15px' }}>Historique sécurisé de vos interactions et achats.</p>
            {savedRequests.length === 0 ? (
              <p style={{ color: '#64748b' }}>Aucune requête enregistrée.</p>
            ) : (
              savedRequests.map((req) => (
                <div key={req.id} style={{ ...cardStyle, marginBottom: '8px', padding: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{req.car}</span>
                    <span style={{ color: '#10b981', fontSize: '0.85rem' }}>{req.status}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Type : {req.type} | Date : {req.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        
        {activeTab === 'chats' && (
          <div>
            {!activeChat ? (
              <div>
                <h3 style={titleStyle}>💬 Discussions Actives</h3>
                <div style={cardStyleClickable} onClick={() => setActiveChat("Groupe Acheteurs VIP 🏎️")}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0, color: '#00d2ff' }}>🏎️ Groupe Acheteurs VIP</h4>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>14:22</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '5px 0 0 0' }}>Client : "La Ferrari est dispo ?"</p>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveChat(null)} style={backButtonStyle}>← Retour aux discussions</button>
                <div style={{ ...cardStyle, borderColor: '#00d2ff', boxShadow: '0 0 20px rgba(0,210,255,0.2)' }}>
                  <h4 style={{ color: '#00d2ff', marginTop: 0, borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>{activeChat}</h4>
                  
                  <div style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                    {messages.map((msg, idx) => (
                      <div key={idx} style={{ alignSelf: msg.sender === 'Moi' ? 'flex-end' : 'flex-start', background: msg.sender === 'Moi' ? '#0284c7' : '#1e293b', padding: '8px 12px', borderRadius: '10px', maxWidth: '75%' }}>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{msg.sender}</div>
                        <div>{msg.text}</div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Écrire un message..." 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      style={{ flex: 1, backgroundColor: '#07090e', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: '#fff' }}
                    />
                    <button type="submit" style={button3dStyle}>Envoyer</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h3 style={titleStyle}>👥 Contacts & Vendeurs Partenaires</h3>
            {!activeContact ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {contactsList.map((c) => (
                  <div key={c.id} style={cardStyleClickable} onClick={() => setActiveContact(c)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, color: '#fff' }}>👤 {c.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '3px 0 0 0' }}>{c.role}</p>
                      </div>
                      <span style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', backgroundColor: c.status === 'En ligne' ? '#065f46' : '#334155', color: '#fff' }}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveContact(null)} style={backButtonStyle}>← Retour aux contacts</button>
                <div style={{ ...cardStyle, textAlign: 'center', padding: '25px' }}>
                  <div style={avatar3dStyle}>👤</div>
                  <h3 style={{ margin: '10px 0 5px 0' }}>{activeContact.name}</h3>
                  <p style={{ color: '#00d2ff', fontSize: '0.9rem' }}>{activeContact.role}</p>
                  <p style={{ color: '#94a3b8' }}>Téléphone : {activeContact.phone}</p>
                  <button onClick={() => { setActiveChat(activeContact.name); setActiveTab('chats'); }} style={{ ...button3dStyle, marginTop: '15px' }}>
                    💬 Démarrer une conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'autochain' && (
          <div>
            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '16px', marginBottom: '20px', border: '1px solid #1e293b', boxShadow: '0 8px 32px rgba(0,210,255,0.15)' }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#00d2ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🏎️</span> Studio Showroom 3D Interactif
              </h3>
              <Car3DScene modelPath={currentCarModel} />
            </div>

            <h3 style={{ borderBottom: '1px solid #1e293b', paddingBottom: '10px', color: '#fff' }}>Véhicules Disponibles ({vehicles.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '15px', marginTop: '15px' }}>
              {vehicles
                .filter(v => v.brand.toLowerCase().includes(searchQuery.toLowerCase()) || v.model.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((v) => (
                <div key={v.id} style={cardStyle}>
                  <img src={v.image} alt={v.model} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '10px' }} />
                  <h4 style={{ margin: '10px 0 2px 0' }}>{v.brand} {v.model}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 6px 0' }}>Par {v.seller}</p>
                  <p style={{ color: '#00d2ff', fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 12px 0' }}>{v.price}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => setCurrentCarModel(v.model3D)} style={button3dStyle}>
                      👁️ Voir en 3D
                    </button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleContactSeller(v)} style={buttonSecondaryStyle}>
                        💬 Contacter
                      </button>
                      <button onClick={() => handleMetaMaskPay(v)} style={buttonBuyStyle}>
                        🦊 Payer (MetaMask)
                      </button>
                      <div style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
  <BuyCar car={v} />
</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            {!activeSubMenu ? (
              <div>
                <h3 style={titleStyle}>⚙️ Paramètres & Sécurité</h3>
                <div style={itemStyle} onClick={() => setActiveSubMenu('account')}>
                  <span>👤 Compte Utilisateur</span><span>➔</span>
                </div>
                <div style={itemStyle} onClick={() => setActiveSubMenu('privacy')}>
                  <span>🔒 Confidentialité & Chiffrement 3D</span><span>➔</span>
                </div>
                <div style={itemStyle} onClick={() => setActiveSubMenu('notifications')}>
                  <span>🔔 Notifications & Sons</span><span>➔</span>
                </div>
                <div style={itemStyle} onClick={() => setActiveSubMenu('storage')}>
                  <span>💾 Cache & Modèles 3D</span><span>➔</span>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveSubMenu(null)} style={backButtonStyle}>← Retour aux Paramètres</button>
                
                {activeSubMenu === 'account' && (
                  <div style={cardStyle}>
                    <h4>👤 Compte Utilisateur</h4>
                    <p><strong>Nom :</strong> {userProfile.name}</p>
                    <p><strong>ID Blockchain :</strong> {userProfile.accountNumber}</p>
                    <p><strong>Email :</strong> {userProfile.email}</p>
                  </div>
                )}

                {activeSubMenu === 'privacy' && (
                  <div style={cardStyle}>
                    <h4>🔒 Confidentialité & Chiffrement 3D</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Gérez la visibilité de vos données sur le réseau décentralisé AutoChain.</p>
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Chiffrement de bout en bout
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Masquer mon portefeuille IP
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" /> Autoriser le ciblage Showroom 3D
                      </label>
                    </div>
                  </div>
                )}

                {activeSubMenu === 'notifications' && (
                  <div style={cardStyle}>
                    <h4>🔔 Notifications</h4>
                    <p>• Alertes de prix ETH : Activées</p>
                    <p>• Messages VIP : Sonnerie Nitro</p>
                  </div>
                )}

                {activeSubMenu === 'storage' && (
                  <div style={cardStyle}>
                    <h4>💾 Cache & Modèles 3D</h4>
                    <p>• Espace utilisé par les textures GLB : 142 Mo</p>
                    <button style={{ ...button3dStyle, marginTop: '10px' }} onClick={() => alert("Cache 3D vidé avec succès !")}>
                      Vider le cache GLB
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h3 style={titleStyle}>👤 Profil Décentralisé</h3>
            <div style={{ ...cardStyle, textAlign: 'center', padding: '25px' }}>
              <div style={avatar3dStyle}>👤</div>
              <h3 style={{ margin: '10px 0 5px 0' }}>{userProfile.name}</h3>
              <p style={{ color: '#00d2ff', fontSize: '0.9rem', margin: 0 }}>N° {userProfile.accountNumber}</p>
              <p style={{ color: '#94a3b8', marginTop: '10px' }}>{userProfile.bio}</p>
            </div>
          </div>
        )}

      </main>

      <footer style={bottomNavStyle}>
        <button onClick={() => { setActiveTab('chats'); setActiveSubMenu(null); setActiveChat(null); }} style={navButtonStyle(activeTab === 'chats')}>
          <div style={icon3dBox(activeTab === 'chats')}>💬</div>
          <span style={navLabelStyle(activeTab === 'chats')}>Chats</span>
        </button>
        <button onClick={() => { setActiveTab('contacts'); setActiveSubMenu(null); setActiveContact(null); }} style={navButtonStyle(activeTab === 'contacts')}>
          <div style={icon3dBox(activeTab === 'contacts')}>👥</div>
          <span style={navLabelStyle(activeTab === 'contacts')}>Contacts</span>
        </button>
        <button onClick={() => { setActiveTab('autochain'); setActiveSubMenu(null); }} style={navButtonStyle(activeTab === 'autochain')}>
          <div style={icon3dBox(activeTab === 'autochain')}>🏎️</div>
          <span style={navLabelStyle(activeTab === 'autochain')}>AutoChain</span>
        </button>
        <button onClick={() => { setActiveTab('settings'); setActiveSubMenu(null); }} style={navButtonStyle(activeTab === 'settings')}>
          <div style={icon3dBox(activeTab === 'settings')}>⚙️</div>
          <span style={navLabelStyle(activeTab === 'settings')}>Settings</span>
        </button>
        <button onClick={() => { setActiveTab('profile'); setActiveSubMenu(null); }} style={navButtonStyle(activeTab === 'profile')}>
          <div style={icon3dBox(activeTab === 'profile')}>👤</div>
          <span style={navLabelStyle(activeTab === 'profile')}>Profile</span>
        </button>
      </footer>

    </div>
  );
}
const headerStyle = {
  backgroundColor: '#0f172a',
  padding: '14px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #1e293b',
  boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const searchInputStyle = {
  backgroundColor: '#07090e',
  border: '1px solid #334155',
  borderRadius: '8px',
  padding: '6px 12px',
  color: '#fff',
  fontSize: '0.85rem',
  width: '120px',
  outline: 'none'
};

const titleStyle = { marginBottom: '15px', color: '#fff', fontSize: '1.2rem', fontWeight: '600' };

const cardStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
};

const cardStyleClickable = {
  ...cardStyle,
  cursor: 'pointer'
};

const itemStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  padding: '14px 18px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: '500',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
};

const backButtonStyle = {
  backgroundColor: '#1e293b',
  color: '#00d2ff',
  border: '1px solid #00d2ff',
  padding: '8px 16px',
  borderRadius: '10px',
  cursor: 'pointer',
  marginBottom: '15px',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,210,255,0.2)'
};

const button3dStyle = {
  background: 'linear-gradient(135deg, #00d2ff 0%, #0284c7 100%)',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 210, 255, 0.4)'
};

const buttonSecondaryStyle = {
  flex: 1,
  backgroundColor: '#1e293b',
  color: '#f1f5f9',
  border: '1px solid #334155',
  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '0.8rem'
};

const buttonBuyStyle = {
  flex: 1,
  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  color: '#fff',
  border: 'none',
  padding: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.8rem',
  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
};

const avatar3dStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00d2ff, #0284c7)',
  margin: '0 auto 10px auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.2rem',
  boxShadow: '0 8px 25px rgba(0,210,255,0.5)',
  border: '2px solid #fff'
};

const bottomNavStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0f172a',
  borderTop: '1px solid #1e293b',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px 0',
  boxShadow: '0 -6px 25px rgba(0,0,0,0.7)',
  zIndex: 100
};

const navButtonStyle = (active) => ({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '3px'
});

const icon3dBox = (active) => ({
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  background: active 
    ? 'linear-gradient(135deg, #00d2ff 0%, #0284c7 100%)' 
    : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  boxShadow: active 
    ? '0 6px 15px rgba(0, 210, 255, 0.5), inset 0 1px 1px rgba(255,255,255,0.4)' 
    : '0 3px 8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
  border: active ? '1px solid #fff' : '1px solid #334155'
});

const icon3dInteractive = {
  padding: '8px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
  boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
  border: '1px solid #334155',
  cursor: 'pointer',
  fontSize: '1rem'
};

const navLabelStyle = (active) => ({
  fontSize: '0.7rem',
  fontWeight: active ? 'bold' : 'normal',
  color: active ? '#00d2ff' : '#94a3b8'
});
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px'
};

const modalContentStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #334155',
  borderRadius: '16px',
  padding: '20px',
  width: '100%',
  maxWidth: '450px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
};

const closeModalBtn = {
  background: 'transparent',
  border: 'none',
  color: '#94a3b8',
  fontSize: '1.2rem',
  cursor: 'pointer'
};