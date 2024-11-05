import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PUBLIC_DB_CONNECTION: "mongodb+srv://taliafriedman22:4KhR81gcURXJKuaf@cluster0.dhmsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  }
  /* config options here */
};

export default nextConfig;


