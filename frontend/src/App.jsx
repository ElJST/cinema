import { Routes, Route, Navigate } from 'react-router-dom';
import { Cartelera } from './pages/layout/Cartelera';
import { Login } from './pages/layout/Login';
import { Register } from './pages/layout/Register';
import { Cine } from './pages/layout/Cine';
import { Contacto } from './pages/layout/Contacto';
import { Movie } from './pages/layout/Movie';
import { Error } from './pages/Error';
import { Auth } from './pages/Auth';
import { Admin } from './pages/Admin';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './ProtectedRoute';

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow light">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/cartelera" replace />} />
            <Route path="/cartelera" element={<Cartelera />} />
            <Route path="/cine" element={<Cine />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App;
