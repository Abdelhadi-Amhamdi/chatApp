import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('authTokens');
    return token ? jwtDecode(token) : null;
  });

  const [accessTocken, setAccessTocken] = useState(() => {
    const token = localStorage.getItem('authTokens');
    return token ? JSON.parse(token) : null;
  });

  const [loading, setLoadding] = useState(true)

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/token/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAccessTocken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      console.log("Something went wrong");
    }
  };

  const updateToken = async () => {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: accessTocken.refresh,
        }),
    });
    const data = await response.json();
      if (response.status === 200) {
        setAccessTocken(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
      } else
        logout()
  }

  const logout = () => {
    setAccessTocken(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/auth/login')
  }

  const contextData = {
    user,
    loginUser: login,
    logout,
  };

  useEffect(() => {
    let id = setInterval(() => {
        if (accessTocken)
            updateToken();
    }, 1000 * 60 * 4)

    return () => clearInterval(id)
  }, [accessTocken, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
