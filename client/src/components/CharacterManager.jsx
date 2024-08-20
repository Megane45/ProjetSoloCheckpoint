// import { useState, useEffect } from 'react';
// import CharacterForm from './CharacterForm';
// import SpellForm from './SpellForm'; // Assurez-vous que le chemin est correct

// function CharacterManager() {
//   const [characters, setCharacters] = useState([]);
//   const [editingCharacter, setEditingCharacter] = useState(null);
//   const [characterSpells, setCharacterSpells] = useState([]);

//   useEffect(() => {
//     // Charger les personnages et les sorts depuis l'API
//     // Remplacer par vos appels API
//     // fetchCharacters();
//     // fetchSpells();
//   }, []);

//   const fetchCharacters = async () => {
//     // Exemple d'appel API pour récupérer les personnages
//     // const response = await fetch('/api/characters');
//     // const data = await response.json();
//     // setCharacters(data);
//   };

//   const fetchSpells = async () => {
//     // Exemple d'appel API pour récupérer les sorts
//     // const response = await fetch('/api/spells');
//     // const data = await response.json();
//     // setCharacterSpells(data);
//   };

//   const handleSaveCharacter = async (character) => {
//     if (character.id) {
//       // Modifier un personnage existant
//       // await fetch(`/api/characters/${character.id}`, {
//       //   method: 'PUT',
//       //   body: JSON.stringify(character),
//       //   headers: { 'Content-Type': 'application/json' },
//       // });
//       setCharacters(prevCharacters =>
//         prevCharacters.map(c =>
//           c.id === character.id ? character : c
//         )
//       );
//     } else {
//       // Ajouter un nouveau personnage
//       // const response = await fetch('/api/characters', {
//       //   method: 'POST',
//       //   body: JSON.stringify(character),
//       //   headers: { 'Content-Type': 'application/json' },
//       // });
//       // const newCharacter = await response.json();
//       setCharacters(prevCharacters => [
//         ...prevCharacters,
//         { ...character, id: Date.now() }
//       ]);
//     }
//     setEditingCharacter(null);
//   };

//   const handleSaveSpells = async (spells) => {
//     // Enregistrer les sorts pour le personnage
//     // await fetch(`/api/spells`, {
//     //   method: 'POST',
//     //   body: JSON.stringify(spells),
//     //   headers: { 'Content-Type': 'application/json' },
//     // });
//     setCharacterSpells(spells);
//   };

//   const handleEditCharacter = (character) => {
//     // Charger les sorts associés au personnage
//     // fetchSpellsForCharacter(character.id);
//     setEditingCharacter(character);
//   };

//   return (
//     <div>
//       <h1>Gestion des Personnages</h1>
//       <CharacterForm
//         initialCharacter={editingCharacter || { name: '', race: '', stat_force: 0, stat_agilite: 0, stat_sagesse: 0, stat_charisme: 0, pv: '', mana: '', status: 'Healthy' }}
//         initialSpells={characterSpells}
//         onSave={handleSaveCharacter}
//       />
//       <SpellForm
//         initialSpells={characterSpells}
//         onSave={handleSaveSpells}
//       />
//       <ul>
//         {characters.map(character => (
//           <li key={character.id}>
//             {character.name}
//             <button onClick={() => handleEditCharacter(character)}>Modifier</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CharacterManager;
