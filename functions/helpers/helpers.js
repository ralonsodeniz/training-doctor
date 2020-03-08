const isEmpty = string => string.trim() === '';

const isEmail = string => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!string.match(emailRegEx);
};

exports.validateSignupData = signupData => {
  const errors = {};

  if (!signupData.email || isEmpty(signupData.email))
    errors.email = 'must not be empty';
  if (!signupData.email || !isEmail(signupData.email))
    errors.email = 'must be a valida email address';

  if (!signupData.password || isEmpty(signupData.password))
    errors.password = 'must not be empty';

  if (signupData.password !== signupData.confirmPassword)
    errors.confirmPassword = 'passwords must match';

  if (!signupData.handle || isEmpty(signupData.handle))
    errors.handle = 'must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.validateLoginData = loginData => {
  const errors = {};

  if (isEmpty(loginData.email)) errors.email = 'must not be empty';
  if (!isEmail(loginData.email))
    errors.email = 'must be a valid email address';

  if (isEmpty(loginData.password))
    errors.password = 'must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.reduceUserDetails = data => {
  const userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.location.trim()))
    userDetails.location = data.location;
  if (!isEmpty(data.bio.website.trim())) {
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  return userDetails;
};
