import { useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getActiveAsync, selectStatus } from '../../Redux/Slices/facebookLoginWrapper/facebookLoginWrapperSlice';

const responseFacebook = (response: any) => {
  // TODO: Send access token for backend to do its work
}


export function FacebookLoginWrapper() {
  const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID ?? "";
  let status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getActiveAsync());
  },[dispatch]);
  
  let buttonStyle: React.CSSProperties = {};
  let buttonText = undefined;
  let buttonDisabled = false;
  if (status === "loading") {
    buttonText = "Loading status..."
    buttonStyle = {cursor: "not-allowed"};
    buttonDisabled = true;
  } else if (status === "loggedIn") {
    buttonStyle = {backgroundColor: "green", borderColor: "green", cursor: "not-allowed"};
    buttonText = "Logged in with Facebook"
    buttonDisabled = true;
  }

  return (
    <FacebookLogin
      appId={facebook_app_id}
      fields="accounts"
      scope="pages_show_list,pages_read_engagement,pages_read_user_content"
      callback={responseFacebook}
      size="small"
      icon="fa-facebook"
      isDisabled={buttonDisabled}
      buttonStyle={buttonStyle}
      textButton={buttonText} />
  )
}