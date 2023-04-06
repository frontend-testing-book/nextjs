import { useContext } from "react";
import {
  LoginUserInfoActionContext,
  LoginUserInfoStateContext,
} from "./LoginUserInfoContext";

export const useLoginUserInfoState = () => {
  return useContext(LoginUserInfoStateContext);
};

export const useLoginUserInfoAction = () => {
  return useContext(LoginUserInfoActionContext);
};
