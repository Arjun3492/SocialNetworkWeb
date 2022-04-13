import './App.scss';
import Home from './pages/Home/home'
import PageNotFound from './pages/404/pageNotFound'
import Login from './pages/Login/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getCurrentUser } from './core/helpers/firebaseAuth';
import Profile from './pages/profile/profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    getCurrentUser().then((user) =>
      user &&
      setIsLoggedIn(true)
    );
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
