import { Vehicle } from "@/models/Vehicle";
import { environment } from "@/environments/environment";
const BASE_URL = `${environment.apiUrl}/vehicles/`;

export async function getVehicle(id: string): Promise<Vehicle> {
  const response = await fetch(`${BASE_URL}${id}`);
  const data = await response.json();
  return data;
}
