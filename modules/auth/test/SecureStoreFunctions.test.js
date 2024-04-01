import * as SecureStore from 'expo-secure-store';
import { retrieveUserAuthDataWithRetry, storeUserAuthDataWithRetry } from '../utility';

jest.mock('expo-secure-store');

describe('SecureStore Functions', () => {
    const testKey = 'testKey';
    const testUser = { username: 'testUser', password: 'password123' };
    const userData = JSON.stringify(testUser);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('storeUserAuthDataWithRetry', () => {
        it('should successfully store user data', async () => {
            SecureStore.setItemAsync.mockResolvedValueOnce();
            const response = await storeUserAuthDataWithRetry(testKey, testUser);
            expect(response.status).toBe('success');
            expect(SecureStore.setItemAsync).toHaveBeenCalledWith(testKey, userData);
        });

        it('should retry and fail to store user data on error', async () => {
            SecureStore.setItemAsync.mockRejectedValue(new Error('Storage failed'));
            const response = await storeUserAuthDataWithRetry(testKey, testUser, 2);
            expect(response.status).toBe('error');
            expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(2);
        });
    });

    describe('retrieveUserAuthDataWithRetry', () => {
        it('should successfully retrieve user data', async () => {
            SecureStore.getItemAsync.mockResolvedValueOnce(userData);
            const response = await retrieveUserAuthDataWithRetry(testKey);
            expect(response.status).toBe('success');
            expect(response.data).toEqual(testUser);
        });

        it('should return null when no data is found', async () => {
            SecureStore.getItemAsync.mockResolvedValueOnce(null);
            const response = await retrieveUserAuthDataWithRetry(testKey);
            expect(response.status).toBe('success');
            expect(response.data).toBeNull();
        });

        it('should retry and fail to retrieve data on error', async () => {
            SecureStore.getItemAsync.mockRejectedValue(new Error('Retrieval failed'));
            const response = await retrieveUserAuthDataWithRetry(testKey, 2);
            expect(response.status).toBe('error');
            expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(2);
        });
    });
});
