import React from 'react';
import './Error.css';

interface Props {
  message: string;
}

const TemplateComponent: React.FC<Props> = ({ message }) => {
  return <div className="templateComponent">{message}</div>;
};

export default TemplateComponent;
