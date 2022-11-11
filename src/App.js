import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import './style.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {

  const { currentUser } = useContext(AuthContext);

  const AuthenticatedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    } else return children;
  }

  const UnauthenticatedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    } else return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          } />
          <Route path="login" element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
