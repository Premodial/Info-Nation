import { User } from './models';


async function transformUser(userCredential: any): Promise<User> {
    const user = userCredential.user;
    // Current timestamp in milliseconds
    const currentTimeMs = new Date().getTime();
    // expiresIn is in seconds, convert it to milliseconds and add to current time
    const expiresInMs = parseInt(userCredential._tokenResponse.expiresIn) * 1000;
    const expirationTimeMs = currentTimeMs + expiresInMs;
    // Convert the expiration time to a Unix epoch timestamp (in seconds)
    const expirationEpoch = Math.floor(expirationTimeMs / 1000);

    return {
      codes: [],
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      isNewUser: userCredential._tokenResponse.isNewUser,
      fname: userCredential._tokenResponse.firstName,
      lname: userCredential._tokenResponse.lastName,
      idToken: userCredential._tokenResponse.idToken,
      expiresIn: userCredential._tokenResponse.expiresIn,
      expirationEpoch: expirationEpoch // Add this line to store the expiration epoch time
    };
};

export {transformUser}