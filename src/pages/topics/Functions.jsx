import { TopicPage } from "../../components/TopicPage";
import { CodeExample } from "../../components/CodeExample";
import { InfoBox } from "../../components/InfoBox";
import { ComparisonTable } from "../../components/ComparisonTable";
import { QuickReference } from "../../components/QuickReference";
import { MistakeExample } from "../../components/MistakeExample";

export const Functions = () => {
  return (
    <TopicPage
      topicId="functions"
      title="Functions & Arrow Functions"
      description="Function declarations, expressions, and modern arrow syntax"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What are Functions?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Functions are reusable blocks of code that perform specific tasks.
            They're like recipes - you define them once and use them many times.
            React components are essentially functions that return UI!
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          Modern React uses function components almost exclusively. Arrow
          functions are the standard for event handlers and callbacks.
          Understanding function syntax and 'this' binding is essential.
        </InfoBox>

        <div>
          <ComparisonTable
            title="Function Types Comparison"
            columns={["Type", "Syntax", "Use in React"]}
            rows={[
              ["Declaration", "function name() {}", "Older style"],
              ["Expression", "const name = function() {}", "Rarely used"],
              ["Arrow", "const name = () => {}", "✅ Standard"],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Function Declaration
          </h2>

          <CodeExample
            title="Example 1: Basic Function Declaration"
            code={`function greet(name) {
  return 'Hello, ' + name + '!';
}

const message1 = greet('Alice');
const message2 = greet('Bob');

console.log(message1);
console.log(message2);`}
            explanation="Traditional function syntax. Still works but less common in modern React."
            initialOutput="Hello, Alice!\nHello, Bob!"
          />

          <CodeExample
            title="Example 2: Function with Multiple Parameters"
            code={`function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log('5 + 3 =', add(5, 3));
console.log('5 × 3 =', multiply(5, 3));`}
            explanation="Functions can take multiple parameters and return calculated values."
            initialOutput="5 + 3 = 8\n5 × 3 = 15"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Arrow Functions
          </h2>

          <CodeExample
            title="Example 3: Basic Arrow Function"
            code={`const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('Alice'));
console.log(greet('Bob'));`}
            explanation="Arrow function syntax. More concise and has lexical 'this' binding."
            initialOutput="Hello, Alice!\nHello, Bob!"
          />

          <CodeExample
            title="Example 4: Implicit Return (Single Expression)"
            code={`// With return keyword
const add1 = (a, b) => {
  return a + b;
};

// Implicit return (no braces needed!)
const add2 = (a, b) => a + b;

console.log('add1:', add1(5, 3));
console.log('add2:', add2(5, 3));`}
            explanation="Arrow functions can omit braces and 'return' for single expressions. Very common in React!"
            initialOutput="add1: 8\nadd2: 8"
          />

          <CodeExample
            title="Example 5: Arrow Function Variations"
            code={`// No parameters
const sayHello = () => 'Hello!';

// One parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// Returning an object (needs parentheses!)
const makePerson = (name, age) => ({ name, age });

console.log(sayHello());
console.log('square(5):', square(5));
console.log('add(3, 7):', add(3, 7));
console.log(makePerson('Alice', 25));`}
            explanation="Arrow functions have flexible syntax depending on parameters and return value."
            initialOutput="Hello!\nsquare(5): 25\nadd(3, 7): 10\n{ name: 'Alice', age: 25 }"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            React Event Handler Patterns
          </h2>

          <CodeExample
            title="Example 6: Event Handlers in React"
            code={`// React component pattern
const Button = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  const handleClickWithData = (id) => {
    console.log('Clicked item:', id);
  };

  // Simulating button clicks
  handleClick();
  handleClickWithData(42);
};

Button();`}
            explanation="Arrow functions are standard for event handlers in React. They maintain the correct 'this' context."
            initialOutput="Button clicked!\nClicked item: 42"
          />

          <CodeExample
            title="Example 7: Array Methods with Arrow Functions"
            code={`const numbers = [1, 2, 3, 4, 5];

// map with arrow function
const doubled = numbers.map(n => n * 2);

// filter with arrow function
const evenNumbers = numbers.filter(n => n % 2 === 0);

// Common in React for rendering lists!
const listItems = numbers.map(n => \`Item \${n}\`);

console.log('Doubled:', doubled);
console.log('Even:', evenNumbers);
console.log('List:', listItems);`}
            explanation="Arrow functions are perfect for array methods. You'll use this pattern constantly in React!"
            initialOutput="Doubled: [ 2, 4, 6, 8, 10 ]\nEven: [ 2, 4 ]\nList: [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5' ]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Default Parameters
          </h2>

          <CodeExample
            title="Example 8: Default Parameter Values"
            code={`const greet = (name = 'Guest', greeting = 'Hello') => {
  return \`\${greeting}, \${name}!\`;
};

console.log(greet());
console.log(greet('Alice'));
console.log(greet('Bob', 'Hi'));`}
            explanation="ES6 allows default parameter values. Very useful in React for optional props!"
            initialOutput="Hello, Guest!\nHello, Alice!\nHi, Bob!"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Common Mistakes
          </h2>

          <MistakeExample
            wrongLabel="Forgetting Return in Block"
            rightLabel="Correct Arrow Function"
            wrong={`const add = (a, b) => {
  a + b  // No return!
};

console.log(add(5, 3)); // undefined`}
            right={`// With explicit return
const add = (a, b) => {
  return a + b;
};

// Or use implicit return
const add2 = (a, b) => a + b;

console.log(add(5, 3));`}
            explanation="If you use braces {}, you need an explicit return. Without braces, return is implicit."
          />

          <MistakeExample
            wrongLabel="Returning Object Without Parentheses"
            rightLabel="Wrapping Object in Parentheses"
            wrong={`const makePerson = (name) => {
  name: name  // Interpreted as label!
};`}
            right={`const makePerson = (name) => ({
  name: name
});

// Or shorter with property shorthand
const makePerson2 = (name) => ({ name });

console.log(makePerson('Alice'));`}
            explanation="To return an object with implicit return, wrap it in parentheses."
          />

          <MistakeExample
            wrongLabel="Using Regular Function as Event Handler"
            rightLabel="Using Arrow Function"
            wrong={`// In React component (wrong)
function handleClick() {
  console.log(this); // 'this' is wrong!
}`}
            right={`// In React component (correct)
const handleClick = () => {
  console.log('Clicked');
};`}
            explanation="Arrow functions don't have their own 'this', so they inherit from the surrounding context. Perfect for React!"
          />
        </div>

        <QuickReference
          items={[
            "Use arrow functions (() => {}) as the default in modern React",
            "Implicit return: single expression without braces returns automatically",
            'Arrow functions inherit "this" from surrounding context (lexical binding)',
            "Use arrow functions for event handlers and array methods",
            "Wrap returned objects in parentheses: () => ({ key: value })",
            'Default parameters: (name = "default") => ...',
            "One parameter can omit parentheses: x => x * 2",
          ]}
        />

        <InfoBox type="tip" title="React Component Pattern">
          Modern React function components are arrow functions:
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
            <code>{`const MyComponent = () => { return <div>Hello</div> };`}</code>
          </pre>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
