import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const ESStandards = () => {
  return (
    <TopicPage
      topicId="es-standards"
      title="ES Standards (ECMAScript)"
      description="Understanding JavaScript versions and modern syntax"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is ECMAScript?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            ECMAScript (ES) is the standardized specification for JavaScript. Think of it like the official rulebook
            that defines how JavaScript should work. When people talk about ES5, ES6, or ES2015+, they're referring to
            different versions of this rulebook.
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React uses modern JavaScript (ES6+) extensively. Features like arrow functions, classes, destructuring, and
          modules are fundamental to writing React code. Understanding these features is essential before learning
          React.
        </InfoBox>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ES5 vs ES6: The Big Shift</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            ES5 (2009) was the old standard. ES6 (2015), also called ES2015, brought massive improvements. React
            developers primarily use ES6+ syntax.
          </p>

          <ComparisonTable
            title="Key Differences"
            columns={['Feature', 'ES5 (Old)', 'ES6+ (Modern)']}
            rows={[
              ['Variable Declaration', 'var', 'let, const'],
              ['Functions', 'function() {}', 'Arrow functions () => {}'],
              ['Classes', 'Prototypes', 'class keyword'],
              ['Modules', 'require()/module.exports', 'import/export'],
              ['String Handling', 'Concatenation', 'Template literals'],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Code Examples</h2>

          <CodeExample
            title="Example 1: Variable Declaration (ES5 vs ES6)"
            code={`// ES5 way
var name = 'John';
var age = 25;

// ES6 way
const name = 'John';
let age = 25;

console.log(name, age);`}
            explanation="ES6 introduces 'const' for constants and 'let' for variables. These have better scoping rules than 'var'."
            initialOutput="John 25"
          />

          <CodeExample
            title="Example 2: Functions (ES5 vs ES6)"
            code={`// ES5 function
var greet = function(name) {
  return 'Hello, ' + name;
};

// ES6 arrow function
const greetModern = (name) => {
  return \`Hello, \${name}\`;
};

console.log(greet('Alice'));
console.log(greetModern('Bob'));`}
            explanation="Arrow functions are more concise and have different 'this' binding (important for React components!)."
            initialOutput="Hello, Alice\nHello, Bob"
          />

          <CodeExample
            title="Example 3: Template Literals"
            code={`const user = 'Sarah';
const score = 95;

// ES5 way
var message1 = 'User ' + user + ' scored ' + score + ' points!';

// ES6 way
const message2 = \`User \${user} scored \${score} points!\`;

console.log(message1);
console.log(message2);`}
            explanation="Template literals (backticks) make string interpolation much cleaner. You'll use these constantly in React!"
            initialOutput="User Sarah scored 95 points!\nUser Sarah scored 95 points!"
          />

          <CodeExample
            title="Example 4: Destructuring (ES6 Feature)"
            code={`// Destructuring objects
const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com'
};

const { name, age } = user;
console.log(name, age);

// Destructuring arrays
const colors = ['red', 'blue', 'green'];
const [first, second] = colors;
console.log(first, second);`}
            explanation="Destructuring is heavily used in React for props and state. It extracts values from objects/arrays into variables."
            initialOutput="Alice 30\nred blue"
          />

          <CodeExample
            title="Example 5: Spread Operator (ES6)"
            code={`// Copying and merging arrays
const fruits = ['apple', 'banana'];
const moreFruits = [...fruits, 'orange', 'mango'];
console.log(moreFruits);

// Copying objects (React state updates!)
const user = { name: 'John', age: 25 };
const updatedUser = { ...user, age: 26 };
console.log(updatedUser);`}
            explanation="The spread operator (...) is crucial in React for creating new copies of state instead of mutating it."
            initialOutput="[ 'apple', 'banana', 'orange', 'mango' ]\n{ name: 'John', age: 26 }"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrong={`// Using var (old ES5 style)
var count = 10;
count = 20;

// Using string concatenation
var message = 'Count is ' + count;`}
            right={`// Using const/let (modern ES6)
let count = 10;
count = 20;

// Using template literals
const message = \`Count is \${count}\`;`}
            explanation="Always prefer const/let over var, and use template literals for string interpolation. Modern tools and React expect ES6+ syntax."
          />

          <MistakeExample
            wrongLabel="Old Function Syntax"
            rightLabel="Modern Arrow Function"
            wrong={`// ES5 function in React component
handleClick: function() {
  console.log('clicked');
}`}
            right={`// ES6 arrow function in React
handleClick = () => {
  console.log('clicked');
}`}
            explanation="Arrow functions are standard in React for event handlers and callbacks. They also solve 'this' binding issues."
          />
        </div>

        <QuickReference
          items={[
            'ES6 (ES2015) is the minimum standard for React development',
            'Use const/let instead of var for variable declarations',
            'Arrow functions (() => {}) are standard in React',
            'Template literals (`${value}`) replace string concatenation',
            'Destructuring extracts values from objects/arrays cleanly',
            'Spread operator (...) is essential for state updates in React',
            'import/export statements organize your code into modules',
          ]}
        />

        <InfoBox type="tip" title="Next Steps">
          Now that you understand ES standards, we'll dive deep into each modern JavaScript feature. Start with
          Variables to learn about const, let, and scoping!
        </InfoBox>
      </section>
    </TopicPage>
  );
};
