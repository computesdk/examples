import { NextResponse } from 'next/server';
import { agentcore } from '@computesdk/agentcore';

const compute = agentcore({
  region: process.env.AWS_REGION,
});

export async function POST() {

  const sandbox = await compute.sandbox.create();

  // Files persist for the life of the session
  await sandbox.filesystem.writeFile('/tmp/hello.py', 'print("Hello from AgentCore!")');

  // Each runCommand call runs in a fresh shell, but the filesystem persists between calls
  const result = await sandbox.runCommand('python3 /tmp/hello.py');
  console.log(result.stdout); // "Hello from AgentCore!"

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    output: result.stdout,
  });
}
