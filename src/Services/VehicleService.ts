import { Vehicle } from "@/models/Vehicle";

const BASE_URL = "https://swapi-node.now.sh/api/vehicles/";

export async function getVehicle(id: string): Promise<Vehicle> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
