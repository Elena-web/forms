import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import './styles/App.css';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;
