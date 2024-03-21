import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CrudEscuelas } from './components/CrudEscuelas';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CrudEscuelas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
