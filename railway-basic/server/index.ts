import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { railway } from '@computesdk/railway';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = Number(process.env.PORT) || 8081;

const compute = railway({
  token: process.env.RAILWAY_API_TOKEN,
  environmentId: process.env.RAILWAY_ENVIRONMENT_ID,
});

app.use(cors());
app.use(express.json());

// Serve static files from Vite build output
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/api/health', (_req, res) => {
  res.json({ message: 'Server is running' });
});

app.post('/api/sandbox', async (_req, res) => {
  try {
    // Create sandbox
    const sandbox = await compute.sandbox.create();
    console.log(`Sandbox created: ${sandbox.sandboxId}`);

    // Get sandbox info
    const info = await sandbox.getInfo();
    console.log(`Sandbox status: ${info.status}`);

    // Create basic Vite React app
    await sandbox.runCommand('npm create vite@5 app -- --template react');

    // Install dependencies
    const installResult = await sandbox.runCommand('npm install', {
      cwd: 'app'
    });
    console.log('npm install exit code:', installResult.exitCode);
    console.log('npm install stdout:', installResult.stdout);
    if (installResult.stderr)
      console.log('npm install stderr:', installResult.stderr);

    // Start dev server in the background
    sandbox.runCommand('npm run dev -- --host 0.0.0.0 > vite.log 2>&1', {
      cwd: 'app'
    });
    console.log('Dev server started in background');

    // Railway sandboxes don't expose ports or public URLs (getUrl() throws
    // for this provider), so we confirm the dev server is actually up by
    // curling it from inside the sandbox instead of returning a preview URL.
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const healthCheck = await sandbox.runCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost:5173', {
      cwd: 'app',
    });
    console.log('Vite dev server HTTP status:', healthCheck.stdout);

    res.json({
      sandboxId: sandbox.sandboxId,
      viteStatus: healthCheck.stdout,
    });
  } catch (error) {
    console.error('Error creating sandbox:', error);
    res.status(500).json({ error: 'Failed to create sandbox' });
  }
});

// SPA fallback — serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
