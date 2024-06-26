export const messages = {
  user: {
    creation_success: 'User Created Successfully',
    all_get_success: 'Users Fetched Successfully',
    one_get_success: 'User Fetched Successfully',
    not_found: 'User With Given Id Not Found',
    email_exist: "Email Already Exist",
    edit_success: 'User Edited Successfully',
    delete_success: 'User Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit User',
    delete_forbidden: 'Forbidden To Delete User',
    my_posts_found: "Found all my posts",
    update_success: "User Updated Successfully",
    verification_failed: "Verification Failed",
    user_verified: "User Verified",
    user_already_verified: "User Verified",
    validation: {
      missing_data: 'Please provide email, name or password in message body',
    },
  },
  auth: {
    login_success: 'LoggedIn Successfully',
    invalid_account: 'Invalid Password or Email',
    invalid_token: 'Invalid Token',
    refresh_token_expired: 'Refresh Token Expired', 
    not_authorized: 'Not Authorized',
    refresh_success: 'Token Refreshed Successfully',
    otp_sent: 'OTP Sent Successfully',
    invalid_otp: 'Invalid OTP',
    forgot_success: 'Forgot Password Success',
  },
  error: {
    internal_server_error: 'Internal Server Error',
    mail_not_enabled_error: 'Something went wrong while sending mail',
  },
  validation:{
    invalid_id: "Id is Invalid",
    id_missing: "Id is not valid mongo ObjectID",
    param_missing: "Missing parameter",
    invalid_email: "Email is Invalid",
    invalid_password: "Password is invalid",
    invalid_otp: "OTP is not valid",
  }
};
