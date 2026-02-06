import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Ternary = () => {
  return (
    <TopicPage
      topicId="ternary"
      title="Ternary Operator"
      description="Conditional expressions and JSX patterns"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is the Ternary Operator?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The ternary operator is a shorthand for if/else statements. It's called "ternary" because it has three
            parts: condition ? valueIfTrue : valueIfFalse. Think of it as an inline if/else.
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          Ternary operators are THE standard way to conditionally render JSX in React. You can't use if/else directly in
          JSX, but you can use ternaries! You'll see them in almost every React component.
        </InfoBox>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold mb-2 text-blue-900 dark:text-blue-200">Ternary Syntax</h3>
          <div className="font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded">
            condition ? expressionIfTrue : expressionIfFalse
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Ternary Usage</h2>

          <CodeExample
            title="Example 1: Simple Ternary"
            code={`const age = 20;

const status = age >= 18 ? 'adult' : 'minor';
console.log('Status:', status);

const temperature = 25;
const weather = temperature > 30 ? 'hot' : 'pleasant';
console.log('Weather:', weather);`}
            explanation="Ternary replaces simple if/else. More concise for assigning values based on conditions."
            initialOutput="Status: adult\nWeather: pleasant"
          />

          <CodeExample
            title="Example 2: Ternary vs if/else (Same Result)"
            code={`const score = 85;

// Using if/else
let grade1;
if (score >= 60) {
  grade1 = 'Pass';
} else {
  grade1 = 'Fail';
}

// Using ternary (cleaner!)
const grade2 = score >= 60 ? 'Pass' : 'Fail';

console.log('if/else result:', grade1);
console.log('Ternary result:', grade2);`}
            explanation="Ternary is more concise than if/else for simple conditions. Same result, less code!"
            initialOutput="if/else result: Pass\nTernary result: Pass"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React JSX Patterns</h2>

          <CodeExample
            title="Example 3: Ternary in JSX (The React Way!)"
            code={`const isLoggedIn = true;

// Simulating JSX rendering
const renderUI = (loggedIn) => {
  return loggedIn
    ? '<Dashboard />'
    : '<LoginPage />';
};

console.log('UI to render:', renderUI(isLoggedIn));
console.log('UI when logged out:', renderUI(false));`}
            explanation="In React, you'll use this pattern constantly: {isLoggedIn ? <Dashboard /> : <LoginPage />}"
            initialOutput="UI to render: <Dashboard />\nUI when logged out: <LoginPage />"
          />

          <CodeExample
            title="Example 4: Ternary for Class Names (React Pattern)"
            code={`const isActive = true;
const isError = false;

const buttonClass = isActive ? 'btn-active' : 'btn-inactive';
const inputClass = isError ? 'input-error' : 'input-normal';

console.log('Button class:', buttonClass);
console.log('Input class:', inputClass);

// React pattern: className={isActive ? 'active' : 'inactive'}`}
            explanation="Common React pattern: dynamically set CSS classes based on state/props."
            initialOutput="Button class: btn-active\nInput class: input-normal"
          />

          <CodeExample
            title="Example 5: Ternary with Strings"
            code={`const user = { name: 'Alice', isPremium: true };

const greeting = \`Welcome \${user.isPremium ? 'Premium User' : 'User'} \${user.name}!\`;
console.log(greeting);

const itemCount = 5;
const message = \`You have \${itemCount} item\${itemCount !== 1 ? 's' : ''}\`;
console.log(message);`}
            explanation="Ternaries work great inside template literals for dynamic strings."
            initialOutput="Welcome Premium User Alice!\nYou have 5 items"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nested Ternaries</h2>

          <CodeExample
            title="Example 6: Nested Ternary (Use Carefully!)"
            code={`const score = 75;

const grade = score >= 90 ? 'A'
  : score >= 80 ? 'B'
  : score >= 70 ? 'C'
  : 'F';

console.log('Score:', score, '→ Grade:', grade);`}
            explanation="You can nest ternaries, but it can get hard to read. Use formatting to help readability."
            initialOutput="Score: 75 → Grade: C"
          />

          <InfoBox type="warning" title="Nested Ternary Warning">
            Nested ternaries can become hard to read. If you have more than 2 levels, consider using if/else or a
            function instead. Readability matters!
          </InfoBox>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced React Patterns</h2>

          <CodeExample
            title="Example 7: Multiple Conditions"
            code={`const user = {
  isLoggedIn: true,
  isAdmin: false,
  name: 'Alice'
};

const message = !user.isLoggedIn
  ? 'Please log in'
  : user.isAdmin
  ? \`Admin: \${user.name}\`
  : \`User: \${user.name}\`;

console.log(message);`}
            explanation="Multiple ternaries for complex conditions. Common in React for nested permissions."
            initialOutput="User: Alice"
          />

          <CodeExample
            title="Example 8: Ternary with Function Calls"
            code={`const getDiscount = (isPremium) => {
  return isPremium ? 20 : 10;
};

const isPremiumUser = true;
const discount = getDiscount(isPremiumUser);

const price = 100;
const finalPrice = price - (price * discount / 100);

console.log('Discount:', discount + '%');
console.log('Final price: $' + finalPrice);`}
            explanation="Ternaries can call functions. Useful in React for conditional logic."
            initialOutput="Discount: 20%\nFinal price: $80"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Too Complex Nested Ternary"
            rightLabel="Using if/else for Clarity"
            wrong={`const x = condition1 ? value1
  : condition2 ? value2
  : condition3 ? value3
  : condition4 ? value4
  : value5; // Hard to read!`}
            right={`let result;
if (condition1) {
  result = value1;
} else if (condition2) {
  result = value2;
} else {
  result = value3;
}
// Much clearer!`}
            explanation="If your ternary has more than 2-3 levels, use if/else instead. Readability wins!"
          />

          <MistakeExample
            wrongLabel="Trying to Use if/else in JSX"
            rightLabel="Using Ternary in JSX"
            wrong={`// This doesn't work in JSX!
// {if (isLoggedIn) {
//   return <Dashboard />
// }}`}
            right={`// This works in JSX!
const ui = isLoggedIn ? '<Dashboard />' : '<Login />';
console.log(ui);

// Or use &&
const ui2 = isLoggedIn ? '<Dashboard />' : null;
console.log('Conditional:', ui2);`}
            explanation="You can't use if/else directly in JSX. Use ternary or && operator instead."
          />

          <MistakeExample
            wrongLabel="Forgetting the False Case"
            rightLabel="Always Provide Both Cases"
            wrong={`// Incomplete ternary
// const message = isActive ? 'Active';
// Missing the : part!`}
            right={`const isActive = true;

// Complete ternary
const message = isActive ? 'Active' : 'Inactive';
console.log(message);

// Or use && if you don't need else
const alert = isActive && 'System is active';
console.log('Alert:', alert);`}
            explanation="Ternary needs both true and false cases. Use && if you only need the true case."
          />
        </div>

        <QuickReference
          items={[
            'Syntax: condition ? valueIfTrue : valueIfFalse',
            'Perfect for simple if/else replacements',
            'THE standard way to conditionally render JSX in React',
            'Use for dynamic className, text, components in JSX',
            'Can be nested but keep it to 2-3 levels max',
            'If too complex, use if/else or a function instead',
            'For one-sided conditions in JSX, use && operator',
          ]}
        />

        <InfoBox type="tip" title="When to Use What">
          <ul className="space-y-1 text-sm">
            <li>• <strong>Ternary:</strong> Simple true/false choices in JSX</li>
            <li>• <strong>&& operator:</strong> Show something only when true</li>
            <li>• <strong>if/else:</strong> Complex logic with multiple statements</li>
          </ul>
        </InfoBox>

        <InfoBox type="react" title="Common React Patterns">
          <code className="text-xs block">
            {'{isLoading ? <Spinner /> : <Content />}'}<br/>
            {'{error ? <Error message={error} /> : null}'}<br/>
            {'{user && <Profile user={user} />}'}
          </code>
        </InfoBox>
      </section>
    </TopicPage>
  );
};
