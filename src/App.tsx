import './styles/auth.css';
import './styles/navbar.css';
import './styles/toDo.css';

import { useState } from 'react';
import { UserModel } from './backend/models/user';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppContext from './components/context/AppContext';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Navbar from './components/navBar';
import Home from './components/home';
import ToDo from './components/toDo';

function App() {
  const [user, setUser] = useState<UserModel | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  function login(user: UserModel) {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <AppContext.Provider value={{ user, logout, login }}>
      <Routes>
        {!user && <Route path="*" element={<Navigate to="/" replace />} />}
        <Route path="/" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        {user&&<Route path="navbar" element={<Navbar />}>

          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="toDo" element={<ToDo />} />

        </Route>
        }
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
