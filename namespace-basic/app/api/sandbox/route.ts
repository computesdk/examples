import { NextResponse } from 'next/server';
import { namespace } from '@computesdk/namespace';

const compute = namespace({
  token: process.env.NSC_TOKEN,
  virtualCpu: 4,
  memoryMegabytes: 8192,
});

export async function POST() {

  const sandbox = await compute.sandbox.create();

  const result = await sandbox.runCommand('node -v && npm -v');
  console.log(result.stdout);

  const info = await sandbox.getInfo();
  console.log(`Sandbox status: ${info.status}`);

  return NextResponse.json({
    sandboxId: sandbox.sandboxId,
    status: info.status,
    output: result.stdout,
  });
}
