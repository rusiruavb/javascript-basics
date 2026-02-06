import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Arrays = () => {
  return (
    <TopicPage
      topicId="arrays"
      title="Arrays & Array Methods"
      description="Essential array methods for React development"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are Arrays?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Arrays are ordered lists of values. Think of them as numbered containers holding multiple items. In React,
            you'll use arrays constantly for rendering lists of components.
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React list rendering relies heavily on array methods like map, filter, and find. Understanding these methods
          is absolutely essential for React development. You'll use .map() in almost every React component!
        </InfoBox>

        <div>
          <ComparisonTable
            title="Essential Array Methods"
            columns={['Method', 'Purpose', 'Returns', 'Mutates Original?']}
            rows={[
              ['map()', 'Transform each item', 'New array', '❌ No'],
              ['filter()', 'Keep items matching condition', 'New array', '❌ No'],
              ['find()', 'Find first matching item', 'Single item', '❌ No'],
              ['slice()', 'Copy portion of array', 'New array', '❌ No'],
              ['push()', 'Add to end', 'New length', '✅ Yes'],
              ['concat()', 'Merge arrays', 'New array', '❌ No'],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The map() Method</h2>

          <CodeExample
            title="Example 1: Basic map() - Transform Array"
            code={`const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);`}
            explanation="map() creates a new array by transforming each element. The original array is unchanged."
            initialOutput="Original: [ 1, 2, 3, 4, 5 ]\nDoubled: [ 2, 4, 6, 8, 10 ]"
          />

          <CodeExample
            title="Example 2: map() in React - Rendering Lists"
            code={`const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// Common React pattern
const userElements = users.map(user =>
  \`<li key=\${user.id}>\${user.name}</li>\`
);

console.log(userElements.join('\\n'));`}
            explanation="In React, you'll use map() to convert data arrays into component arrays. Always include a unique 'key' prop!"
            initialOutput="<li key=1>Alice</li>\n<li key=2>Bob</li>\n<li key=3>Charlie</li>"
          />

          <CodeExample
            title="Example 3: map() with Index"
            code={`const fruits = ['apple', 'banana', 'orange'];

const indexed = fruits.map((fruit, index) =>
  \`\${index + 1}. \${fruit}\`
);

console.log(indexed.join('\\n'));`}
            explanation="map() provides the index as a second parameter. Useful but avoid using it as a key in React!"
            initialOutput="1. apple\n2. banana\n3. orange"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The filter() Method</h2>

          <CodeExample
            title="Example 4: Basic filter() - Keep Matching Items"
            code={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evenNumbers = numbers.filter(num => num % 2 === 0);
const greaterThanFive = numbers.filter(num => num > 5);

console.log('Even numbers:', evenNumbers);
console.log('Greater than 5:', greaterThanFive);`}
            explanation="filter() creates a new array with only items that pass the test (return true)."
            initialOutput="Even numbers: [ 2, 4, 6, 8 ]\nGreater than 5: [ 6, 7, 8 ]"
          />

          <CodeExample
            title="Example 5: filter() with Objects (React Pattern)"
            code={`const products = [
  { id: 1, name: 'Laptop', inStock: true },
  { id: 2, name: 'Mouse', inStock: false },
  { id: 3, name: 'Keyboard', inStock: true }
];

const availableProducts = products.filter(p => p.inStock);

console.log('Available products:');
availableProducts.forEach(p => console.log('- ' + p.name));`}
            explanation="Common React pattern: filter data before rendering. Only show in-stock products, active users, etc."
            initialOutput="Available products:\n- Laptop\n- Keyboard"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The find() Method</h2>

          <CodeExample
            title="Example 6: find() - Get Single Item"
            code={`const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'user' }
];

const admin = users.find(user => user.role === 'admin');
const userById = users.find(user => user.id === 2);

console.log('Admin:', admin.name);
console.log('User #2:', userById.name);`}
            explanation="find() returns the first item that matches the condition. Returns undefined if not found."
            initialOutput="Admin: Alice\nUser #2: Bob"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chaining Methods</h2>

          <CodeExample
            title="Example 7: Method Chaining (Power Move!)"
            code={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chain: filter even numbers, then double them
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log('Even numbers doubled:', result);`}
            explanation="You can chain array methods! Very common in React: filter data, then map to components."
            initialOutput="Even numbers doubled: [ 4, 8, 12, 16, 20 ]"
          />

          <CodeExample
            title="Example 8: Real React Pattern - Filter + Map"
            code={`const todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build project', completed: false },
  { id: 3, text: 'Deploy app', completed: true }
];

// Show only incomplete todos
const incompleteTodos = todos
  .filter(todo => !todo.completed)
  .map(todo => \`• \${todo.text}\`);

console.log('Incomplete tasks:');
console.log(incompleteTodos.join('\\n'));`}
            explanation="Classic React pattern: filter data based on state, then map to JSX elements."
            initialOutput="Incomplete tasks:\n• Learn React\n• Build project"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Other Useful Methods</h2>

          <CodeExample
            title="Example 9: slice() and concat()"
            code={`const fruits = ['apple', 'banana', 'orange', 'mango'];

// slice: copy a portion
const someFruits = fruits.slice(1, 3);
console.log('Slice (1-3):', someFruits);

// concat: merge arrays
const moreFruits = fruits.concat(['grape', 'kiwi']);
console.log('Concatenated:', moreFruits);

// Spread operator (modern way)
const evenMore = [...fruits, 'peach'];
console.log('With spread:', evenMore);`}
            explanation="slice() copies arrays. concat() merges them. Spread operator (...) is the modern approach!"
            initialOutput="Slice (1-3): [ 'banana', 'orange' ]\nConcatenated: [ 'apple', 'banana', 'orange', 'mango', 'grape', 'kiwi' ]\nWith spread: [ 'apple', 'banana', 'orange', 'mango', 'peach' ]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Using forEach to Create New Array"
            rightLabel="Using map()"
            wrong={`const numbers = [1, 2, 3];
const doubled = [];

numbers.forEach(n => {
  doubled.push(n * 2);
});`}
            right={`const numbers = [1, 2, 3];

const doubled = numbers.map(n => n * 2);

console.log(doubled);`}
            explanation="Use map() to transform arrays, not forEach(). map() is cleaner and returns a new array."
          />

          <MistakeExample
            wrongLabel="Mutating Original Array"
            rightLabel="Creating New Array"
            wrong={`const items = [1, 2, 3];
items.push(4); // Mutates original!
// Bad in React state`}
            right={`const items = [1, 2, 3];
const newItems = [...items, 4];
// Good: creates new array
console.log(newItems);`}
            explanation="In React, always create new arrays instead of mutating. Use spread operator or concat()."
          />

          <MistakeExample
            wrongLabel="Forgetting to Return in map()"
            rightLabel="Returning Value"
            wrong={`const numbers = [1, 2, 3];
const doubled = numbers.map(n => {
  n * 2; // No return!
});`}
            right={`const numbers = [1, 2, 3];

// Option 1: explicit return
const doubled = numbers.map(n => {
  return n * 2;
});

// Option 2: implicit return
const doubled2 = numbers.map(n => n * 2);

console.log(doubled2);`}
            explanation="With braces {}, you need 'return'. Without braces, return is automatic (implicit)."
          />
        </div>

        <QuickReference
          items={[
            'map() transforms each item → use for React list rendering',
            'filter() keeps items matching condition → use before rendering',
            'find() returns first matching item → use to find specific data',
            'Methods like map/filter/find DON\'T mutate the original array',
            'Chain methods: array.filter(...).map(...)',
            'Always use unique keys when mapping in React: key={item.id}',
            'Avoid using index as key in React (only if no unique id)',
            'Use spread operator [...array] to copy arrays in React',
          ]}
        />

        <InfoBox type="tip" title="React List Rendering Pattern">
          <code className="text-sm">
            {'{items.filter(item => item.active).map(item => <Component key={item.id} {...item} />)}'}
          </code>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
