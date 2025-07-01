import type { Character } from "../models/Character";

const BASE_URL = "https://swapi-node.vercel.app/api/people/";

export async function getCharacters(): Promise<Character[]> {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.results;
}

export async function getCharacter(id: string): Promise<Character> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
