import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  ExchangeCodeChangedPayload,
  LoginValuesChangedPayload,
  OtpValuesChangedPayload,
} from 'src/@types/redux/auth';
/* eslint-disable import/no-cycle */
import { RootState } from '../store';
// utils

// ----------------------------------------------------------------------

const initialState: AuthState = {
  otpValues: {
    reason: null,
    token: '',
    coolDown: 0,
  },
  exchangeCode: '',
  loginValues: {
    email: '',
    password: '',
    remember: true,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    otpValuesChanged: (state, action: PayloadAction<OtpValuesChangedPayload>) => {
      state.otpValues = action.payload;
    },
    loginValuesChanged: (state, action: PayloadAction<LoginValuesChangedPayload>) => {
      state.loginValues = action.payload;
    },
    exchangeCodeChanged: (state, action: PayloadAction<ExchangeCodeChangedPayload>) => {
      state.exchangeCode = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Selectors
export const OtpValuesSelector = (state: RootState) => state.auth.otpValues;
export const loginValuesSelector = (state: RootState) => state.auth.loginValues;
export const exchangeCodeSelector = (state: RootState) => state.auth.exchangeCode;

// Actions
export const { otpValuesChanged, loginValuesChanged, exchangeCodeChanged } = slice.actions;
