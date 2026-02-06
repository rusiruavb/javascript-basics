import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Variables = () => {
  return (
    <TopicPage
      topicId="variables"
      title="Variables: var, let, const"
      description="Understanding variable declarations and scoping in JavaScript"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are Variables?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Variables are containers for storing data. Think of them as labeled boxes where you keep values. JavaScript
            has three ways to declare variables: var (old), let (modern), and const (modern constant).
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React components use const for component definitions and let for values that change. Understanding when to use
          each is crucial for writing clean React code and avoiding bugs.
        </InfoBox>

        <div>
          <ComparisonTable
            title="var vs let vs const"
            columns={['Feature', 'var', 'let', 'const']}
            rows={[
              ['Scope', 'Function', 'Block', 'Block'],
              ['Reassignment', 'Yes', 'Yes', 'No'],
              ['Redeclaration', 'Yes', 'No', 'No'],
              ['Hoisting', 'Yes (undefined)', 'Yes (TDZ)', 'Yes (TDZ)'],
              ['Use in React', '❌ Avoid', '✅ Sometimes', '✅ Preferred'],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding const</h2>

          <CodeExample
            title="Example 1: Basic const Usage"
            code={`const name = 'Alice';
const age = 25;
const isStudent = true;

console.log(name, age, isStudent);

// This would cause an error:
// age = 26; // Error: Assignment to constant variable`}
            explanation="const creates a constant reference. You cannot reassign the variable to a different value."
            initialOutput="Alice 25 true"
          />

          <CodeExample
            title="Example 2: const with Objects (Important!)"
            code={`const user = {
  name: 'John',
  age: 30
};

// This works! We're modifying the object, not reassigning
user.age = 31;
user.city = 'New York';

console.log(user);

// This would fail:
// user = {}; // Error: Assignment to constant variable`}
            explanation="const prevents reassignment, but object properties CAN be modified. This is crucial in React state management!"
            initialOutput="{ name: 'John', age: 31, city: 'New York' }"
          />

          <CodeExample
            title="Example 3: const with Arrays"
            code={`const fruits = ['apple', 'banana'];

// These work - modifying the array
fruits.push('orange');
fruits[0] = 'grape';

console.log(fruits);

// This fails:
// fruits = []; // Error: Assignment to constant variable`}
            explanation="Same as objects - you can modify array contents, but can't reassign the variable."
            initialOutput="[ 'grape', 'banana', 'orange' ]"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding let</h2>

          <CodeExample
            title="Example 4: Using let for Reassignment"
            code={`let count = 0;

count = count + 1;
count = count + 1;
count++;

console.log('Count:', count);

let message = 'Hello';
message = 'Goodbye';

console.log('Message:', message);`}
            explanation="Use let when you need to reassign the variable. Common in loops and counters."
            initialOutput="Count: 3\nMessage: Goodbye"
          />

          <CodeExample
            title="Example 5: Block Scope with let"
            code={`let x = 10;

if (true) {
  let x = 20; // Different variable!
  console.log('Inside block:', x);
}

console.log('Outside block:', x);`}
            explanation="let is block-scoped. Variables declared inside {} are separate from outside variables."
            initialOutput="Inside block: 20\nOutside block: 10"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Problem with var</h2>

          <CodeExample
            title="Example 6: var Hoisting Issues"
            code={`console.log('Before declaration:', x);
var x = 5;
console.log('After declaration:', x);`}
            explanation="var is hoisted to the top but initialized as undefined. This can cause confusing bugs!"
            initialOutput="Before declaration: undefined\nAfter declaration: 5"
          />

          <CodeExample
            title="Example 7: var Lacks Block Scope"
            code={`var y = 10;

if (true) {
  var y = 20; // Same variable!
  console.log('Inside block:', y);
}

console.log('Outside block:', y); // Also 20!`}
            explanation="var doesn't respect block scope - it's function-scoped. This can lead to unexpected bugs."
            initialOutput="Inside block: 20\nOutside block: 20"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React Component Examples</h2>

          <CodeExample
            title="Example 8: Variables in React Components"
            code={`// React component pattern
const UserCard = () => {
  const userName = 'Alice';
  let clickCount = 0;

  const handleClick = () => {
    clickCount++;
    console.log('Clicks:', clickCount);
  };

  handleClick();
  handleClick();

  return \`User: \${userName}\`;
};

const result = UserCard();
console.log(result);`}
            explanation="React components are const functions. Inside, use const for unchanging values and let for values that might change in the function scope."
            initialOutput="Clicks: 1\nClicks: 2\nUser: Alice"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrong={`// Using var
var count = 0;

// Using let when const would work
let API_KEY = 'abc123';
let config = { theme: 'dark' };`}
            right={`// Use const by default
const count = 0;

// const for values that won't be reassigned
const API_KEY = 'abc123';
const config = { theme: 'dark' };`}
            explanation="Default to const. Only use let when you know you'll reassign. Never use var in modern code."
          />

          <MistakeExample
            wrongLabel="Trying to Reassign const"
            rightLabel="Using let for Reassignment"
            wrong={`const score = 0;
score = score + 10; // Error!`}
            right={`let score = 0;
score = score + 10; // Works!
console.log(score);`}
            explanation="If you need to reassign, use let instead of const."
          />

          <MistakeExample
            wrongLabel="Thinking const Makes Objects Immutable"
            rightLabel="Understanding const with Objects"
            wrong={`const user = { name: 'John' };
// Thinking this is safe from changes`}
            right={`const user = { name: 'John' };
// Can still modify properties
user.name = 'Jane';
// To prevent this, use Object.freeze()
const frozen = Object.freeze({ name: 'John' });`}
            explanation="const doesn't make objects immutable, just prevents reassignment. Use Object.freeze() for true immutability."
          />
        </div>

        <QuickReference
          items={[
            'Use const by default - it prevents accidental reassignment',
            'Use let only when you need to reassign a variable',
            'Never use var in modern JavaScript',
            'const prevents reassignment, NOT mutation of objects/arrays',
            'Block scope (let/const) is safer than function scope (var)',
            'React component definitions always use const',
            'For immutable objects, use Object.freeze() or libraries like Immer',
          ]}
        />

        <InfoBox type="tip" title="Decision Tree">
          <ul className="space-y-2">
            <li>• Will this value be reassigned? → Use <strong>let</strong></li>
            <li>• Will this value stay the same? → Use <strong>const</strong></li>
            <li>• Are you working with old code? → Refactor <strong>var</strong> to const/let</li>
          </ul>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
