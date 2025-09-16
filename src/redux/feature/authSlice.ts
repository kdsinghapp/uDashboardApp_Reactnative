import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLogin: boolean;
  isLogOut: boolean;
  userData: any;  
  token: string | null;
  forgotData: any;  
  betOption: any;
  gameResult: any;
  newbetOption: any;
}

// Initial state
const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLogin: false,
  isLogOut: false,
  userData: null,
  token: null,
  forgotData: null,
  betOption: null,
  gameResult: null,
  newbetOption: null,
};

interface LoginPayload {
  userData: any;  
  token: string;
}

// Slice
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginPayload>) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
      state.userData = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
