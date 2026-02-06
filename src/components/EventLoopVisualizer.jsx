import { useState, useEffect } from 'react';

export const EventLoopVisualizer = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);

  const steps = [
    {
      name: 'Start',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'JavaScript engine is ready to execute code',
      code: 'console.log("Start");',
      codeLine: 0,
    },
    {
      name: 'Execute console.log',
      callStack: ['console.log("Start")'],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'Synchronous code is pushed to the Call Stack',
      code: 'console.log("Start");',
      highlight: 'callStack',
      codeLine: 1,
    },
    {
      name: 'Output "Start"',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'Function executes and is removed from stack',
      code: 'console.log("Start");',
      output: 'Start',
      codeLine: 1,
    },
    {
      name: 'setTimeout called',
      callStack: ['setTimeout(...)'],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'setTimeout is called and added to Call Stack',
      code: 'setTimeout(() => {...}, 0);',
      highlight: 'callStack',
      codeLine: 3,
    },
    {
      name: 'Sent to Web API',
      callStack: [],
      webAPIs: ['setTimeout 0ms'],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'setTimeout is handled by Web API, removed from stack',
      code: 'setTimeout(() => {...}, 0);',
      highlight: 'webAPIs',
      codeLine: 3,
    },
    {
      name: 'Promise created',
      callStack: ['Promise.resolve()'],
      webAPIs: ['setTimeout 0ms'],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'Promise is created in Call Stack',
      code: 'Promise.resolve().then(...)',
      highlight: 'callStack',
      codeLine: 7,
    },
    {
      name: 'Promise resolved',
      callStack: [],
      webAPIs: ['setTimeout 0ms'],
      macrotaskQueue: [],
      microtaskQueue: ['.then callback'],
      description: 'Promise callback added to Microtask Queue',
      code: 'Promise.resolve().then(...)',
      highlight: 'microtaskQueue',
      codeLine: 7,
    },
    {
      name: 'More sync code',
      callStack: ['console.log("End")'],
      webAPIs: ['setTimeout 0ms'],
      macrotaskQueue: [],
      microtaskQueue: ['.then callback'],
      description: 'Continue executing synchronous code',
      code: 'console.log("End");',
      highlight: 'callStack',
      codeLine: 11,
    },
    {
      name: 'Output "End"',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: ['setTimeout callback'],
      microtaskQueue: ['.then callback'],
      description: 'Sync code done. setTimeout ready, moved to Macrotask Queue',
      code: 'console.log("End");',
      output: 'End',
      codeLine: 11,
    },
    {
      name: 'Process Microtasks',
      callStack: ['.then callback'],
      webAPIs: [],
      macrotaskQueue: ['setTimeout callback'],
      microtaskQueue: [],
      description: 'Event Loop: Microtasks have priority! Execute first',
      code: 'console.log("Promise");',
      highlight: 'callStack',
      arrow: 'microtask',
      codeLine: 8,
    },
    {
      name: 'Output "Promise"',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: ['setTimeout callback'],
      microtaskQueue: [],
      description: 'Microtask complete, removed from stack',
      code: 'console.log("Promise");',
      output: 'Promise',
      codeLine: 8,
    },
    {
      name: 'Process Macrotask',
      callStack: ['setTimeout callback'],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'Now execute Macrotask (setTimeout callback)',
      code: 'console.log("Timeout");',
      highlight: 'callStack',
      arrow: 'macrotask',
      codeLine: 4,
    },
    {
      name: 'Output "Timeout"',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: 'All tasks complete! Event Loop is idle',
      code: 'console.log("Timeout");',
      output: 'Timeout',
      codeLine: 4,
    },
    {
      name: 'Complete',
      callStack: [],
      webAPIs: [],
      macrotaskQueue: [],
      microtaskQueue: [],
      description: '✅ Execution order: Start → End → Promise → Timeout',
      code: '',
      output: 'Complete!',
      codeLine: -1,
    },
  ];

  const currentStep = steps[step];

  useEffect(() => {
    let interval;
    if (isPlaying && step < steps.length - 1) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, speed, steps.length]);

  const handlePlayPause = () => {
    if (step >= steps.length - 1) {
      setStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const QueueBox = ({ title, items, highlight, color }) => (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        highlight
          ? `${color} shadow-lg scale-105`
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      }`}
    >
      <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100">{title}</h4>
      <div className="space-y-1 min-h-[60px]">
        {items.length === 0 ? (
          <div className="text-gray-400 text-xs italic">Empty</div>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs font-mono animate-fadeIn"
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🎬</span>
        Event Loop Animation
      </h3>

      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600">
          <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>📝</span> Complete Program
          </h4>
          <div className="bg-gray-900 p-3 rounded overflow-x-auto">
            {[
              'console.log("Start");',
              '',
              'setTimeout(() => {',
              '  console.log("Timeout");',
              '}, 0);',
              '',
              'Promise.resolve().then(() => {',
              '  console.log("Promise");',
              '});',
              '',
              'console.log("End");',
            ].map((line, idx) => (
              <div
                key={idx}
                className={`font-mono text-xs flex gap-2 ${
                  currentStep.codeLine === idx + 1
                    ? 'bg-yellow-500/30 border-l-2 border-yellow-400'
                    : ''
                }`}
              >
                <span className="text-gray-500 select-none w-4 text-right">{idx + 1}</span>
                <span className={currentStep.codeLine === idx + 1 ? 'text-yellow-200 font-bold' : 'text-gray-100'}>
                  {line || ' '}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <strong>Expected output order:</strong> Start → End → Promise → Timeout
            </div>
            {currentStep.codeLine > 0 && (
              <div className="text-xs flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <span>👉</span>
                <span>Currently executing line {currentStep.codeLine}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600">
          <h4 className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>📋</span> Execution Steps ({steps.length} total)
          </h4>
          <div className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-thin">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`text-xs p-2 rounded cursor-pointer transition-all ${
                  idx === step
                    ? 'bg-blue-500 text-white font-semibold scale-105'
                    : idx < step
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setStep(idx)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="flex-1">{s.name}</span>
                  {idx === step && <span>👉</span>}
                  {idx < step && <span>✓</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Click any step to jump to it
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 rounded"></span>
                <span className="text-gray-600 dark:text-gray-400">Current</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-500 rounded"></span>
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-gray-100 dark:bg-gray-700 border border-gray-400 rounded"></span>
                <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          Step {step + 1}/{steps.length}: {currentStep.name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">{currentStep.description}</div>
        {currentStep.code && (
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded font-mono text-xs text-gray-800 dark:text-gray-200">
            {currentStep.code}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <QueueBox
          title="📚 Call Stack"
          items={currentStep.callStack}
          highlight={currentStep.highlight === 'callStack'}
          color="border-blue-500 bg-blue-50 dark:bg-blue-900/30"
        />
        <QueueBox
          title="🌐 Web APIs"
          items={currentStep.webAPIs}
          highlight={currentStep.highlight === 'webAPIs'}
          color="border-green-500 bg-green-50 dark:bg-green-900/30"
        />
        <QueueBox
          title="⚡ Microtask Queue (Promises)"
          items={currentStep.microtaskQueue}
          highlight={currentStep.highlight === 'microtaskQueue'}
          color="border-purple-500 bg-purple-50 dark:bg-purple-900/30"
        />
        <QueueBox
          title="⏰ Macrotask Queue (setTimeout)"
          items={currentStep.macrotaskQueue}
          highlight={currentStep.highlight === 'macrotaskQueue'}
          color="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30"
        />
      </div>

      {currentStep.output && (
        <div className="mb-4 p-3 bg-gray-900 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Console Output:</div>
          <div className="font-mono text-sm text-green-400">{currentStep.output}</div>
        </div>
      )}

      {currentStep.arrow && (
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-400 dark:border-yellow-600">
          <div className="text-xs font-semibold text-yellow-900 dark:text-yellow-200">
            ⚡ Event Loop: Moving {currentStep.arrow === 'microtask' ? 'Microtask' : 'Macrotask'} to Call Stack
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isPlaying ? '⏸ Pause' : step >= steps.length - 1 ? '🔄 Restart' : '▶ Play'}
        </button>
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={step >= steps.length - 1}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          🔄 Reset
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm text-gray-700 dark:text-gray-300">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm"
          >
            <option value={2500}>Slow</option>
            <option value={1500}>Normal</option>
            <option value={800}>Fast</option>
          </select>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
        <div className="text-xs text-gray-700 dark:text-gray-300">
          <strong>How it works:</strong> Synchronous code executes first → Microtasks (Promises) → Macrotasks
          (setTimeout). The Event Loop continuously checks if the Call Stack is empty, then moves tasks from queues to
          the stack.
        </div>
      </div>
    </div>
  );
};
