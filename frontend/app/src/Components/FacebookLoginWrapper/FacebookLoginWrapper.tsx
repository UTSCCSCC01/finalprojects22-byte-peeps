import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response: any) => {
  // TODO: Send access token for backend to do its work
}


export function FacebookLoginWrapper() {
  const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID ?? "";

  return (
    <FacebookLogin
      appId={facebook_app_id}
      autoLoad={true}
      fields="accounts"
      scope="pages_show_list,pages_read_engagement,pages_read_user_content"
      callback={responseFacebook} />
  )
}