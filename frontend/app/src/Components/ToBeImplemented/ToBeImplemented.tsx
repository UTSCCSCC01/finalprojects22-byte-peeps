import React from 'react';

interface Props {
  fontSize?: string | null;
  className?: string | null;
}

const ToBeImplemented: React.FC<Props> = (props) => {
  let fontSize = props.fontSize ? props.fontSize : '14px';

  return (
    <div style={{ fontSize }} className={`${props.className}`}>
      To Be Implemented
    </div>
  );
};

export default ToBeImplemented;
