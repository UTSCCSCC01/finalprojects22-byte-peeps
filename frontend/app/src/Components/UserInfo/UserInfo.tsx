import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { selectUserName } from '../../Redux/Slices/user/userSlice';

interface Props {
  className: string;
}

const UserInfo: React.FC<Props> = (props) => {
  const username: string = useAppSelector(selectUserName);

  return <div className={`${props.className} userName`}>{username}</div>;
};

export default UserInfo;
