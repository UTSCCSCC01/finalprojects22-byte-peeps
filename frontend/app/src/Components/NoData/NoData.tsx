import React from 'react';

interface Props {
  fontSize?: string | null;
  className?: string | null;
}

const NoData: React.FC<Props> = (props) => {
  let fontSize = props.fontSize ? props.fontSize : '14px';

  return (
    <div
      style={{ fontSize }}
      className={`${props.className} center fullDimension`}
    >
      No Data Avaiable For This Date Range
    </div>
  );
};

export default NoData;
