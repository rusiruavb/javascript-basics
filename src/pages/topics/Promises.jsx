import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Promises = () => {
  return (
    <TopicPage
      topicId="promises"
      title="Promises"
      description="Handling asynchronous operations in JavaScript"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are Promises?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. Think
            of it like ordering food - you get a receipt (promise) immediately, but the food (result) comes later. The
            promise can be fulfilled (food arrives) or rejected (order failed).
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React apps constantly make async operations: fetching data from APIs, loading images, waiting for user input.
          Promises (and async/await) are essential for handling loading states, errors, and data in React components.
        </InfoBox>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold mb-3 text-purple-900 dark:text-purple-200">Promise States</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded font-mono">Pending</span>
              <span>Initial state, operation in progress</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded font-mono">Fulfilled</span>
              <span>Operation completed successfully</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded font-mono">Rejected</span>
              <span>Operation failed</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Creating Promises</h2>

          <CodeExample
            title="Example 1: Basic Promise"
            code={`const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve('Operation successful!');
  } else {
    reject('Operation failed!');
  }
});

promise
  .then(result => console.log('Success:', result))
  .catch(error => console.log('Error:', error));`}
            explanation="A Promise takes a function with resolve (success) and reject (failure) callbacks."
            initialOutput="Success: Operation successful!"
          />

          <CodeExample
            title="Example 2: Simulating Async Operation"
            code={`const fetchData = () => {
  return new Promise((resolve, reject) => {
    console.log('Fetching data...');

    setTimeout(() => {
      const data = { id: 1, name: 'Alice' };
      resolve(data);
    }, 1000);
  });
};

fetchData()
  .then(data => {
    console.log('Data received:', data);
  });`}
            explanation="Promises are perfect for async operations like API calls. setTimeout simulates network delay."
            initialOutput="Fetching data...\nData received: { id: 1, name: 'Alice' }"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Promise Chaining</h2>

          <CodeExample
            title="Example 3: Chaining .then()"
            code={`const step1 = () => {
  return Promise.resolve(5);
};

step1()
  .then(result => {
    console.log('Step 1 result:', result);
    return result * 2;
  })
  .then(result => {
    console.log('Step 2 result:', result);
    return result + 10;
  })
  .then(result => {
    console.log('Final result:', result);
  });`}
            explanation="You can chain .then() calls. Each returns a value for the next .then(). Common in React for data transformation."
            initialOutput="Step 1 result: 5\nStep 2 result: 10\nFinal result: 20"
          />

          <CodeExample
            title="Example 4: Real API Pattern (Simulated)"
            code={`const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alice', age: 25 });
    }, 500);
  });
};

const fetchPosts = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post' },
        { id: 2, title: 'Second Post' }
      ]);
    }, 500);
  });
};

fetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts.length, 'posts');
  });`}
            explanation="Common React pattern: fetch user, then fetch their posts. Chain promises for dependent async calls."
            initialOutput="User: Alice\nPosts: 2 posts"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Handling</h2>

          <CodeExample
            title="Example 5: Handling Errors with .catch()"
            code={`const riskyOperation = () => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      resolve('Success! Number: ' + randomNumber.toFixed(2));
    } else {
      reject('Failed! Number: ' + randomNumber.toFixed(2));
    }
  });
};

riskyOperation()
  .then(result => console.log(result))
  .catch(error => console.log('Error:', error));`}
            explanation=".catch() handles rejected promises. Essential in React for displaying error states!"
            initialOutput="Error: Failed! Number: 0.23"
          />

          <CodeExample
            title="Example 6: Finally Block"
            code={`const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data loaded'), 1000);
  });
};

console.log('Loading...');

fetchData()
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error))
  .finally(() => console.log('Done loading'));`}
            explanation=".finally() runs whether promise succeeds or fails. Perfect for hiding loading spinners in React!"
            initialOutput="Loading...\nData loaded\nDone loading"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Promise.all() - Multiple Promises</h2>

          <CodeExample
            title="Example 7: Promise.all() - Parallel Execution"
            code={`const fetchUsers = () => Promise.resolve(['Alice', 'Bob']);
const fetchPosts = () => Promise.resolve(['Post 1', 'Post 2']);
const fetchComments = () => Promise.resolve(['Comment 1']);

Promise.all([fetchUsers(), fetchPosts(), fetchComments()])
  .then(results => {
    const [users, posts, comments] = results;
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  });`}
            explanation="Promise.all() waits for all promises to complete. Perfect for loading multiple data sources in React!"
            initialOutput="Users: [ 'Alice', 'Bob' ]\nPosts: [ 'Post 1', 'Post 2' ]\nComments: [ 'Comment 1' ]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React Patterns with Promises</h2>

          <CodeExample
            title="Example 8: React useEffect Pattern (Simulated)"
            code={`const simulateUseEffect = () => {
  let isLoading = true;
  let data = null;
  let error = null;

  const fetchAPI = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve({ users: ['Alice', 'Bob'] });
        } else {
          reject(new Error('API failed'));
        }
      }, 1000);
    });
  };

  console.log('Loading:', isLoading);

  fetchAPI()
    .then(result => {
      data = result;
      isLoading = false;
      console.log('Data:', data);
      console.log('Loading:', isLoading);
    })
    .catch(err => {
      error = err.message;
      isLoading = false;
      console.log('Error:', error);
      console.log('Loading:', isLoading);
    });
};

simulateUseEffect();`}
            explanation="This is how React components fetch data: track loading/data/error states with promises!"
            initialOutput="Loading: true\nData: { users: [ 'Alice', 'Bob' ] }\nLoading: false"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Forgetting to Return Promise"
            rightLabel="Returning Promise in Chain"
            wrong={`fetchUser()
  .then(user => {
    fetchPosts(user.id); // Not returned!
  })
  .then(posts => {
    // posts is undefined!
  });`}
            right={`fetchUser()
  .then(user => {
    return fetchPosts(user.id); // Returned!
  })
  .then(posts => {
    console.log('Posts:', posts);
  });`}
            explanation="Always return promises in .then() chains, or the next .then() won't wait for them!"
          />

          <MistakeExample
            wrongLabel="Not Handling Errors"
            rightLabel="Always Use .catch()"
            wrong={`fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
// No error handling!`}
            right={`fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.log('Error:', error);
  });`}
            explanation="Always handle errors with .catch()! In React, this prevents crashes and shows error UI."
          />

          <MistakeExample
            wrongLabel="Nesting Promises (Callback Hell)"
            rightLabel="Chaining Promises"
            wrong={`fetchUser().then(user => {
  fetchPosts(user.id).then(posts => {
    fetchComments(posts[0].id).then(comments => {
      // Nested mess!
    });
  });
});`}
            right={`fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => {
    console.log('Comments:', comments);
  });`}
            explanation="Chain promises instead of nesting. Flat structure is easier to read and maintain!"
          />
        </div>

        <QuickReference
          items={[
            'Promise represents an async operation that will complete later',
            'Three states: Pending → Fulfilled or Rejected',
            '.then() handles success, .catch() handles errors',
            '.finally() runs regardless of success/failure',
            'Chain .then() for sequential async operations',
            'Use Promise.all() to run multiple promises in parallel',
            'Always return promises in .then() chains',
            'Always handle errors with .catch() in React!',
          ]}
        />

        <InfoBox type="tip" title="Modern Alternative">
          While Promises are important to understand, modern React uses async/await syntax which is cleaner. We'll
          cover that next!
        </InfoBox>
      </section>
    </TopicPage>
  );
};
