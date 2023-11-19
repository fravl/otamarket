import path from "path";
import react from "@vitejs/plugin-react";
import basicSsl from '@vitejs/plugin-basic-ssl';
import { PluginOption, defineConfig } from "vite";

export default defineConfig({
    //plugins: [react(), basicSsl() as PluginOption],
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
