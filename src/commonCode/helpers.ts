import router from "@/router";

export function extractId(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}
export function goBack() {
  router.back();
}
