import { Planet } from "@/models/Planet";
import { environment } from "@/environments/environment";
const BASE_URL = `${environment.apiUrl}/planets/`;

export async function getPlanet(id: string): Promise<Planet> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
