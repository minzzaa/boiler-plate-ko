
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}>
          </Route>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/register" element={<RegisterPage />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}



export default App;
