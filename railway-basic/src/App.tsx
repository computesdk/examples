import './App.css';

function App() {
  const createSandbox = async () => {
    const res = await fetch('/api/sandbox', { method: 'POST' });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="mb-8 text-4xl font-bold">Railway Sandbox Test</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        type="button"
        onClick={createSandbox}
      >
        Create Railway sandbox
      </button>
      <p className="mt-4 text-sm text-gray-800 text-center">
        Create a new{' '}
        <code className="rounded text-blue-700 bg-gray-100 px-1 py-0.5 text-xs">
          .env
        </code>{' '}
        file and add your{' '}
        <code className="rounded text-blue-700 bg-gray-100 px-1 py-0.5 text-xs">
          COMPUTESDK_API_KEY
        </code>{' '}
        +{' '}
        <code className="rounded text-blue-700 bg-gray-100 px-1 py-0.5 text-xs">
          RAILWAY_API_KEY + RAILWAY_PROJECT_ID + RAILWAY_ENVIRONMENT_ID
        </code>{' '}
        variables to test.
      </p>
      <p className="mt-4 text-sm text-gray-800 text-center">
        Then check the terminal for your sandbox preview URL to see your starter
        Vite app running in your Railway sandbox!
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://console.computesdk.com/login?ref=stackblitz-railway-template"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Get ComputeSDK API key
        </a>
        <a
          href="https://railway.com?ref=computesdk-e2b-template"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Get Railway API key
        </a>
      </div>
    </div>
  );
}

export default App;
