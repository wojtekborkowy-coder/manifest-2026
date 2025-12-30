/// <reference types="vite/client" />

// Augment the NodeJS namespace to properly type process.env properties
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
  }
}
