export const ComparisonTable = ({ title, columns, rows }) => {
  return (
    <div className="my-6 overflow-x-auto">
      {title && <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>}
      <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
