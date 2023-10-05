import './App.css';
import { useEffect, useState } from 'react';
// import { registerUser } from '../../src/controllers/controllers';
import Register from './components/Register';
import Login from './components/Login';
import { getCookie } from './common';
import { authCheck } from './utils';


function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    console.log("Use effect ran");
    let cookie = getCookie("jwt_token");
    console.log(cookie);

    if (cookie != false) {
      loginWithToken(cookie)
    }
  }, []);

  const loginWithToken = async (cookie) => {
    // make the request to my authCheck route
    let user = await authCheck(cookie)
    setUser(user)
  }

  return (
    <div className="App">
      <Register/>
      <Login/>

    </div>
  );
}

export default App;
