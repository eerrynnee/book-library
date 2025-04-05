import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow access from Docker
    port: 5173, // Use a fixed port
    strictPort: true // Prevent port conflicts
  }
});
