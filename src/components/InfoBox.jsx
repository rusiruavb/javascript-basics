export const InfoBox = ({ type = 'info', title, children }) => {
  const styles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500',
      icon: 'ℹ️',
      titleColor: 'text-blue-900 dark:text-blue-200',
    },
    tip: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      icon: '💡',
      titleColor: 'text-green-900 dark:text-green-200',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-500',
      icon: '⚠️',
      titleColor: 'text-yellow-900 dark:text-yellow-200',
    },
    react: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-500',
      icon: '⚛️',
      titleColor: 'text-purple-900 dark:text-purple-200',
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-4 p-4 ${style.bg} rounded-lg border-l-4 ${style.border}`}>
      <div className="flex items-start gap-2">
        <span className="text-xl">{style.icon}</span>
        <div className="flex-1">
          {title && <h4 className={`font-semibold mb-1 ${style.titleColor}`}>{title}</h4>}
          <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
};
