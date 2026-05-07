import { loginAction } from "./login";
import { registerAction } from "./register";
import { verifyActivationTokenAction } from "./verifyActivationToken";
import {
  createSubscriptionAction,
  deleteSubscriptionAction,
  toggleSubscriptionAction,
  updateSubscriptionAction,
} from "./subscription";

export type OkResult<T> = { success: true; data: T };
export type ErrorResult = { success: false; error: string; code: number };
export type ActionResult<T> = OkResult<T> | ErrorResult;

export const Result = {
  ok: <T>(data: T): ActionResult<T> =>
    ({
      success: true,
      data,
    }) as const,
  error: (error: string, code: number = 400): ErrorResult => ({
    success: false,
    error,
    code,
  }),
};

export {
  registerAction,
  verifyActivationTokenAction,
  loginAction,
  createSubscriptionAction,
  deleteSubscriptionAction,
  toggleSubscriptionAction,
  updateSubscriptionAction,
};
