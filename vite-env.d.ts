/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // dodaj inne zmienne środowiskowe tutaj, jeśli są potrzebne
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}