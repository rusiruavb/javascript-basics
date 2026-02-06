import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ESStandards } from './pages/topics/ESStandards';
import { DataTypes } from './pages/topics/DataTypes';
import { Variables } from './pages/topics/Variables';
import { Functions } from './pages/topics/Functions';
import { Arrays } from './pages/topics/Arrays';
import { Conditions } from './pages/topics/Conditions';
import { Ternary } from './pages/topics/Ternary';
import { Callbacks } from './pages/topics/Callbacks';
import { Promises } from './pages/topics/Promises';
import { AsyncAwait } from './pages/topics/AsyncAwait';
import { EventLoop } from './pages/topics/EventLoop';

const App = () => {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topic/es-standards" element={<ESStandards />} />
              <Route path="/topic/data-types" element={<DataTypes />} />
              <Route path="/topic/variables" element={<Variables />} />
              <Route path="/topic/functions" element={<Functions />} />
              <Route path="/topic/arrays" element={<Arrays />} />
              <Route path="/topic/conditions" element={<Conditions />} />
              <Route path="/topic/ternary" element={<Ternary />} />
              <Route path="/topic/callbacks" element={<Callbacks />} />
              <Route path="/topic/promises" element={<Promises />} />
              <Route path="/topic/async-await" element={<AsyncAwait />} />
              <Route path="/topic/event-loop" element={<EventLoop />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;
