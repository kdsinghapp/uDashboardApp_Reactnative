import localizationStrings from "../localization/LocalizationString";

export const validateEmail = (email: string): string => {
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!trimmed) {
    return localizationStrings.emailRequired;
  } else if (!emailRegex.test(trimmed)) {
    return localizationStrings.inValidEmail;
  }
  return ''; // No error
};

export const validatePassword = (password: string): string => {
  const trimmed = password.trim();
  if (!trimmed) {
    return localizationStrings.passRequire;
  } else if (trimmed.length < 6) {
    return localizationStrings.passError;
  }
  return ''; // No error
};
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return localizationStrings.cPassRquire;
  if (password !== confirmPassword) return localizationStrings.cPassError;
  return '';
};

// First Name validation
export const validateFirstName = (firstName: string): string => {
  const trimmed = firstName.trim();
  if (!trimmed) {
    return localizationStrings.fnameReq;
  } 
  // else if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
  //   return 'First name can only contain letters';
  // }
  return '';
};

// Last Name validation
export const validateLastName = (lastName: string): string => {
  const trimmed = lastName.trim();
  if (!trimmed) {
    return localizationStrings.lnameReq;
  }
  //  else if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
  //   return 'Last name can only contain letters';
  // }
  return '';
};

export const validateMobileNumber = (mobile: string): string => {
  const trimmed = mobile.trim();
  const mobileRegex = /^[0-9]{10,15}$/; // Allows 10 to 15 digits

  if (!trimmed) {
    return localizationStrings.phoneReq;
  } else if (!mobileRegex.test(trimmed)) {
    return localizationStrings.phoneErr;
  }
  return '';
};