import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movie from './pages/Movie';
import Cinema from './pages/Cinema';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public area with RootLayout */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="movie" element={<Movie />} />
          <Route path="cinema" element={<Cinema />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Protected area with DashboardLayout */}
        {/* <Route element={<ProtectedRoute isAuthed={isAuthed} />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<Projects />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route> */}

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container-page py-10">
              <h1 className="text-3xl font-bold">404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
