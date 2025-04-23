import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from './pages/Auth';
import { Admin } from './pages/Admin';
import { Cartelera } from './pages/Cartelera';
import { Cine } from './pages/Cine';
import { Contacto } from './pages/Contacto';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MovieDetails } from './pages/MovieDetails';
import { Error } from './pages/Error';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './ProtectedRoute';

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userActive');
    return storedUser ? JSON.parse(storedUser).name : '';
  });

  return (
    <>
      <NavBar user={user} setuser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/cartelera" replace />} />
        <Route path="/cartelera" element={<Cartelera nameuser={user} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/cine" element={<Cine />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login setuser={setUser} />} />
        <Route path="/login/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
