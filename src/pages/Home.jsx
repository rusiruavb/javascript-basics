import { Link } from 'react-router-dom';
import { topics } from '../data/topics';
import { useProgress } from '../contexts/ProgressContext';

export const Home = () => {
  const { isTopicComplete } = useProgress();

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          JavaScript for React Developers
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Master the essential JavaScript concepts you need before diving into React development
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="font-semibold">Modern JavaScript</h3>
              <p className="text-blue-100">ES6+ features used in React applications</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold">Practical Examples</h3>
              <p className="text-blue-100">Run code directly in your browser</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-semibold">React-Ready</h3>
              <p className="text-blue-100">Examples tailored for React development</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-semibold">Quick Reference</h3>
              <p className="text-blue-100">Cheat sheets for every topic</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Topic</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const isComplete = isTopicComplete(topic.id);
            return (
              <Link
                key={topic.id}
                to={topic.path}
                className="group block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {topic.order.toString().padStart(2, '0')}
                  </span>
                  {isComplete && <span className="text-green-500 text-xl">✓</span>}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">💡 Learning Tips</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Run all code examples to see how they work</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Try modifying the examples to experiment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Complete topics in order for the best learning experience</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Mark topics as complete to track your progress</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
