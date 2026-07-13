import { NextResponse } from 'next/server';
import { superserve } from '@computesdk/superserve';

const compute = superserve({
  apiKey: process.env.SUPERSERVE_API_KEY,
});

export async function POST() {

  const sandbox = await compute.sandbox.create();

  // Create basic Vite React app
  await sandbox.runCommand('npm create vite@5 app -- --template react');

  // Install dependencies
  await sandbox.runCommand('npm install', {
    cwd: 'app',
  })

  // Start dev server, binding to 0.0.0.0 so we can reach it from inside the sandbox
  sandbox.runCommand('npm run dev -- --host 0.0.0.0 > vite.log 2>&1', {
    cwd: 'app',
  });

  // Give the dev server a moment to start, then check it from inside the sandbox
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const healthCheck = await sandbox.runCommand(
    'curl -s -o /dev/null -w "%{http_code}" http://localhost:5173',
    { cwd: 'app' }
  );
  console.log('Vite dev server HTTP status:', healthCheck.stdout);

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    viteStatus: healthCheck.stdout,
  });
}
