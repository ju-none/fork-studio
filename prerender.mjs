// prerender.mjs
import Prerenderer from "@prerenderer/prerenderer";
import PuppeteerRenderer from "@prerenderer/renderer-puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractRoutesFromApp() {
  const appPath = path.resolve(__dirname, "src/App.tsx");
  const fileContent = fs.readFileSync(appPath, "utf-8");
  const routeRegex = /<Route\s+path=["'`]([^"'`]+)["'`]/g;
  const routes = new Set();
  let match;
  while ((match = routeRegex.exec(fileContent)) !== null) {
    routes.add(match[1].startsWith("/") ? match[1] : "/" + match[1]);
  }
  if (!routes.has("/")) routes.add("/");
  return Array.from(routes);
}

async function prerenderApp() {
  try {
    const distPath = path.resolve(__dirname, "dist");

    const prerenderer = new Prerenderer({
      staticDir: distPath,
      renderer: new PuppeteerRenderer({
        renderAfterDocumentEvent: "app-rendered",
        renderAfterTime: 10000,
        headless: true,
      }),
    });

    console.log("Initialisation du prérendeur...");
    await prerenderer.initialize();

    const routes = extractRoutesFromApp();
    console.log("Routes trouvées:", routes);
    const renderedRoutes = await prerenderer.renderRoutes(routes);

    const dir = path.join(distPath, "/");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const route of renderedRoutes) {
      if (route.route === "/") {
        fs.writeFileSync(path.join(dir, "index.html"), route.html);
        console.log("✓ Route racine prérendue");
      } else {
        const routePath = route.route.substring(1);
        const outputDir = path.join(dir, routePath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(path.join(outputDir, "index.html"), route.html);
        console.log(`✓ Route /${routePath} prérendue`);
      }
    }
    await prerenderer.destroy();
    console.log("✅ Prérendu terminé avec succès");
  } catch (error) {
    console.error("Erreur lors du prérendu :", error);
    process.exit(1);
  }
}

prerenderApp();