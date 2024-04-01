export type User = {
    uid: string;
    email: string | null;
    emailVerified: boolean;
    displayName: string | null;
    photoURL: string | null;
    isNewUser: boolean; // Indicates if the user is new
    fname: string | null; // User's first name
    lname: string | null; // User's last name
    idToken: string; // ID token for the user
    expiresIn: string; // Time in seconds until the ID token expires
    expirationEpoch: number; // The Unix epoch time when the token expires
    codes: any []; // Code   
};

export interface AuthContextState {
    user: User | null;
    signInWithEmail: (email: string, password: string) => Promise<ApiResponse<User>>;
}


interface ApiError {
    code: string; // A short, standardized error code
    userMessage: string; // A user-friendly error message
    technicalMessage?: string; // Technical details for debugging (optional)
    source?: string; // The source of the error, e.g., 'database', 'external-api' (optional)
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    message: string;
    error?: ApiError;
}