import { TopicPage } from '../../components/TopicPage';
import { CodeExample } from '../../components/CodeExample';
import { InfoBox } from '../../components/InfoBox';
import { ComparisonTable } from '../../components/ComparisonTable';
import { QuickReference } from '../../components/QuickReference';
import { MistakeExample } from '../../components/MistakeExample';

export const Conditions = () => {
  return (
    <TopicPage
      topicId="conditions"
      title="Conditions (if/else)"
      description="Conditional statements and comparison operators"
    >
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What are Conditions?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Conditions allow your code to make decisions. Like a fork in the road - your code takes different paths
            based on whether conditions are true or false. Essential for displaying different UI in React!
          </p>
        </div>

        <InfoBox type="react" title="Why This Matters for React">
          Conditional rendering is core to React - showing/hiding components, displaying loading states, handling user
          permissions, etc. You'll use if/else and logical operators constantly.
        </InfoBox>

        <div>
          <ComparisonTable
            title="Comparison Operators"
            columns={['Operator', 'Meaning', 'Example', 'Result']}
            rows={[
              ['===', 'Strict equal', '5 === 5', 'true'],
              ['!==', 'Strict not equal', '5 !== 3', 'true'],
              ['==', 'Loose equal (avoid!)', '"5" == 5', 'true'],
              ['>', 'Greater than', '10 > 5', 'true'],
              ['<', 'Less than', '3 < 7', 'true'],
              ['>=', 'Greater or equal', '5 >= 5', 'true'],
              ['<=', 'Less or equal', '3 <= 3', 'true'],
            ]}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic if/else</h2>

          <CodeExample
            title="Example 1: Simple if Statement"
            code={`const age = 18;

if (age >= 18) {
  console.log('You are an adult');
}

if (age < 18) {
  console.log('You are a minor');
}`}
            explanation="if statements run code only when the condition is true."
            initialOutput="You are an adult"
          />

          <CodeExample
            title="Example 2: if-else Statement"
            code={`const score = 75;

if (score >= 60) {
  console.log('Passed!');
} else {
  console.log('Failed');
}

console.log('Score:', score);`}
            explanation="else provides an alternative path when the condition is false."
            initialOutput="Passed!\nScore: 75"
          />

          <CodeExample
            title="Example 3: if-else if-else Chain"
            code={`const grade = 85;

if (grade >= 90) {
  console.log('Grade: A');
} else if (grade >= 80) {
  console.log('Grade: B');
} else if (grade >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}`}
            explanation="Multiple conditions checked in order. First true condition wins!"
            initialOutput="Grade: B"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comparison Operators</h2>

          <CodeExample
            title="Example 4: === vs == (Important!)"
            code={`const num = 5;
const str = '5';

console.log('5 === "5":', num === str);  // Strict (checks type)
console.log('5 == "5":', num == str);    // Loose (converts type)

console.log('Always use === in React!');`}
            explanation="=== checks value AND type. == converts types (avoid it!). Always use === in modern JavaScript."
            initialOutput={'5 === "5": false\n5 == "5": true\nAlways use === in React!'}
          />

          <CodeExample
            title="Example 5: Greater/Less Than"
            code={`const temperature = 25;

if (temperature > 30) {
  console.log('Hot!');
} else if (temperature > 20) {
  console.log('Warm');
} else if (temperature > 10) {
  console.log('Cool');
} else {
  console.log('Cold!');
}`}
            explanation="Comparison operators work with numbers. Conditions are checked top to bottom."
            initialOutput="Warm"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Logical Operators</h2>

          <CodeExample
            title="Example 6: AND Operator (&&)"
            code={`const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log('Can drive!');
} else {
  console.log('Cannot drive');
}

const isWeekend = false;
const isHoliday = false;

if (isWeekend && isHoliday) {
  console.log('Party time!');
} else {
  console.log('Work time');
}`}
            explanation="&& (AND): both conditions must be true. Used in React for conditional rendering!"
            initialOutput="Can drive!\nWork time"
          />

          <CodeExample
            title="Example 7: OR Operator (||)"
            code={`const isWeekend = true;
const isHoliday = false;

if (isWeekend || isHoliday) {
  console.log('Day off!');
} else {
  console.log('Work day');
}

const userRole = 'admin';
if (userRole === 'admin' || userRole === 'moderator') {
  console.log('Has special permissions');
}`}
            explanation="|| (OR): at least one condition must be true. Common in React permission checks."
            initialOutput="Day off!\nHas special permissions"
          />

          <CodeExample
            title="Example 8: NOT Operator (!)"
            code={`const isLoggedIn = false;

if (!isLoggedIn) {
  console.log('Please log in');
}

const isActive = true;
if (!isActive) {
  console.log('Account inactive');
} else {
  console.log('Account active');
}`}
            explanation="! (NOT): flips true/false. Very common in React: if (!loading), if (!error), etc."
            initialOutput="Please log in\nAccount active"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">React Patterns</h2>

          <CodeExample
            title="Example 9: Conditional Rendering Pattern"
            code={`const user = {
  name: 'Alice',
  isAdmin: true,
  isPremium: false
};

let message = '';

if (user.isAdmin) {
  message = 'Welcome, Admin ' + user.name;
} else if (user.isPremium) {
  message = 'Welcome, Premium user ' + user.name;
} else {
  message = 'Welcome, ' + user.name;
}

console.log(message);`}
            explanation="Common React pattern: different UI based on user state/props."
            initialOutput="Welcome, Admin Alice"
          />

          <CodeExample
            title="Example 10: Multiple Conditions"
            code={`const user = {
  age: 25,
  country: 'USA',
  verified: true
};

if (user.age >= 18 && user.country === 'USA' && user.verified) {
  console.log('Full access granted');
} else {
  console.log('Access restricted');

  if (user.age < 18) {
    console.log('Reason: Under 18');
  } else if (!user.verified) {
    console.log('Reason: Not verified');
  }
}`}
            explanation="Combine multiple conditions with && and ||. Common for permission checks in React."
            initialOutput="Full access granted"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Common Mistakes</h2>

          <MistakeExample
            wrongLabel="Using = Instead of ==="
            rightLabel="Using === for Comparison"
            wrong={`const status = 'active';

if (status = 'inactive') {
  // This assigns, not compares!
  console.log('Wrong');
}`}
            right={`const status = 'active';

if (status === 'inactive') {
  console.log('Inactive');
} else {
  console.log('Active');
}`}
            explanation="= is assignment, === is comparison. Always use === for conditions!"
          />

          <MistakeExample
            wrongLabel="Using == (Loose Equality)"
            rightLabel="Using === (Strict Equality)"
            wrong={`const count = 0;

if (count == false) {
  // Confusing type coercion!
  console.log('Zero equals false?');
}`}
            right={`const count = 0;

if (count === 0) {
  console.log('Count is zero');
}

// Or check for falsy values explicitly
if (!count) {
  console.log('Count is falsy');
}`}
            explanation="== does type conversion. Use === to avoid confusion. React linters will warn about ==."
          />

          <MistakeExample
            wrongLabel="Confusing = and =="
            rightLabel="Correct Operator Usage"
            wrong={`let isActive = true;

// Assignment (=)
if (isActive = false) {
  console.log('This is wrong!');
}`}
            right={`let isActive = true;

// Comparison (===)
if (isActive === false) {
  console.log('Not active');
} else {
  console.log('Active!');
}`}
            explanation="Single = assigns, === compares. This is a very common bug!"
          />
        </div>

        <QuickReference
          items={[
            'Use === (strict equality) instead of == (loose equality)',
            '&& (AND): both conditions must be true',
            '|| (OR): at least one condition must be true',
            '! (NOT): flips true to false and vice versa',
            'if/else chains: first true condition executes',
            'In React: use && for conditional rendering: {isActive && <Component />}',
            'Always use strict equality (===) to avoid type coercion bugs',
          ]}
        />

        <InfoBox type="tip" title="React Conditional Rendering">
          Common patterns:<br/>
          • <code>{'isLoading && <Spinner />'}</code> - show when true<br/>
          • <code>{'!error && <Content />'}</code> - show when false<br/>
          • <code>{'isLoggedIn ? <Dashboard /> : <Login />'}</code> - ternary (next topic!)
        </InfoBox>
      </section>
    </TopicPage>
  );
};
