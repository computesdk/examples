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
          RAILWAY_API_TOKEN + RAILWAY_ENVIRONMENT_ID
        </code>{' '}
        variables to test.
      </p>
      <p className="mt-4 text-sm text-gray-800 text-center">
        Then check the server terminal — Railway sandboxes don't expose public
        preview URLs, so this demo confirms the Vite dev server started by
        curling it from inside the sandbox instead of opening it in a browser.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="https://railway.com/account/tokens"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
        >
          Get Railway API token
        </a>
      </div>
    </div>
  );
}

export default App;
