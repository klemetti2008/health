import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CurrentNurseIdChangedPayloadType,
  CurrentUserIdChangedPayloadType,
  NurseState,
  StepChangedPayloadType
} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
/* eslint-disable import/no-cycle */
import {RootState} from '../store';
// utils

// ----------------------------------------------------------------------

const initialState: NurseState = {
  currentUserId: "",
  currentNurseId: "",
  createNurseActiveStep: CreateNurseSteps[0],
};

const slice = createSlice({
  name: 'nurse',
  initialState,
  reducers: {
    createNurseActiveStepChanged: (state, action: PayloadAction<StepChangedPayloadType>) => {
      state.createNurseActiveStep = action.payload;
    },
    currentUserIdChanged: (state, action: PayloadAction<CurrentUserIdChangedPayloadType>) => {
      state.currentUserId = action.payload;
    },
    currentNurseIdChanged: (state, action: PayloadAction<CurrentNurseIdChangedPayloadType>) => {
      state.currentNurseId = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Selectors
export const createNurseActiveStepSelector = (state: RootState): StepChangedPayloadType => state.nurse.createNurseActiveStep;
export const currentUserIdSelector = (state: RootState): CurrentUserIdChangedPayloadType => state.nurse.currentUserId;
export const currentNurseIdSelector = (state: RootState): CurrentNurseIdChangedPayloadType => state.nurse.currentNurseId;

// Actions
export const {createNurseActiveStepChanged, currentUserIdChanged, currentNurseIdChanged} = slice.actions;
