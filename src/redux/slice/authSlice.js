import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}
const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setActiveUser : (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName
        },
        removeActiveUser : (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.userId = null;
            state.userName = null
        }
    }
})

export const {setActiveUser, removeActiveUser} = authSlice.actions

export const selectIsLoggedIn = (state) => state.authSlice.isLoggedIn
export const selectEmail = (state) => state.authSlice.email
export const selectUserName = (state) => state.authSlice.userName
export const selectUserId = (state) => state.authSlice.userId

export default authSlice.reducer