import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const AsyncAwait = () => {
  return (
    <TopicPage
      topicId="async-await"
      title="Async/Await"
      description="Modern async syntax and error handling"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is Async/Await?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous
            code. Instead of chaining .then() calls, you can write async code that reads top-to-bottom like normal
            code. It's the modern standard for handling async operations!
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          Async/await is THE standard way to fetch data in React components. It makes code cleaner, errors easier to
          handle, and logic easier to follow. Every modern React developer should master this!
        </InfoBox>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold mb-2 text-green-900 dark:text-green-200">Key Concepts</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>async</strong> keyword: Makes a function return a Promise</li>
            <li><strong>await</strong> keyword: Pauses execution until Promise resolves</li>
            <li><strong>try/catch</strong>: Handle errors (replaces .catch())</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic async/await</h2>

          <CodeExample
            title="Example 1: Your First async Function"
            code={`async function getData() {
  return 'Hello, async!';
}

// async functions always return a Promise
getData().then(result => console.log(result));

// Or use await (in another async function)
async function main() {
  const result = await getData();
  console.log('Result:', result);
}

main();`}
            explanation="async keyword makes a function return a Promise automatically. await pauses until the Promise resolves."
            initialOutput="Hello, async!\nResult: Hello, async!"
          />

          <CodeExample
            title="Example 2: await Pauses Execution"
            code={`const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function demo() {
  console.log('Start');

  await delay(1000); // Wait 1 second
  console.log('After 1 second');

  await delay(1000); // Wait another second
  console.log('After 2 seconds');
}

demo();`}
            explanation="await pauses the function until the Promise resolves. Code reads top-to-bottom!"
            initialOutput="Start\nAfter 1 second\nAfter 2 seconds"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Promises vs async/await</h2>

          <CodeExample
            title="Example 3: Same Logic, Different Syntax"
            code={`// Simulated API fetch
const fetchUser = () => {
  return Promise.resolve({ id: 1, name: 'Alice' });
};

// Using Promises (.then)
function getUserPromise() {
  fetchUser()
    .then(user => {
      console.log('Promise way:', user.name);
    });
}

// Using async/await (cleaner!)
async function getUserAsync() {
  const user = await fetchUser();
  console.log('Async/await way:', user.name);
}

getUserPromise();
getUserAsync();`}
            explanation="async/await does the same thing as Promises but with cleaner syntax. No .then() chains!"
            initialOutput="Promise way: Alice\nAsync/await way: Alice"
          />

          <CodeExample
            title="Example 4: Sequential vs Parallel"
            code={`const fetchData = (name, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(name), delay);
  });
};

// Sequential: wait for each
async function sequential() {
  console.log('Sequential start');
  const a = await fetchData('First', 1000);
  const b = await fetchData('Second', 1000);
  console.log('Sequential done:', a, b);
}

// Parallel: start all, then wait
async function parallel() {
  console.log('Parallel start');
  const [a, b] = await Promise.all([
    fetchData('First', 1000),
    fetchData('Second', 1000)
  ]);
  console.log('Parallel done:', a, b);
}

sequential();
parallel();`}
            explanation="Sequential awaits are slower. Use Promise.all() to run multiple async operations in parallel!"
            initialOutput="Sequential start\nParallel start\nSequential done: First Second\nParallel done: First Second"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Handling with try/catch</h2>

          <CodeExample
            title="Example 5: Handling Errors"
            code={`const riskyFetch = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('Data loaded');
    } else {
      reject(new Error('Failed to load'));
    }
  });
};

async function fetchData() {
  try {
    const data = await riskyFetch();
    console.log('Success:', data);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

fetchData();`}
            explanation="try/catch handles errors in async functions. Much cleaner than .catch()!"
            initialOutput="Error: Failed to load"
          />

          <CodeExample
            title="Example 6: Complete Error Handling Pattern"
            code={`async function fetchUserData() {
  let loading = true;
  let data = null;
  let error = null;

  try {
    console.log('Loading...');

    const response = await Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ name: 'Alice' })
    });

    if (!response.ok) {
      throw new Error('API Error');
    }

    data = await response.json();
    console.log('Data:', data);

  } catch (err) {
    error = err.message;
    console.log('Error:', error);

  } finally {
    loading = false;
    console.log('Done loading');
  }
}

fetchUserData();`}
            explanation="This is the React pattern: try for success, catch for errors, finally to cleanup (hide spinner)."
            initialOutput="Loading...\nData: { name: 'Alice' }\nDone loading"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React useEffect Pattern</h2>

          <CodeExample
            title="Example 7: React Data Fetching Pattern"
            code={`// Simulating React useEffect pattern
const useEffectSimulation = () => {
  async function fetchData() {
    try {
      console.log('Fetching users...');

      const response = await Promise.resolve({
        users: ['Alice', 'Bob', 'Charlie']
      });

      console.log('Users loaded:', response.users);

    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  fetchData();
};

useEffectSimulation();`}
            explanation="This is how you fetch data in React useEffect. Clean, readable, standard pattern!"
            initialOutput="Fetching users...\nUsers loaded: [ 'Alice', 'Bob', 'Charlie' ]"
          />

          <CodeExample
            title="Example 8: Chaining Async Operations"
            code={`const fetchUser = (id) => {
  return Promise.resolve({ id, name: 'Alice' });
};

const fetchUserPosts = (userId) => {
  return Promise.resolve([
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' }
  ]);
};

async function getUserWithPosts(userId) {
  try {
    const user = await fetchUser(userId);
    console.log('User:', user.name);

    const posts = await fetchUserPosts(user.id);
    console.log('Posts:', posts.length, 'posts');

    return { user, posts };

  } catch (error) {
    console.log('Error:', error);
  }
}

getUserWithPosts(1);`}
            explanation="Sequential async operations are clean with await. Each step waits for the previous one."
            initialOutput="User: Alice\nPosts: 2 posts"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Arrow Functions with async</h2>

          <CodeExample
            title="Example 9: async Arrow Functions (React Standard)"
            code={`// Regular async function
async function getData1() {
  return 'data';
}

// async arrow function (preferred in React!)
const getData2 = async () => {
  return 'data';
};

// async arrow with await
const fetchAndLog = async () => {
  const data = await getData2();
  console.log('Data:', data);
};

fetchAndLog();`}
            explanation="Arrow functions can be async too! This is the standard syntax in React components."
            initialOutput="Data: data"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Using await Without async"
            rightLabel="Marking Function as async"
            wrong={`function getData() {
  const result = await fetch('/api');
  // Error: await only works in async!
}`}
            right={`async function getData() {
  const result = await Promise.resolve('data');
  console.log(result);
  return result;
}

getData();`}
            explanation="await only works inside async functions. Always add async keyword!"
          />

          <MistakeExample
            wrongLabel="Forgetting await (Common Bug!)"
            rightLabel="Using await"
            wrong={`async function getData() {
  const data = fetchData();
  console.log(data); // Promise object!
}`}
            right={`async function getData() {
  const data = await fetchData();
  console.log('Data:', data);
}

const fetchData = async () => 'my data';
getData();`}
            explanation="Without await, you get a Promise object, not the resolved value. Don't forget await!"
          />

          <MistakeExample
            wrongLabel="Not Handling Errors"
            rightLabel="Using try/catch"
            wrong={`async function riskyOperation() {
  const data = await fetchData();
  // If this fails, app crashes!
}`}
            right={`async function riskyOperation() {
  try {
    const data = await Promise.resolve('data');
    console.log('Success:', data);
  } catch (error) {
    console.log('Error:', error.message);
  }
}

riskyOperation();`}
            explanation="Always wrap await in try/catch for error handling. Especially important in React!"
          />
        </div>

        <QuickReference
          items={[
            'async keyword makes a function return a Promise',
            'await pauses execution until Promise resolves',
            'await only works inside async functions',
            'try/catch handles errors (replaces .catch())',
            'finally block runs after try/catch (for cleanup)',
            'Sequential awaits run one after another (slower)',
            'Use Promise.all() for parallel async operations (faster)',
            'async/await is the standard for React data fetching',
          ]}
        />

        <InfoBox type="react" title="React Data Fetching Template">
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
            <code>{`useEffect(() => {
  async function fetchData() {
    try {
      const data = await fetch('/api').then(r => r.json());
      setData(data);
    } catch (error) {
      setError(error);
    }
  }
  fetchData();
}, []);`}</code>
          </pre>
        </InfoBox>

        <InfoBox type="tip" title="async/await Best Practices">
          <ul className="space-y-1 text-sm">
            <li>• Default to async/await over .then() chains</li>
            <li>• Always use try/catch for error handling</li>
            <li>• Use Promise.all() for independent async operations</li>
            <li>• Combine with arrow functions in React</li>
          </ul>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
