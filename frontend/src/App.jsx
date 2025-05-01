import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Cartelera } from './pages/Cartelera';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cine } from './pages/Cine';
import { Contacto } from './pages/Contacto';
import { Movie } from './pages/Movie';

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow light">
        <Routes>
          <Route path="/" element={<Navigate to="/cartelera" replace />} />
          <Route path="/cartelera" element={<Cartelera />} />
          <Route path="/cine" element={<Cine />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<Movie />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;
