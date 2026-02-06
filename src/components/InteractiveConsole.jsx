export const InteractiveConsole = ({ output, error = false }) => {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mt-4">
      <div className="flex items-center gap-2 mb-2 text-gray-400">
        <span className="text-green-400">❯</span>
        <span>Console Output:</span>
      </div>
      <div className={`whitespace-pre-wrap ${error ? 'text-red-400' : 'text-green-300'}`}>
        {output || '// Click "Run Code" to see output'}
      </div>
    </div>
  );
};
