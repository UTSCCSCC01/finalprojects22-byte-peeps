import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Surveys from './pages/Surveys';
import ReviewApps from './pages/ReviewApps';
import SocialMedia from './pages/SocialMedia';
import Header from './Components/Header';
import { InactiveApiChecker } from './Components/InactiveApiChecker/InactiveApiChecker';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <InactiveApiChecker />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="surveys" element={<Surveys />} />
          <Route path="reviews" element={<ReviewApps />} />
          <Route path="socials" element={<SocialMedia />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
