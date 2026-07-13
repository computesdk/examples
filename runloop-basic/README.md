A basic Next.js app that uses [ComputeSDK](https://github.com/computesdk/computesdk) to create a sandbox on Runloop and run the example from the blog post.

See the full walkthrough at [computesdk.com/blog/how-to-run-a-runloop-sandbox](https://www.computesdk.com/blog/how-to-run-a-runloop-sandbox/).

## Setup

1. Copy `env.example` to `.env` and fill in your Runloop credentials:

   ```bash
   RUNLOOP_API_KEY=your_runloop_api_key
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and click the button to create a sandbox.

## How it works

`app/api/sandbox/route.ts` imports the `@computesdk/runloop` factory, configures it with your credentials, and calls `compute.sandbox.create()`. From there it uses ComputeSDK's universal sandbox methods — the same methods every ComputeSDK provider supports, so swapping to a different provider is a one-line import change.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
