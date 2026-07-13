import { NextResponse } from 'next/server';
import { archil } from '@computesdk/archil';

const compute = archil({
  apiKey: process.env.ARCHIL_API_KEY,
  region: process.env.ARCHIL_REGION,
});

export async function POST() {

  const diskId = process.env.ARCHIL_DISK_ID;
  if (!diskId) throw new Error('ARCHIL_DISK_ID is not set');

  const sandbox = await compute.sandbox.create({ diskId });

  // Write to the mounted disk
  await sandbox.filesystem.writeFile('/mnt/hello.txt', 'Hello from Archil!');

  // Read it back — a fresh container, same disk
  const result = await sandbox.runCommand('cat /mnt/hello.txt');
  console.log(result.stdout); // "Hello from Archil!"

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    output: result.stdout,
  });
}
