export const topics = [
  {
    id: 'es-standards',
    title: 'ES Standards',
    description: 'Understanding ECMAScript versions and modern JavaScript',
    path: '/topic/es-standards',
    order: 1,
  },
  {
    id: 'data-types',
    title: 'Data Types',
    description: 'Primitive and Reference types in JavaScript',
    path: '/topic/data-types',
    order: 2,
  },
  {
    id: 'variables',
    title: 'Variables',
    description: 'var, let, const and scoping in JavaScript',
    path: '/topic/variables',
    order: 3,
  },
  {
    id: 'functions',
    title: 'Functions & Arrow Functions',
    description: 'Function declarations, expressions, and arrow syntax',
    path: '/topic/functions',
    order: 4,
  },
  {
    id: 'arrays',
    title: 'Arrays & Array Methods',
    description: 'Essential array methods for React development',
    path: '/topic/arrays',
    order: 5,
  },
  {
    id: 'conditions',
    title: 'Conditions',
    description: 'if/else statements and comparison operators',
    path: '/topic/conditions',
    order: 6,
  },
  {
    id: 'ternary',
    title: 'Ternary Operator',
    description: 'Conditional expressions and JSX patterns',
    path: '/topic/ternary',
    order: 7,
  },
  {
    id: 'callbacks',
    title: 'Callbacks',
    description: 'Understanding callback functions and asynchronous patterns',
    path: '/topic/callbacks',
    order: 8,
  },
  {
    id: 'promises',
    title: 'Promises',
    description: 'Handling asynchronous operations',
    path: '/topic/promises',
    order: 9,
  },
  {
    id: 'async-await',
    title: 'Async/Await',
    description: 'Modern async syntax and error handling',
    path: '/topic/async-await',
    order: 10,
  },
  {
    id: 'event-loop',
    title: 'Event Loop & V8',
    description: 'JavaScript runtime and execution model',
    path: '/topic/event-loop',
    order: 11,
  },
];

export const getTopicById = (id) => {
  return topics.find((topic) => topic.id === id);
};

export const getNextTopic = (currentId) => {
  const currentIndex = topics.findIndex((topic) => topic.id === currentId);
  return currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;
};

export const getPreviousTopic = (currentId) => {
  const currentIndex = topics.findIndex((topic) => topic.id === currentId);
  return currentIndex > 0 ? topics[currentIndex - 1] : null;
};
