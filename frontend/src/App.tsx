import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Library from './components/Library/Library';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;