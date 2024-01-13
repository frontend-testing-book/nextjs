import { createContext } from 'react';

import { GetMyProfileReturn } from '@/services/server/MyProfile';

export type LoginUserInfoState = {
  error?: Error;
  loading?: boolean;
  value?: GetMyProfileReturn;
};

export const defaultState: LoginUserInfoState = {
  error: undefined,
  loading: undefined,
  value: undefined,
};

export const LoginUserInfoStateContext =
  createContext<LoginUserInfoState>(defaultState);

export const LoginUserInfoActionContext = createContext({
  updateProfile: {} as () => Promise<GetMyProfileReturn>,
});
