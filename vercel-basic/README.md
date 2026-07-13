Deploy this example with Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcomputesdk%2Fexamples%2Ftree%2Fmain%2Fvercel-basic)

This simple Next.js app shows you how to use [ComputeSDK](https://github.com/computesdk/computesdk) to create sandboxes with Vercel and run a simple Vite app inside of the sandbox.
We used Vercel for this example, but the same `runCommand`/`filesystem`/`getUrl` code works with any ComputeSDK provider (Daytona, Modal, E2B, Blaxel, CodeSandbox, and more) — just swap the import.
Go here for the [step-by-step instructions](https://www.computesdk.com/blog/how-to-run-your-first-vercel-sandbox/).

## Setup

1. Copy `env.example` to `.env` and fill in your Vercel credentials — either a token/team/project trio, or `VERCEL_OIDC_TOKEN` via `vercel link && vercel env pull`:

   ```bash
   VERCEL_TOKEN=your_vercel_token
   VERCEL_TEAM_ID=your_vercel_team_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and click "Create Vercel sandbox". This creates a sandbox on Vercel with port `5173` pre-declared, scaffolds a Vite React app inside it, starts its dev server, and returns a preview URL you can open in your browser.

## How it works

`app/api/sandbox/route.ts` imports the `vercel` factory from `@computesdk/vercel`, configures it with your credentials, and calls `compute.sandbox.create({ ports: [5173] })` — Vercel sandboxes only expose ports you declare up front, so this has to happen at creation time, not later when calling `getUrl()`. From there it uses ComputeSDK's universal `runCommand`, `filesystem.writeFile`, and `getUrl` methods.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
