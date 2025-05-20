import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import ghpages from 'gh-pages';

const appsDir = path.resolve('apps');

// 🧠 Récupère toutes les apps valides
const apps = fs.readdirSync(appsDir).filter((name) => {
  const appPath = path.join(appsDir, name);
  return fs.statSync(appPath).isDirectory() &&
         fs.existsSync(path.join(appPath, 'package.json'));
});

// 🎯 Filtres si un seul app est spécifié
const appFilter = process.argv[2];
const selectedApps = appFilter ? [appFilter] : apps;

async function buildApp(app: string) {
  console.log(`🚧 Building ${app}...`);
  execSync(`turbo run build --filter=${app}`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      REPO_NAME: `public-${app}`,
      APP_NAME: app,
    },
  });
}

async function deployApp(app: string) {
  const source = path.resolve(`apps/${app}/dist`);

  if (!fs.existsSync(source)) {
    throw new Error(`❌ Build not found for ${app}`);
  }

  // 🚀 Publier sur le repo GitHub `public-[app]`
  const repoUrl = `https://github.com/weshre-dev/public-${app}.git`;

  return new Promise<void>((resolve, reject) => {
    ghpages.publish(
      source,
      {
        branch: 'gh-pages',
        repo: repoUrl,
        message: `Deploy ${app} from turbo monorepo`,
        dotfiles: true,
      },
      (err) => {
        if (err) {
          console.error(`❌ Deployment failed for ${app}:`, err);
          reject(err);
        } else {
          console.log(`✅ Successfully deployed ${app} to ${repoUrl}`);
          resolve();
        }
      }
    );
  });
}

async function main() {
  for (const app of selectedApps) {
    await buildApp(app);
    await deployApp(app);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
