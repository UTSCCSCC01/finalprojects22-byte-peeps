import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectPageName } from '../../Redux/Slices/global/globalSlice';
import './PageName.css';

interface Props {}

const PageName: React.FC<Props> = () => {
  const pageName = useAppSelector(selectPageName);

  return (
    <>
      <div className="center pageNameSep"> -</div>
      <div className="center pageName">{pageName}</div>
    </>
  );
};

export default PageName;
