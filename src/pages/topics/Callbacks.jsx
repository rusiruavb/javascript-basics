import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Callbacks = () => {
  return (
    <TopicPage
      topicId="callbacks"
      title="Callbacks"
      description="Understanding callback functions and asynchronous patterns"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is a Callback?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A callback is a function passed as an argument to another function, which is then called (or "called back")
            at a later time. Callbacks are one of the most fundamental patterns in JavaScript — they're how JavaScript
            handles asynchronous operations and event-driven programming.
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React is built on callbacks. Event handlers (onClick, onChange), useEffect cleanup functions, setState updater
          functions, and array methods like map/filter all use callbacks. Understanding callbacks is essential before
          learning Promises and async/await.
        </InfoBox>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Synchronous Callbacks</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Synchronous callbacks are executed immediately when the function they're passed to runs. Array methods like
            map, filter, and forEach are common examples.
          </p>

          <CodeExample
            title="Example 1: Basic Callback"
            code={`function greet(name, callback) {
  const message = 'Hello, ' + name + '!';
  callback(message);
}

function logMessage(msg) {
  console.log(msg);
}

greet('Alice', logMessage);

// Or with an anonymous function
greet('Bob', function(msg) {
  console.log(msg.toUpperCase());
});`}
            explanation="A callback is just a function passed to another function. The receiving function decides when to call it."
            initialOutput="Hello, Alice!\nHELLO, BOB!"
          />

          <CodeExample
            title="Example 2: Arrow Functions as Callbacks"
            code={`function calculate(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log('Add:', calculate(5, 3, add));
console.log('Multiply:', calculate(5, 3, multiply));

// Inline arrow function
console.log('Subtract:', calculate(10, 4, (x, y) => x - y));`}
            explanation="Arrow functions are the most common way to write callbacks in modern JavaScript and React. They're concise and don't have their own 'this' binding."
            initialOutput="Add: 8\nMultiply: 15\nSubtract: 6"
          />

          <CodeExample
            title="Example 3: Callbacks with Array Methods"
            code={`const numbers = [1, 2, 3, 4, 5];

// forEach - callback runs for each element
numbers.forEach((num) => {
  console.log('Number:', num);
});

// map - callback transforms each element
const doubled = numbers.map((num) => num * 2);
console.log('Doubled:', doubled);

// filter - callback decides what to keep
const evens = numbers.filter((num) => num % 2 === 0);
console.log('Evens:', evens);`}
            explanation="Array methods are the most common use of synchronous callbacks. The callback is called once for each element in the array."
            initialOutput="Number: 1\nNumber: 2\nNumber: 3\nNumber: 4\nNumber: 5\nDoubled: [ 2, 4, 6, 8, 10 ]\nEvens: [ 2, 4 ]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Asynchronous Callbacks</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Asynchronous callbacks are executed later, after some operation completes. This is how JavaScript handles
            tasks like timers, network requests, and file operations without blocking the main thread.
          </p>

          <CodeExample
            title="Example 4: setTimeout Callback"
            code={`console.log('1. Start');

setTimeout(() => {
  console.log('3. Inside setTimeout (runs later)');
}, 1000);

console.log('2. End (runs before setTimeout!)');`}
            explanation="setTimeout takes a callback that runs after a delay. Notice the order — JavaScript doesn't wait for the timer. It continues running and comes back to the callback later."
            initialOutput="1. Start\n2. End (runs before setTimeout!)\n3. Inside setTimeout (runs later)"
          />

          <CodeExample
            title="Example 5: Simulating an API Call"
            code={`function fetchUser(userId, onSuccess, onError) {
  console.log('Fetching user ' + userId + '...');

  // Simulating async operation
  setTimeout(() => {
    if (userId > 0) {
      onSuccess({ id: userId, name: 'Alice', email: 'alice@example.com' });
    } else {
      onError('Invalid user ID');
    }
  }, 500);
}

fetchUser(1,
  (user) => console.log('Got user:', user.name),
  (error) => console.log('Error:', error)
);

fetchUser(-1,
  (user) => console.log('Got user:', user.name),
  (error) => console.log('Error:', error)
);`}
            explanation="Before Promises, this was the standard pattern for async operations — pass a success callback and an error callback. You'll see this pattern in older APIs."
            initialOutput="Fetching user 1...\nFetching user -1...\nGot user: Alice\nError: Invalid user ID"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React Callback Patterns</h2>

          <CodeExample
            title="Example 6: Event Handler Callbacks"
            code={`// Simulating React event handlers
const Button = ({ onClick, label }) => {
  return { type: 'button', label, onClick };
};

const handleClick = () => {
  console.log('Button clicked!');
};

const handleInputChange = (value) => {
  console.log('Input changed to:', value);
};

// Creating button with callback
const btn = Button({ onClick: handleClick, label: 'Click Me' });
btn.onClick();

// Simulating input change
handleInputChange('Hello');
handleInputChange('Hello World');`}
            explanation="In React, event handlers are callbacks. You pass functions as props (onClick, onChange) and React calls them when events occur."
            initialOutput="Button clicked!\nInput changed to: Hello\nInput changed to: Hello World"
          />

          <CodeExample
            title="Example 7: Callback Props (Parent-Child Communication)"
            code={`// Parent component pattern
const TodoApp = () => {
  const todos = ['Learn callbacks', 'Learn promises'];

  const handleAddTodo = (newTodo) => {
    console.log('Adding todo:', newTodo);
    todos.push(newTodo);
    console.log('All todos:', todos);
  };

  const handleDeleteTodo = (index) => {
    console.log('Deleting todo at index:', index);
    todos.splice(index, 1);
    console.log('Remaining todos:', todos);
  };

  // Simulating child calling the callbacks
  handleAddTodo('Learn async/await');
  handleDeleteTodo(0);

  return todos;
};

TodoApp();`}
            explanation="In React, parent components pass callback functions as props to children. The child calls the callback to communicate back up to the parent. This is the primary way data flows upward in React."
            initialOutput="Adding todo: Learn async/await\nAll todos: [ 'Learn callbacks', 'Learn promises', 'Learn async/await' ]\nDeleting todo at index: 0\nRemaining todos: [ 'Learn promises', 'Learn async/await' ]"
          />

          <CodeExample
            title="Example 8: useEffect Cleanup Pattern"
            code={`// Simulating React's useEffect with cleanup
function simulateEffect(setupCallback) {
  console.log('Running effect setup...');
  const cleanup = setupCallback();

  // Later, when component unmounts or re-renders
  if (typeof cleanup === 'function') {
    console.log('Running cleanup...');
    cleanup();
  }
}

simulateEffect(() => {
  console.log('Subscribed to events');

  // Return a cleanup callback
  return () => {
    console.log('Unsubscribed from events');
  };
});`}
            explanation="useEffect takes a callback that runs after render. That callback can return another callback for cleanup. Callbacks returning callbacks is a powerful pattern."
            initialOutput="Running effect setup...\nSubscribed to events\nRunning cleanup...\nUnsubscribed from events"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Callback Hell</h2>

          <CodeExample
            title="Example 9: The Problem with Nested Callbacks"
            code={`// Callback hell - deeply nested callbacks
function step1(callback) {
  setTimeout(() => {
    console.log('Step 1 complete');
    callback();
  }, 100);
}

function step2(callback) {
  setTimeout(() => {
    console.log('Step 2 complete');
    callback();
  }, 100);
}

function step3(callback) {
  setTimeout(() => {
    console.log('Step 3 complete');
    callback();
  }, 100);
}

// Nesting gets ugly fast...
step1(() => {
  step2(() => {
    step3(() => {
      console.log('All steps done!');
    });
  });
});`}
            explanation="When you chain multiple async callbacks, you get 'callback hell' — deeply nested code that's hard to read and maintain. This is the main reason Promises were introduced."
            initialOutput="Step 1 complete\nStep 2 complete\nStep 3 complete\nAll steps done!"
          />

          <InfoBox type="tip" title="Escaping Callback Hell">
            Callback hell is solved by Promises (next topic) and async/await. But understanding why callbacks become
            problematic helps you appreciate these modern alternatives.
          </InfoBox>
        </div>

        <div>
          <ComparisonTable
            title="Synchronous vs Asynchronous Callbacks"
            columns={['Feature', 'Synchronous', 'Asynchronous']}
            rows={[
              ['Execution', 'Runs immediately', 'Runs later'],
              ['Blocks code', 'Yes', 'No'],
              ['Examples', 'map, filter, forEach', 'setTimeout, fetch, events'],
              ['Order', 'Predictable', 'Depends on completion time'],
              ['Error handling', 'try/catch works', 'Need error callbacks'],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Calling the Function Instead of Passing It"
            rightLabel="Passing a Function Reference"
            wrong={`const button = document.querySelector('button');

// Wrong: This CALLS the function immediately
button.addEventListener('click', handleClick());`}
            right={`const button = document.querySelector('button');

// Correct: This PASSES the function reference
button.addEventListener('click', handleClick);

// Or with arguments, wrap in arrow function
button.addEventListener('click', () => handleClick('arg'));`}
            explanation="A common beginner mistake is adding () which calls the function immediately instead of passing it as a callback. Pass the function reference without parentheses, or wrap it in an arrow function if you need to pass arguments."
          />

          <MistakeExample
            wrongLabel="Forgetting Async Nature"
            rightLabel="Respecting Async Order"
            wrong={`let result;

setTimeout(() => {
  result = 'data loaded';
}, 1000);

// result is still undefined here!
console.log(result);`}
            right={`setTimeout(() => {
  const result = 'data loaded';
  console.log(result);
  // Use result inside the callback
}, 1000);`}
            explanation="Code after an async callback runs BEFORE the callback. Use the result inside the callback or use Promises/async-await to handle this properly."
          />

          <MistakeExample
            wrongLabel="Creating Functions in Loops"
            rightLabel="Using Proper Closures"
            wrong={`for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints 3, 3, 3
  }, 100);
}`}
            right={`for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints 0, 1, 2
  }, 100);
}`}
            explanation="Using var in loops with callbacks is a classic bug. var is function-scoped, so all callbacks share the same variable. Use let which is block-scoped and creates a new variable for each iteration."
          />
        </div>

        <QuickReference
          items={[
            'A callback is a function passed as an argument to another function',
            'Synchronous callbacks run immediately (map, filter, forEach)',
            'Asynchronous callbacks run later (setTimeout, event listeners, fetch)',
            'Pass function references without () — onClick={handleClick} not onClick={handleClick()}',
            'React uses callbacks everywhere: event handlers, useEffect, setState',
            'Parent-to-child communication in React uses callback props',
            'Deeply nested callbacks create "callback hell" — use Promises instead',
            'Use let (not var) in loops with callbacks to avoid closure bugs',
          ]}
        />

        <InfoBox type="tip" title="Callback Flow">
          <ul className="space-y-2">
            <li>• <strong>Sync callbacks:</strong> Array methods, custom iterators → run immediately</li>
            <li>• <strong>Event callbacks:</strong> onClick, onChange → run when user interacts</li>
            <li>• <strong>Timer callbacks:</strong> setTimeout, setInterval → run after delay</li>
            <li>• <strong>Async callbacks:</strong> API calls, file reads → run when operation completes</li>
            <li>• <strong>Next step:</strong> Learn Promises for cleaner async patterns →</li>
          </ul>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
