-- Recréation de la table 'users' avec une valeur par défaut pour 'role'
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'player',
  profilImage BLOB
);

-- Insertion des données dans la table 'users'
INSERT INTO users (pseudo, email, password, role, profilImage) VALUES
('jane_doe', 'jane@example.com', 'password456', 'admin', '/images/profildeafault.jpg');


-- Recréation de la table 'games'
DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  player_ingame INTEGER NOT NULL,
  player_max INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  owner INT
);

-- Recréation de la table 'characters'
DROP TABLE IF EXISTS characters;

CREATE TABLE characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  race VARCHAR(255),
  stat_force INT,
  stat_agilite INT,
  stat_sagesse INT,
  stat_charisme INT,
  pv VARCHAR(255),
  mana VARCHAR(255),
  status VARCHAR(255) DEFAULT 'Healthy',
  user_id INT
);

DROP TABLE IF EXISTS spell;

CREATE TABLE spell (
  id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  spell_title VARCHAR(255),
  spell_description VARCHAR(255)
);

ALTER TABLE characters 
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) REFERENCES users(id); 

ALTER TABLE games
ADD CONSTRAINT fk_owner
FOREIGN KEY (owner) REFERENCES users(id);

ALTER TABLE spell
ADD CONSTRAINT fk_character 
FOREIGN KEY (character_id) REFERENCES characters(id);
