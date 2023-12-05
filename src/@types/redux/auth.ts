import { OtpReasons } from '../auth';

export interface AuthState {
  exchangeCode: string;
  otpValues: OtpValuesType;
  loginValues: LoginValuesType;
}

export type LoginValuesType = {
  email: string;
  password: string;
  remember: boolean;
};

export type OtpValuesType = {
  reason: OtpReasons | null;
  token: string;
  coolDown: number;
};

  
// --------------- Payloads ---------------
export type OtpReasonChangedPayload = OtpReasons;
export type LoginValuesChangedPayload = LoginValuesType;
export type OtpValuesChangedPayload = OtpValuesType;
export type ExchangeCodeChangedPayload = string;
