import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../../dbConnect/firebaseService';
import { ApiResponse, User } from '../models'
import { transformUser } from '../utility';

const createApiResponse = <T>(status: 'success' | 'error', data: T , message: string): ApiResponse<T> => {
  return { status, data, message };
};

// Custom hook
const useEmailAuth = () => {
  const [error, setError] = useState<string | null>(null);

const signInWithEmail = async (email: string, password: string): Promise<ApiResponse<User>> => {
    try {
      console.log("Auth ", auth);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth);
      const user = await transformUser(userCredential);
      return createApiResponse('success', user, 'User signed in successfully');
    } catch (error: any) {
      setError(error.message);
      return {
        status: 'error',
        message: error.message,
      };
    }
  };

  return { signInWithEmail };
};

export default useEmailAuth;
