import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    history: useHistory()
  });

  const handleChange = e => {
  e.preventDefault();
  setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
  });
}

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
        .then(response => {
          console.log(response);
            localStorage.setItem('token', response.data.payload);
            credentials.history.push('/api/bubble-page');
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div className="Login">
          <h1>Welcome to the Bubble App!</h1>
          <p>Build a login page here</p>
    <form className='login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
            type='text'
            placeholder='Username'
            name='username'
            value={credentials.username}
            onChange={handleChange}
        />
        <input
            type='text'
            placeholder='Password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
        />
        <button>Login</button>
    </form>
</div>
  );
};

export default Login;
