import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");
  let staticPath = distPath;

  // In production, prefer built assets from dist/public
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    staticPath = distPath;
  } else {
    // Fallback to client/public only if dist doesn't exist (dev/test without build)
    const publicPath = path.resolve(import.meta.dirname, "..", "client", "public");
    if (fs.existsSync(publicPath)) {
      app.use(express.static(publicPath));
      staticPath = publicPath;
    } else {
      throw new Error(
        `Could not find the build directory: ${distPath}, make sure to build the client first`,
      );
    }
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = staticPath === distPath 
      ? path.resolve(distPath, "index.html")
      : path.resolve(import.meta.dirname, "..", "client", "index.html");
    res.sendFile(indexPath);
  });
}

(async () => {
  await runApp(serveStatic);
})();
