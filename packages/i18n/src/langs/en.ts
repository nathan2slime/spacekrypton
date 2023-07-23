import { AppI18nData } from '../types';

export const en: AppI18nData = {
  err: {
    userNotFound: 'User not found',
    emailAlredyExists: 'Email alredy exists',
    invalidCredentials: 'Invalid credentials',
    sessionExpired: 'Session expired',
    errorUnknow: 'Error unknow',
    accountHasAlreadyBeenLinked: 'Account has already been linked',
    languageNotAvailable: 'Language not available',
    notAuthorized: 'Not authorized',
    secretExpired: 'Secret expired',
    invalidSecret: 'Invalid code',
  },
  web: {
    email: 'Email',
    fieldIsRequired: 'Field is required',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    resendCode: 'Resend code',
    emailHasBeenConfirmed: "Your email has been confirmed",
    codeHasBeenSent: "The code has been sent",
    continue: 'Continue',
    confirmYourEmail: 'Confirm your email. Fill in the code that we sent to the email',
    forgotMyPassword: 'I forgot my password',
    signInDiscord: 'Discord',
    notHaveAnAccount: "I don't have an account",
    alreadyHaveAnAccount: 'I already have an account',
    signUpDiscord: 'Discord',
    invalidEmail: 'Email is invalid',
    username: 'Username',
  },
  email: {
    active: {
      subject: 'Welcome to Space Krypton',
      texts: [
        'Congratulations on joining our community of astronomy enthusiasts! To start exploring the universe on our website, you need to activate your account. Below is the required activation code:',
        'By activating your account, you will have access to up-to-date scientific articles, fascinating images and discussions with other members. Explore the cosmos, learn about a variety of astronomical topics, and connect with people who are passionate about astronomy.',
        'We will provide you with relevant content based on your interests, making your experience personalized and engaging. Thank you for choosing our Astronomy site and we look forward to seeing you explore the universe with us.',
        'Yours sincerely,',
        'Space Krypton Team',
      ],
    },
  },
};
