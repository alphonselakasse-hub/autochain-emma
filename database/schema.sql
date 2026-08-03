CREATE DATABASE IF NOT EXISTS autochain_db;
USE autochain_db;

DROP TABLE IF EXISTS vehicles;

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price_eth DECIMAL(18, 8) NOT NULL, -- plus de précision pour les valeurs en crypto
    vin_number VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('available', 'sold') NOT NULL DEFAULT 'available',
    owner_address VARCHAR(42) DEFAULT NULL,
    token_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO vehicles (brand, model, price_eth, vin_number) VALUES
('Toyota', 'Corolla 2022', 0.05000000, 'VIN1234567890AX'),
('BMW', 'Serie 3 2021', 0.12000000, 'VIN9876543210BZ'),
('Mercedes', 'Classe C 2023', 0.18000000, 'VIN5554443332CY');
