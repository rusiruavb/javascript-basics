import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('completedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const markTopicComplete = (topicId) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const markTopicIncomplete = (topicId) => {
    setCompletedTopics(completedTopics.filter((id) => id !== topicId));
  };

  const isTopicComplete = (topicId) => {
    return completedTopics.includes(topicId);
  };

  const getProgress = (totalTopics) => {
    return totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;
  };

  return (
    <ProgressContext.Provider
      value={{
        completedTopics,
        markTopicComplete,
        markTopicIncomplete,
        isTopicComplete,
        getProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
