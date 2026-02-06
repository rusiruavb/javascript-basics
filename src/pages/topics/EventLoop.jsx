import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { QuickReference } from '../../components/QuickReference';
import { EventLoopVisualizer } from '../../components/EventLoopVisualizer';

export const EventLoop = () => {
  return (
    <TopicPage
      topicId="event-loop"
      title="Event Loop & V8 Engine"
      description="Understanding JavaScript runtime and execution model"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is the Event Loop?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The Event Loop is JavaScript's mechanism for handling asynchronous operations. JavaScript is single-threaded
            (one thing at a time), but the Event Loop allows it to handle multiple operations by using a queue system.
            Think of it like a restaurant with one chef who takes orders, cooks them one by one, but can also delegate
            tasks like dishwashing to others.
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          Understanding the Event Loop explains why React state updates are asynchronous, why setTimeout doesn't block
          rendering, and how async operations work. It's crucial for understanding React's rendering behavior and
          avoiding common bugs!
        </InfoBox>

        <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold mb-4 text-purple-900 dark:text-purple-200">Event Loop Components</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded font-mono text-xs">Call Stack</span>
              <span>Where your code executes (one function at a time)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded font-mono text-xs">Web APIs</span>
              <span>Browser features (setTimeout, fetch, DOM events)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded font-mono text-xs">Callback Queue</span>
              <span>Waiting area for callbacks from Web APIs</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded font-mono text-xs">Microtask Queue</span>
              <span>Priority queue for Promises (higher priority!)</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Callbacks</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A callback is a function passed as an argument to another function, to be executed later. Think of it like
            leaving a phone number with a restaurant - they'll "call you back" when your table is ready. Callbacks are
            fundamental to asynchronous JavaScript and the Event Loop!
          </p>

          <CodeExample
            title="Example: Basic Callback"
            code={`function greet(name, callback) {
  console.log('Hello, ' + name);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('Alice', sayGoodbye);`}
            explanation="greet() accepts a callback function and executes it after greeting. This is the foundation of async JavaScript!"
            initialOutput="Hello, Alice\nGoodbye!"
          />

          <CodeExample
            title="Example: Callback with setTimeout (Async!)"
            code={`console.log('1. Start');

setTimeout(function callback() {
  console.log('3. Callback executed after 1 second');
}, 1000);

console.log('2. End');`}
            explanation="The callback goes to Web APIs, doesn't block execution. Synchronous code finishes first!"
            initialOutput="1. Start\n2. End\n3. Callback executed after 1 second"
          />

          <CodeExample
            title="Example: Array Methods Use Callbacks"
            code={`const numbers = [1, 2, 3, 4, 5];

// map() takes a callback function
const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log('Original:', numbers);
console.log('Doubled:', doubled);

// Same with arrow function (modern way)
const tripled = numbers.map(num => num * 3);
console.log('Tripled:', tripled);`}
            explanation="Array methods like map, filter, forEach all use callbacks. You use these constantly in React!"
            initialOutput="Original: [ 1, 2, 3, 4, 5 ]\nDoubled: [ 2, 4, 6, 8, 10 ]\nTripled: [ 3, 6, 9, 12, 15 ]"
          />

          <CodeExample
            title="Example: Event Handlers are Callbacks (React Pattern!)"
            code={`// Simulating event handlers
function setupButton(callback) {
  console.log('Button created');
  // Simulate click after delay
  setTimeout(() => {
    console.log('Button clicked!');
    callback();
  }, 1000);
}

function handleClick() {
  console.log('Click handler executed');
}

setupButton(handleClick);`}
            explanation="In React, onClick, onChange, etc. all use callbacks! The browser calls your function when events happen."
            initialOutput="Button created\nButton clicked!\nClick handler executed"
          />

          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-200">⚠️ Callback Hell (The Problem)</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Before Promises and async/await, deeply nested callbacks created "callback hell" or "pyramid of doom":
            </p>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto font-mono">
              <code>{`getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        // Nested 4 levels deep!
        console.log('Finally done:', d);
      });
    });
  });
});`}</code>
            </pre>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              This is why we use <strong>Promises</strong> and <strong>async/await</strong> in modern JavaScript!
            </p>
          </div>

          <InfoBox type="react" title="Callbacks in React">
            React event handlers are callbacks:
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
              <code>{`// React component
const MyButton = () => {
  const handleClick = () => {
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
};`}</code>
            </pre>
            The browser executes your callback when the event fires!
          </InfoBox>

          <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">Key Callback Concepts:</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Synchronous callbacks:</strong> Execute immediately (array methods like map)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Asynchronous callbacks:</strong> Execute later (setTimeout, event handlers)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Callbacks don't block:</strong> Code continues running while waiting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">•</span>
                <span><strong>Modern alternative:</strong> Use Promises/async-await instead of nested callbacks</span>
              </li>
            </ul>
          </div>
        </div>

        <EventLoopVisualizer />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Call Stack</h2>

          <CodeExample
            title="Example 1: Call Stack in Action"
            code={`function first() {
  console.log('1. First function');
  second();
  console.log('5. First function done');
}

function second() {
  console.log('2. Second function');
  third();
  console.log('4. Second function done');
}

function third() {
  console.log('3. Third function');
}

first();`}
            explanation="Call Stack is LIFO (Last In, First Out). Functions are added when called, removed when they return."
            initialOutput="1. First function\n2. Second function\n3. Third function\n4. Second function done\n5. First function done"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Asynchronous Execution</h2>

          <CodeExample
            title="Example 2: setTimeout and the Event Loop"
            code={`console.log('1. Start');

setTimeout(() => {
  console.log('3. Timeout callback');
}, 0);

console.log('2. End');`}
            explanation="setTimeout goes to Web APIs, callback waits in queue. Synchronous code finishes first, THEN callbacks run!"
            initialOutput="1. Start\n2. End\n3. Timeout callback"
          />

          <CodeExample
            title="Example 3: Multiple Timeouts"
            code={`console.log('1. Start');

setTimeout(() => {
  console.log('4. Timeout 1000ms');
}, 1000);

setTimeout(() => {
  console.log('3. Timeout 0ms');
}, 0);

console.log('2. End');`}
            explanation="Timeouts are queued based on delay, but all run after synchronous code completes."
            initialOutput="1. Start\n2. End\n3. Timeout 0ms\n4. Timeout 1000ms"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Microtasks vs Macrotasks</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            JavaScript has TWO separate queues for async tasks: the Microtask Queue and the Macrotask Queue. Understanding
            the difference is crucial for predicting execution order and avoiding bugs in React!
          </p>

          <div className="my-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-200 mb-4">🔄 Event Loop Processing Order</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Execute Synchronous Code</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    All synchronous code runs first, from top to bottom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h4 className="font-bold text-purple-900 dark:text-purple-200">Process ALL Microtasks</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>HIGH PRIORITY!</strong> Empty the entire Microtask Queue before moving on
                  </p>
                  <div className="bg-purple-200 dark:bg-purple-900/50 p-2 rounded text-xs">
                    <strong>Microtasks include:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Promise callbacks (.then, .catch, .finally)</li>
                      <li>queueMicrotask()</li>
                      <li>MutationObserver callbacks</li>
                      <li>React state updates (uses Promises internally)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border-l-4 border-yellow-500">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h4 className="font-bold text-yellow-900 dark:text-yellow-200">Process ONE Macrotask</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Take ONE task from Macrotask Queue and execute it
                  </p>
                  <div className="bg-yellow-200 dark:bg-yellow-900/50 p-2 rounded text-xs">
                    <strong>Macrotasks include:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>setTimeout / setInterval callbacks</li>
                      <li>setImmediate (Node.js)</li>
                      <li>I/O operations</li>
                      <li>UI rendering</li>
                      <li>requestAnimationFrame</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center text-2xl">
                ⤴️ Repeat steps 2-3
              </div>
            </div>
          </div>

          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">🎯 Key Insight: Microtasks Have Priority!</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              After EACH macrotask, the Event Loop checks if there are ANY microtasks. If yes, it processes ALL of them
              before moving to the next macrotask. This is why Promises always execute before setTimeout!
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded font-mono text-xs">
              <div className="space-y-1">
                <div>Sync code → <span className="text-purple-600 dark:text-purple-400 font-bold">ALL Microtasks</span> → ONE Macrotask</div>
                <div className="ml-8">→ <span className="text-purple-600 dark:text-purple-400 font-bold">ALL Microtasks</span> → ONE Macrotask</div>
                <div className="ml-8">→ <span className="text-purple-600 dark:text-purple-400 font-bold">ALL Microtasks</span> → ONE Macrotask</div>
                <div className="ml-8">→ and so on...</div>
              </div>
            </div>
          </div>

          <div className="my-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
              <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-2 flex items-center gap-2">
                <span>⚡</span> Microtask Queue
              </h4>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div><strong>Priority:</strong> HIGH</div>
                <div><strong>Processing:</strong> ALL at once</div>
                <div><strong>Timing:</strong> After each task</div>
                <div className="pt-2 border-t border-purple-200 dark:border-purple-700">
                  <strong>Examples:</strong>
                  <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                    <li>Promise.then()</li>
                    <li>async/await</li>
                    <li>queueMicrotask()</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-2 flex items-center gap-2">
                <span>⏰</span> Macrotask Queue
              </h4>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div><strong>Priority:</strong> NORMAL</div>
                <div><strong>Processing:</strong> ONE at a time</div>
                <div><strong>Timing:</strong> After all microtasks</div>
                <div className="pt-2 border-t border-yellow-200 dark:border-yellow-700">
                  <strong>Examples:</strong>
                  <ul className="list-disc list-inside mt-1 text-xs space-y-1">
                    <li>setTimeout()</li>
                    <li>setInterval()</li>
                    <li>I/O callbacks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InfoBox type="warning" title="Common Mistake: Assuming setTimeout(fn, 0) Runs Immediately">
            Even with 0ms delay, setTimeout is a macrotask and will wait for ALL microtasks to finish first!
            <pre className="mt-2 text-xs bg-gray-900 text-gray-100 p-2 rounded">
              <code>{`setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));

// Output: Promise, then Timeout
// Not: Timeout, then Promise!`}</code>
            </pre>
          </InfoBox>

          <CodeExample
            title="Example 4: Promise (Microtask) vs setTimeout (Macrotask)"
            code={`console.log('1. Start');

setTimeout(() => {
  console.log('4. setTimeout (macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (microtask)');
});

console.log('2. End');`}
            explanation="Microtasks (Promises) have priority over macrotasks (setTimeout). Promises run before timeouts!"
            initialOutput="1. Start\n2. End\n3. Promise (microtask)\n4. setTimeout (macrotask)"
          />

          <CodeExample
            title="Example 5: Complex Execution Order"
            code={`console.log('1. Sync code');

setTimeout(() => console.log('5. setTimeout 0'), 0);

Promise.resolve()
  .then(() => console.log('3. Promise 1'))
  .then(() => console.log('4. Promise 2'));

console.log('2. More sync code');`}
            explanation="Execution order: 1) Sync code, 2) Microtasks (Promises), 3) Macrotasks (setTimeout)"
            initialOutput="1. Sync code\n2. More sync code\n3. Promise 1\n4. Promise 2\n5. setTimeout 0"
          />

          <CodeExample
            title="Example 6: Microtasks Creating New Microtasks (Advanced!)"
            code={`console.log('1. Start');

setTimeout(() => console.log('8. setTimeout 1'), 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise 1');
    // This Promise creates a NEW microtask!
    Promise.resolve().then(() => {
      console.log('5. Promise 1.1');
    });
  })
  .then(() => {
    console.log('6. Promise 2');
  });

Promise.resolve().then(() => {
  console.log('4. Promise 3');
});

setTimeout(() => console.log('9. setTimeout 2'), 0);

console.log('2. End');`}
            explanation="Even when microtasks create NEW microtasks, ALL microtasks complete before any macrotask runs! Notice both setTimeouts wait until ALL Promises finish."
            initialOutput="1. Start\n2. End\n3. Promise 1\n4. Promise 3\n5. Promise 1.1\n6. Promise 2\n8. setTimeout 1\n9. setTimeout 2"
          />

          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold mb-2 text-red-900 dark:text-red-200">⚠️ Infinite Microtask Loop Warning!</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              If a microtask keeps creating new microtasks infinitely, the Event Loop will NEVER get to macrotasks! This
              can freeze your app:
            </p>
            <pre className="text-xs bg-gray-900 text-red-400 p-2 rounded font-mono">
              <code>{`// ⛔ DON'T DO THIS - Infinite loop!
function bad() {
  Promise.resolve().then(() => {
    console.log('Microtask');
    bad(); // Creates another microtask!
  });
}
bad();

// setTimeout will NEVER run!
setTimeout(() => console.log('Never runs!'), 0);`}</code>
            </pre>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              The Event Loop keeps processing microtasks and never gets to the setTimeout!
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React Implications</h2>

          <CodeExample
            title="Example 7: Why setState is Asynchronous"
            code={`// Simulating React setState behavior
const simulateReactState = () => {
  let count = 0;

  const setState = (newValue) => {
    Promise.resolve().then(() => {
      count = newValue;
      console.log('State updated:', count);
    });
  };

  console.log('1. Before setState, count:', count);

  setState(1);
  console.log('2. After setState, count:', count); // Still 0!

  setState(2);
  console.log('3. After second setState, count:', count);
};

simulateReactState();`}
            explanation="setState uses microtasks, so state updates happen after synchronous code. That's why you can't read state immediately!"
            initialOutput="1. Before setState, count: 0\n2. After setState, count: 0\n3. After second setState, count: 0\nState updated: 2"
          />

          <CodeExample
            title="Example 8: Event Handlers and Rendering"
            code={`const simulateClick = () => {
  console.log('1. Click event fired');

  Promise.resolve().then(() => {
    console.log('3. Re-render (microtask)');
  });

  console.log('2. Event handler done');

  setTimeout(() => {
    console.log('4. Cleanup (macrotask)');
  }, 0);
};

simulateClick();`}
            explanation="React batches state updates and re-renders using the microtask queue for better performance."
            initialOutput="1. Click event fired\n2. Event handler done\n3. Re-render (microtask)\n4. Cleanup (macrotask)"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The V8 Engine</h2>

          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">What is V8?</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              V8 is Google's JavaScript engine that powers Chrome and Node.js. It compiles JavaScript to native machine
              code for fast execution. Key features:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Just-In-Time (JIT) Compilation:</strong> Compiles hot code paths to machine code</li>
              <li>• <strong>Garbage Collection:</strong> Automatically manages memory</li>
              <li>• <strong>Hidden Classes:</strong> Optimizes object property access</li>
              <li>• <strong>Inline Caching:</strong> Remembers type information for speed</li>
            </ul>
          </div>

          <CodeExample
            title="Example 9: Performance - Object Shape Matters"
            code={`// V8 optimizes objects with consistent "shape"

// Good: consistent shape
const createUser1 = (name, age) => ({ name, age });
const user1 = createUser1('Alice', 25);
const user2 = createUser1('Bob', 30);

console.log('Optimized users:', user1, user2);

// Less optimal: inconsistent shape
const user3 = { name: 'Charlie' };
const user4 = { age: 35 };

console.log('Different shapes:', user3, user4);`}
            explanation="V8 optimizes objects with the same property order and types. React components benefit from this!"
            initialOutput="Optimized users: { name: 'Alice', age: 25 } { name: 'Bob', age: 30 }\nDifferent shapes: { name: 'Charlie' } { age: 35 }"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Practical Examples</h2>

          <CodeExample
            title="Example 10: Debouncing with Event Loop Knowledge"
            code={`const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const logSearch = (query) => {
  console.log('Searching for:', query);
};

const debouncedSearch = debounce(logSearch, 1000);

console.log('1. User types...');
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
console.log('2. Waiting for debounce...');`}
            explanation="Debouncing uses setTimeout to delay execution. Common in React for search inputs!"
            initialOutput="1. User types...\n2. Waiting for debounce...\nSearching for: abc"
          />

          <CodeExample
            title="Example 11: Understanding React Hooks Timing"
            code={`const simulateUseEffect = () => {
  console.log('1. Component rendering');

  Promise.resolve().then(() => {
    console.log('3. useEffect runs (after render)');

    setTimeout(() => {
      console.log('4. Async operation in effect');
    }, 0);
  });

  console.log('2. Render complete');
};

simulateUseEffect();`}
            explanation="useEffect runs after render (microtask). Understanding this prevents bugs in React!"
            initialOutput="1. Component rendering\n2. Render complete\n3. useEffect runs (after render)\n4. Async operation in effect"
          />
        </div>

        <QuickReference
          items={[
            'Callbacks are functions passed as arguments to be executed later',
            'Synchronous callbacks execute immediately (map, filter)',
            'Asynchronous callbacks execute later (setTimeout, event handlers)',
            'JavaScript is single-threaded but non-blocking (thanks to Event Loop)',
            'Call Stack: executes functions one at a time (LIFO)',
            'Web APIs handle async operations (setTimeout, fetch, events)',
            'Microtasks (Promises) run before macrotasks (setTimeout)',
            'Execution order: Sync code → Microtasks → Macrotasks',
            'React state updates are asynchronous (use microtask queue)',
            'React event handlers (onClick, onChange) are callbacks',
            'V8 optimizes objects with consistent shapes (property order)',
            'Understanding Event Loop explains React rendering behavior',
          ]}
        />

        <InfoBox type="tip" title="Key Takeaways for React">
          <ul className="space-y-1 text-sm">
            <li>• setState doesn't update immediately - it's queued</li>
            <li>• useEffect runs after render (microtask)</li>
            <li>• Don't rely on state updates happening synchronously</li>
            <li>• Promises resolve before setTimeout callbacks</li>
          </ul>
        </InfoBox>

        <InfoBox type="react" title="Common React Patterns">
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
            <code>{`// ❌ Wrong: reading state right after setState
setState(value);
console.log(state); // Old value!

// ✅ Right: use useEffect to react to state changes
useEffect(() => {
  console.log(state); // Updated value
}, [state]);`}</code>
          </pre>
        </InfoBox>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🎉 Congratulations!</h3>
          <p className="text-gray-700 dark:text-gray-300">
            You've completed all JavaScript fundamentals needed for React development! You now understand modern
            JavaScript syntax, async operations, and how JavaScript executes code. You're ready to build amazing React
            applications!
          </p>
        </div>
      </section>
    </TopicPage>
  );
};
