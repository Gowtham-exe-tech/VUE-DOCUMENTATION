/// <reference types="vite/client" />
// tells TypeScript which env variables exist
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
