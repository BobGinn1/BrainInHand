import { Review } from "@/models/Review";

const BASE_URL = "https://swapi-node.vercel.app/api/Review/";

export async function submitReview(review: Review): Promise<any> {
  try {
    console.log("test: ");
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    console.log("response.ok: ", response.ok);
    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
      } catch {
        errorText = response.statusText;
      }

      let sanitizedMessage = "unknown error";
      if (response.status === 404) {
        sanitizedMessage = "endpoint not found";
      } else if (response.status === 500) {
        sanitizedMessage = "unknown server error";
      }

      throw new Error(
        `Failed to submit review: ${response.status} - ${sanitizedMessage}`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}
