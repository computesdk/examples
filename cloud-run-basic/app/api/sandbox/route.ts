import { NextResponse } from 'next/server';
import { cloudRun } from '@computesdk/cloud-run';

const compute = cloudRun({
  sandboxUrl: process.env.CLOUD_RUN_SANDBOX_URL,
  sandboxSecret: process.env.CLOUD_RUN_SANDBOX_SECRET,
});

export async function POST() {

  const sandbox = await compute.sandbox.create();

  // Write a file
  await sandbox.filesystem.writeFile('/tmp/hello.txt', 'Hello from Cloud Run!');

  // Read it back
  const result = await sandbox.runCommand('cat /tmp/hello.txt');
  console.log(result.stdout); // "Hello from Cloud Run!"

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    output: result.stdout,
  });
}
