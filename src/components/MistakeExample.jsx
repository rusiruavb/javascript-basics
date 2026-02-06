import { CodeBlock } from './CodeBlock';

export const MistakeExample = ({ wrong, right, wrongLabel = 'Wrong', rightLabel = 'Correct', explanation }) => {
  return (
    <div className="my-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500 text-xl">❌</span>
            <span className="font-semibold text-red-600 dark:text-red-400">{wrongLabel}</span>
          </div>
          <CodeBlock code={wrong} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xl">✅</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{rightLabel}</span>
          </div>
          <CodeBlock code={right} />
        </div>
      </div>
      {explanation && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
        </div>
      )}
    </div>
  );
};
