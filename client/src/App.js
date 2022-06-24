
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    // hoc => null 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지 

    <Router>
      <div>
        <Routes>
          <Route path="/"  element={<AuthLandingPage />}>
          </Route>
          <Route path="/login" element={<AuthLoginPage />}>
          </Route>
          <Route path="/register" element={<AuthRegisterPage />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}



export default App;
