import { Planet } from "@/models/Planet";

const BASE_URL = "https://swapi-node.now.sh/api/planets/";

export async function getPlanet(id: string): Promise<Planet> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
