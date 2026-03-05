import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/fallout', // Adicione isso aqui
    supportFile: false,
  },
});