import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { getNextTopic, getPreviousTopic } from '../data/topics';

export const TopicPage = ({ topicId, title, description, children }) => {
  const { isTopicComplete, markTopicComplete, markTopicIncomplete } = useProgress();
  const nextTopic = getNextTopic(topicId);
  const previousTopic = getPreviousTopic(topicId);
  const isComplete = isTopicComplete(topicId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <nav className="text-sm text-gray-600 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{title}</span>
        </nav>
        <button
          onClick={() => (isComplete ? markTopicIncomplete(topicId) : markTopicComplete(topicId))}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isComplete
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {isComplete ? '✓ Completed' : 'Mark as Complete'}
        </button>
      </div>

      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div>{children}</div>

      <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
        <div>
          {previousTopic ? (
            <Link
              to={previousTopic.path}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <span>←</span>
              <div className="text-left">
                <div className="text-xs text-gray-600 dark:text-gray-400">Previous</div>
                <div className="font-medium">{previousTopic.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div>
          {nextTopic ? (
            <Link
              to={nextTopic.path}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-blue-100">Next</div>
                <div className="font-medium">{nextTopic.title}</div>
              </div>
              <span>→</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <span>🏠</span>
              <span className="font-medium">Back to Home</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
