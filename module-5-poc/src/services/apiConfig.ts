// Vite replaces import.meta.env.VITE_API_BASE_URL at build time
// the value ends up in the browser bundle so it is public, no secrets here
export const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL ?? ''
// joins the base url and a path without a double slash
export function buildApiUrl(path: string): string {
  const cleanBase = apiBaseUrl.replace(/\/+$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  return `${cleanBase}/${cleanPath}`
}
