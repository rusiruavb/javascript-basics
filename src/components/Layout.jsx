import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { topics } from '../data/topics';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isTopicComplete, getProgress } = useProgress();
  const location = useLocation();

  const progress = getProgress(topics.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">JS for React</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-200">Progress:</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-[57px] left-0 z-30 h-[calc(100vh-57px)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 overflow-y-auto scrollbar-thin`}
        >
          <nav className="p-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Topics
            </h2>
            <ul className="space-y-1">
              {topics.map((topic) => {
                const isActive = location.pathname === topic.path;
                const isComplete = isTopicComplete(topic.id);

                return (
                  <li key={topic.id}>
                    <Link
                      to={topic.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{topic.order}.</span>
                          <span className="text-sm">{topic.title}</span>
                        </div>
                        {isComplete && <span className="text-green-500">✓</span>}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 max-w-4xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
};
