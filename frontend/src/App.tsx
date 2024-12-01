import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, protectedRoutes } from './routes'
import ProtectedRoute from './routes/protectedRoute'
import PublicRoute from './routes/publicRoute'
import NotFound from './pages/notFound'

const App = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<PublicRoute>{route.element}</PublicRoute>}
          />
        ))}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </Router>
  )
}

export default App
