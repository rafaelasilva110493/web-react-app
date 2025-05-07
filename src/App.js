import './App.css';
import Login from './componentes/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './componentes/Cadastro';
import Home from './componentes/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
