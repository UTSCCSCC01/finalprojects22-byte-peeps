import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ISurveysProps {};

const Surveys: React.FunctionComponent<ISurveysProps> = (props) => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Surveys</h1>
      {/* <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/surveys')}>Surveys</button>
      <button onClick={() => navigate('/reviews')}>Review Apps</button>
      <button onClick={() => navigate('/socials')}>Social Media</button> */}
    </div>
  )
}

export default Surveys
