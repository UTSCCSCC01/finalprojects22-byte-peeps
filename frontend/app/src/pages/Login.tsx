import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ILoginProps {};

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const login = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => login('/dashboard')}>Login</button>
    </div>
  )
}

export default Login
