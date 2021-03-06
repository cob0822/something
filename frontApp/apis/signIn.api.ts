import apiClient from 'axios';
import { SignInRequest } from '@/types';

export const UserSignIn = async (params: SignInRequest) => {
  apiClient.defaults.withCredentials = true;

  let signedIn = false;
  await apiClient.get('/sanctum/csrf-cookie').then(async () => {
    await apiClient.post('/api/login', params)
      .then((response: any) => {
        if (response.status == 200) {
          signedIn = true;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  return signedIn;
}

export const UserSignOut = async () => {
  apiClient.defaults.withCredentials = true;
  let signedOut = false;
  await apiClient.get('/sanctum/csrf-cookie').then(async () => {
    await apiClient.post('/api/logout')
      .then((response: any) => {
        if (response.status == 200) {
          signedOut = true;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  });
  return signedOut;
}
