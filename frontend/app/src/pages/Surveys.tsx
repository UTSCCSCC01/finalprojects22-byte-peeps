import React from 'react';
import { Counter } from '../Components/Counter/Counter';

export interface ISurveysProps {}

const Surveys: React.FunctionComponent<ISurveysProps> = (props) => {
  return (
    <div>
      <h1>Surveys</h1>
      <Counter />
    </div>
  );
};

export default Surveys;
