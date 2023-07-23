export type AppI18nLang = 'en';

export type AppI18n = {
  en: AppI18nData;
};

export type AppI18nErr = {
  userNotFound: string;
  emailAlredyExists: string;
  invalidCredentials: string;
  sessionExpired: string;
  accountHasAlreadyBeenLinked: string;
  languageNotAvailable: string;
  errorUnknow: string;
  invalidSecret: string;
  notAuthorized: string;
  secretExpired: string;
};

export type AppI18nWeb = {
  fieldIsRequired: string;
  emailHasBeenConfirmed: string;
  email: string;
  codeHasBeenSent: string,
  password: string;
  resendCode: string;
  continue: string;
  forgotMyPassword: string;
  confirmYourEmail: string;
  notHaveAnAccount: string;
  alreadyHaveAnAccount: string;
  username: string;
  signIn: string;
  signUp: string;
  signInDiscord: string;
  signUpDiscord: string;
  invalidEmail: string;
};

export type AppEmailI18n = {
  active: {
    subject: string;
    texts: string[];
  };
};

export type AppI18nData = {
  web: AppI18nWeb;
  err: AppI18nErr;
  email: AppEmailI18n;
};
