import type { Starship } from "@/models/Starship";
import { environment } from "@/environments/environment";
const BASE_URL = `${environment.apiUrl}/starships/`;

export async function getStarship(id: string): Promise<Starship> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
