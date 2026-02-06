export const QuickReference = ({ title = 'Quick Reference', items }) => {
  return (
    <div className="my-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span>📌</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
