"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/fetchData";

// Type qu'on crée nous même
export type Character = {
  id: number;
  name: string;
  possesses?: boolean;
  weapons: string[];
  village: string;
  dexterity?: number;
};

export default function Character() {
  // Hook d'état qui permet de stocker des données définies
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction asynchrone qui permet de récupérer nos données depuis notre API
  const getAllCharacters = async () => {
    try {
      const data = await fetchData<Character[]>(
        `${process.env.API_BASE_URL}/characters/getall`
      );
      setCharacters(data);
    } catch (err) {
      setError("Impossible de charger les données.");
    } finally {
      setLoading(false);
    }
  };

  // Hook qui permet de récupérer les données dès le chargement de la page
  useEffect(() => {
    getAllCharacters();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Boucle de tous nos objets de notre tableau "characters"
  return characters.map((character: Character, index: number) => (
    <div key={index}>
      <p>Personnage: {character.name}</p>
      <p>Possédé: {character.possesses ? "Oui" : "Non"}</p>
      <p>Arme(s): {character.weapons.join(" / ")}</p>
      <p>Village: {character.village}</p>
      <Link href={`/character/${character.id}`}>
        <i>Fiche du personnage</i>
      </Link>

      <br />
      <br />
    </div>
  ));
}
