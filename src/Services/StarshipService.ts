import type { Starship } from "@/models/Starship";

const BASE_URL = "https://swapi-node.now.sh/api/starships/";

export async function getStarship(id: string): Promise<Starship> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
