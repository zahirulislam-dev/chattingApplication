import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) :null
  },
  reducers: {
    userLoginInfo: (state,action) => {
      state.userInfo = action.payload
    }
  }
})
export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer