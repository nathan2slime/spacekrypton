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
    noSatelliteFound: 'No satellite found',
    unableTrackSatellite: 'Unable to track satellite',
    invalidSecret: 'Invalid code',
  },
  web: {
    email: 'Email',
    fieldIsRequired: 'Field is required',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    resendCode: 'Resend code',
    emailHasBeenConfirmed: 'Your email has been confirmed',
    codeHasBeenSent: 'The code has been sent',
    continue: 'Continue',
    confirmYourEmail:
      'Confirm your email. Fill in the code that we sent to the email',
    forgotMyPassword: 'I forgot my password',
    signInDiscord: 'Discord',
    notHaveAnAccount: "I don't have an account",
    alreadyHaveAnAccount: 'I already have an account',
    signUpDiscord: 'Discord',
    invalidEmail: 'Email is invalid',
    username: 'Username',
  },
  email: {
    password: {
      subject: 'Password Reset - Access to Space Krypton',
      texts: [
        'Dear',
        "We're delighted to have you as part of our community of astronomy enthusiasts at Space Krypton! To continue your cosmic journey, you'll need to reset your password. Click on the link below to begin the password reset process:",
        '[Password Reset Link]',
        "Your passion for astronomy inspires us, and we look forward to providing you with a personalized and engaging experience. By resetting your password, you'll gain access to up-to-date scientific articles, captivating images, and exciting discussions with fellow astronomy enthusiasts.",
        "Thank you for choosing Space Krypton as your platform to connect with the universe. We can't wait to see you explore and learn about the wonders of outer space.",
        'The Space Krypton Team',
      ],
    },
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
