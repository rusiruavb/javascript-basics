import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const DataTypes = () => {
  return (
    <TopicPage
      topicId="data-types"
      title="Data Types"
      description="Understanding Primitive and Reference types in JavaScript"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are Data Types?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Every value in JavaScript has a type. Data types determine what kind of data a variable holds and what
            operations you can perform on it. JavaScript has two categories of data types:{' '}
            <strong>Primitive Types</strong> (stored by value) and <strong>Reference Types</strong> (stored by reference).
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          React relies heavily on understanding the difference between primitives and references. State updates, prop
          comparisons, and re-rendering behavior all depend on how JavaScript handles these two categories. For example,
          React uses shallow comparison — so mutating an object won't trigger a re-render, but creating a new object will.
        </InfoBox>

        <div>
          <ComparisonTable
            title="Primitive vs Reference Types"
            columns={['Feature', 'Primitive', 'Reference']}
            rows={[
              ['Stored as', 'Value', 'Memory address (pointer)'],
              ['Compared by', 'Value', 'Reference (identity)'],
              ['Mutable', 'No (immutable)', 'Yes (mutable)'],
              ['Copied by', 'Value (independent copy)', 'Reference (shared)'],
              ['Examples', 'string, number, boolean', 'object, array, function'],
            ]}
          />
        </div>

        {/* Primitive Types */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Primitive Types</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            JavaScript has <strong>7 primitive types</strong>. Primitives are immutable — when you "change" a primitive
            value, you're actually creating a new value entirely.
          </p>

          <CodeExample
            title="Example 1: String"
            code={`const greeting = 'Hello, World!';
const name = "Alice";
const template = \`Welcome, \${name}!\`;

console.log(typeof greeting);
console.log(template);`}
            explanation="Strings represent text. You can use single quotes, double quotes, or backticks (template literals) for string interpolation."
            initialOutput="string\nWelcome, Alice!"
          />

          <CodeExample
            title="Example 2: Number"
            code={`const integer = 42;
const decimal = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;

console.log(typeof integer);
console.log(typeof NaN);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);`}
            explanation="JavaScript has a single number type for both integers and decimals (64-bit floating point). NaN is technically a number type. Floating point math can produce unexpected results."
            initialOutput="number\nnumber\n0.30000000000000004\nfalse"
          />

          <CodeExample
            title="Example 3: Boolean"
            code={`const isActive = true;
const isLoggedIn = false;

console.log(typeof isActive);

// Truthy and falsy values
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean('hello'));
console.log(Boolean(42));`}
            explanation="Booleans are true or false. JavaScript also has 'truthy' and 'falsy' values — 0, '', null, undefined, NaN, and false are falsy. Everything else is truthy."
            initialOutput="boolean\nfalse\nfalse\nfalse\nfalse\ntrue\ntrue"
          />

          <CodeExample
            title="Example 4: Undefined and Null"
            code={`let x;
console.log(x);
console.log(typeof x);

const y = null;
console.log(y);
console.log(typeof y);

console.log(null == undefined);
console.log(null === undefined);`}
            explanation="undefined means a variable has been declared but not assigned. null is an intentional absence of value. They are loosely equal (==) but not strictly equal (===). Note: typeof null returns 'object' — this is a known JavaScript bug."
            initialOutput="undefined\nundefined\nnull\nobject\ntrue\nfalse"
          />

          <CodeExample
            title="Example 5: Symbol and BigInt"
            code={`const id = Symbol('userId');
const anotherId = Symbol('userId');

console.log(typeof id);
console.log(id === anotherId);
console.log(id.toString());

const bigNumber = 9007199254740991n;
const anotherBig = BigInt('12345678901234567890');

console.log(typeof bigNumber);
console.log(bigNumber + 1n);`}
            explanation="Symbol creates a unique identifier — even with the same description, two symbols are never equal. BigInt handles integers larger than Number.MAX_SAFE_INTEGER."
            initialOutput="symbol\nfalse\nSymbol(userId)\nbigint\n9007199254740992"
          />
        </div>

        {/* Reference Types */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reference Types</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Reference types are <strong>objects</strong> stored in memory. Variables hold a reference (pointer) to the
            object, not the object itself. This means multiple variables can point to the same object.
          </p>

          <CodeExample
            title="Example 6: Objects"
            code={`const user = {
  name: 'Alice',
  age: 25,
  isActive: true
};

console.log(typeof user);
console.log(user.name);
console.log(user['age']);`}
            explanation="Objects store key-value pairs. You can access properties with dot notation or bracket notation."
            initialOutput="object\nAlice\n25"
          />

          <CodeExample
            title="Example 7: Arrays"
            code={`const colors = ['red', 'green', 'blue'];

console.log(typeof colors);
console.log(Array.isArray(colors));
console.log(colors.length);
console.log(colors[0]);`}
            explanation="Arrays are ordered lists. typeof returns 'object' for arrays, so use Array.isArray() to check if something is an array."
            initialOutput="object\ntrue\n3\nred"
          />

          <CodeExample
            title="Example 8: Functions"
            code={`const greet = function(name) {
  return 'Hello, ' + name;
};

const add = (a, b) => a + b;

console.log(typeof greet);
console.log(typeof add);
console.log(greet('Alice'));
console.log(add(2, 3));`}
            explanation="Functions are also objects in JavaScript. They have a special typeof value of 'function' but are technically reference types."
            initialOutput="function\nfunction\nHello, Alice\n5"
          />
        </div>

        {/* Key Difference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Value vs Reference: The Key Difference</h2>

          <CodeExample
            title="Example 9: Primitives are Copied by Value"
            code={`let a = 10;
let b = a;

b = 20;

console.log('a:', a);
console.log('b:', b);`}
            explanation="When you assign a primitive to another variable, a copy of the value is made. Changing one doesn't affect the other."
            initialOutput="a: 10\nb: 20"
          />

          <CodeExample
            title="Example 10: Objects are Copied by Reference"
            code={`const original = { name: 'Alice', age: 25 };
const copy = original;

copy.age = 30;

console.log('original:', original.age);
console.log('copy:', copy.age);
console.log(original === copy);`}
            explanation="When you assign an object to another variable, both variables point to the SAME object in memory. Modifying one affects the other. This is critical to understand for React state management."
            initialOutput="original: 30\ncopy: 30\ntrue"
          />

          <CodeExample
            title="Example 11: Creating True Copies of Objects"
            code={`const original = { name: 'Alice', age: 25 };

// Spread operator (shallow copy)
const shallowCopy = { ...original };
shallowCopy.age = 30;

console.log('original:', original.age);
console.log('shallowCopy:', shallowCopy.age);
console.log(original === shallowCopy);`}
            explanation="Use the spread operator (...) to create a new copy of an object. This is the pattern React uses for state updates — always create a new object instead of mutating."
            initialOutput="original: 25\nshallowCopy: 30\nfalse"
          />
        </div>

        {/* typeof operator */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Checking Types with typeof</h2>

          <CodeExample
            title="Example 12: The typeof Operator"
            code={`console.log(typeof 'hello');
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function(){});
console.log(typeof Symbol('id'));
console.log(typeof 10n);`}
            explanation="typeof returns the type as a string. Watch out for the quirks: typeof null is 'object' (a bug) and typeof [] is 'object' (arrays are objects)."
            initialOutput="string\nnumber\nboolean\nundefined\nobject\nobject\nobject\nfunction\nsymbol\nbigint"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Mutating Objects Directly"
            rightLabel="Creating New Objects (React Pattern)"
            wrong={`const user = { name: 'Alice', age: 25 };

// Direct mutation - won't trigger React re-render
user.age = 26;
setState(user);`}
            right={`const user = { name: 'Alice', age: 25 };

// Create new object - triggers React re-render
setState({ ...user, age: 26 });`}
            explanation="React compares references to detect changes. Mutating an object keeps the same reference, so React won't know something changed. Always create a new object."
          />

          <MistakeExample
            wrongLabel="Comparing Objects by Value"
            rightLabel="Understanding Reference Equality"
            wrong={`const a = { name: 'Alice' };
const b = { name: 'Alice' };

if (a === b) {
  console.log('Equal!');
}
// Never runs - they're different references`}
            right={`const a = { name: 'Alice' };
const b = { name: 'Alice' };

// Compare by property values instead
if (a.name === b.name) {
  console.log('Same name!');
}
// Or use JSON.stringify for simple objects
console.log(JSON.stringify(a) === JSON.stringify(b));`}
            explanation="Two objects with identical contents are NOT equal because === compares references, not values. Compare individual properties or serialize to compare."
          />

          <MistakeExample
            wrongLabel="Confusing typeof null"
            rightLabel="Properly Checking for null"
            wrong={`const value = null;

if (typeof value === 'object') {
  console.log(value.name); // TypeError!
}`}
            right={`const value = null;

if (value !== null && typeof value === 'object') {
  console.log(value.name);
}`}
            explanation="typeof null returns 'object', which is a well-known JavaScript bug. Always check for null explicitly before checking typeof."
          />
        </div>

        <QuickReference
          items={[
            'JavaScript has 7 primitive types: string, number, boolean, null, undefined, symbol, bigint',
            'Reference types include: objects, arrays, and functions',
            'Primitives are immutable and compared by value',
            'Reference types are mutable and compared by reference (identity)',
            'Assigning an object to a new variable creates a shared reference, not a copy',
            'Use the spread operator (...) to create shallow copies of objects and arrays',
            'typeof null returns "object" — always check for null explicitly',
            'Use Array.isArray() to check if a value is an array',
            'In React, always create new objects/arrays for state updates instead of mutating',
          ]}
        />

        <InfoBox type="tip" title="Quick Type Check">
          <ul className="space-y-2">
            <li>• Use <strong>typeof</strong> for primitives</li>
            <li>• Use <strong>Array.isArray()</strong> for arrays</li>
            <li>• Use <strong>=== null</strong> to check for null</li>
            <li>• Use <strong>instanceof</strong> to check object types</li>
          </ul>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
