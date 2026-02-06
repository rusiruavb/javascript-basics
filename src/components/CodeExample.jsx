import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { InteractiveConsole } from './InteractiveConsole';

export const CodeExample = ({ code, explanation, title, initialOutput }) => {
  const [output, setOutput] = useState(initialOutput || '');
  const [error, setError] = useState(false);

  const runCode = () => {
    setError(false);
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(args.map((arg) => String(arg)).join(' '));
    };

    console.error = (...args) => {
      logs.push('Error: ' + args.map((arg) => String(arg)).join(' '));
    };

    try {
      const wrappedCode = `
        (function() {
          ${code}
        })();
      `;
      eval(wrappedCode);
      setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)');
    } catch (err) {
      setError(true);
      setOutput(`Error: ${err.message}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  return (
    <div className="my-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {title && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
        </div>
      )}
      <div className="p-4">
        <CodeBlock code={code} />
        <button
          onClick={runCode}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          ▶ Run Code
        </button>
        <InteractiveConsole output={output} error={error} />
        {explanation && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
