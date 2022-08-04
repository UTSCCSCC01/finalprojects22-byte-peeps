import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface Props {
  height: string;
  children: React.ReactElement;
}

const CustomResponsiveContainer: React.FC<Props> = ({ height, children }) => {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: height }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomResponsiveContainer;
