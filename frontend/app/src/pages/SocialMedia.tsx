import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ISMProps {};

const SocialMedia: React.FunctionComponent<ISMProps> = (props) => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Social Media</h1>
      {/* <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      <button onClick={() => navigate('/surveys')}>Surveys</button>
      <button onClick={() => navigate('/reviews')}>Review Apps</button>
      <button onClick={() => navigate('/socials')}>Social Media</button> */}
    </div>
  )
}

export default SocialMedia
