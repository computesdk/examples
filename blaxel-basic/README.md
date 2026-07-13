A basic Next.js app that uses [ComputeSDK](https://github.com/computesdk/computesdk) to create a sandbox on [Blaxel](https://blaxel.ai) and run a Vite app inside it.

See the full walkthrough at [computesdk.com/blog/how-to-run-a-blaxel-sandbox](https://www.computesdk.com/blog/how-to-run-a-blaxel-sandbox/).

## Setup

1. Copy `env.example` to `.env` and fill in your Blaxel credentials:

   ```bash
   BL_API_KEY=your_blaxel_api_key
   BL_WORKSPACE=your_blaxel_workspace
   ```

   Create an account at [blaxel.ai](https://blaxel.ai), then create an API key and find your workspace ID in your workspace settings.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and click "Create Blaxel sandbox". This creates a sandbox on Blaxel, scaffolds a Vite React app inside it, starts its dev server, and returns a preview URL you can open in your browser.

## How it works

`app/api/sandbox/route.ts` imports the `blaxel` factory from `@computesdk/blaxel`, configures it with your API key and workspace, and calls `compute.sandbox.create()`. From there it uses ComputeSDK's universal `runCommand`, `filesystem.writeFile`, and `getUrl` methods — the same methods every ComputeSDK provider supports, so swapping to a different provider is a one-line import change.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the [Next.js Documentation](https://nextjs.org/docs).
