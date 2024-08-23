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
INSERT INTO users (pseudo, email, password, role, profilimage) VALUES
('john_doe', 'john@example.com', 'player', 'player', '/images/profildeafault.jpg'),
('jane_doe', 'jane@example.com', 'password456', 'admin','/images/profildeafault.jpg' ),
('alice', 'alice@example.com', 'password789', 'game master','/images/profildeafault.jpg'),
('bob', 'bob@example.com', 'password101', 'player','/images/profildeafault.jpg');


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

-- Insertion des données dans la table 'games'
INSERT INTO games (title, player_ingame, player_max, created_at) VALUES
('Dragon Quest', 5, 10, '2024-08-19 10:00:00'),
('Space Adventures', 3, 8, '2024-08-18 14:30:00'),
('Mystic Realms', 4, 6, '2024-08-17 09:15:00'),
('Zombie Apocalypse', 2, 4, '2024-08-16 19:45:00');

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

-- Insertion des données dans la table 'characters'
INSERT INTO characters (name, race, stat_force, stat_agilite, stat_sagesse, stat_charisme, pv, mana, status) VALUES
('Aragorn', 'Human', 18, 15, 12, 14, '100', '50', 'Healthy'),
('Gandalf', 'Wizard', 10, 10, 20, 25, '80', '150', 'Healthy'),
('Legolas', 'Elf', 12, 20, 15, 18, '90', '70', 'Healthy'),
('Gimli', 'Dwarf', 20, 12, 10, 8, '120', '40', 'Healthy');

-- Recréation de la table 'spell'
DROP TABLE IF EXISTS spell;

CREATE TABLE spell (
  id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  spell_title VARCHAR(255),
  spell_description VARCHAR(255),
  FOREIGN KEY (character_id) REFERENCES characters(id)
);

-- Insertion des données dans la table 'spell'
INSERT INTO spell (character_id, spell_title, spell_description) VALUES
(1, 'Sword Slash', 'A powerful sword attack.'),
(2, 'Fireball', 'Throws a fireball causing massive damage.'),
(3, 'Arrow Shot', 'Shoots a precise arrow.'),
(4, 'Hammer Smash', 'Smashes the ground with a mighty hammer.');

ALTER TABLE characters --modifie la table
ADD CONSTRAINT fk_user --ajoute une contrainte portant le nom: Fk_user pour FOREIGN KEY
FOREIGN KEY (user_id) REFERENCES users(id); --definie la FK qui lie la colone user_id de la table characters a ma colonne id de ma table users

ALTER TABLE games
ADD CONSTRAINT fk_owner
FOREIGN KEY (owner) REFERENCES users(id);
