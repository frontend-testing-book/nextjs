import { getMyProfile } from "@/services/client/MyProfile";
import { GetMyProfileReturn } from "@/services/server/MyProfile";
import { ReactNode, useEffect } from "react";
import { useAsyncFn } from "react-use";
import { AsyncState } from "react-use/lib/useAsyncFn";

import {
  LoginUserInfoActionContext,
  LoginUserInfoStateContext,
} from "./LoginUserInfoContext";

export const LoginUserInfoProvider = ({
  children,
  defaultState,
}: {
  children: ReactNode;
  defaultState?: AsyncState<GetMyProfileReturn>;
}) => {
  const [profile, updateProfile] = useAsyncFn(getMyProfile, [], defaultState);
  useEffect(() => {
    updateProfile();
    // eslint-disable-next-line
  }, []);
  return (
    <LoginUserInfoStateContext.Provider value={profile}>
      <LoginUserInfoActionContext.Provider value={{ updateProfile }}>
        {children}
      </LoginUserInfoActionContext.Provider>
    </LoginUserInfoStateContext.Provider>
  );
};
