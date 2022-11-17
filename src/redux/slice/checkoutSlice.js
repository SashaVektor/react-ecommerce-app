import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    shippingAddress: {},
    billingAddress: {}
}
const checkoutSlice = createSlice({
    name: 'checkoutSlice',
    initialState,
    reducers: {
       saveShippingAddress: (state, action) => {
        state.shippingAddress = action.payload
       },
       saveBillingAddress: (state, action) => {
        state.billingAddress = action.payload
       },
    }
})

export const {saveShippingAddress, saveBillingAddress} = checkoutSlice.actions

export const selectShippingAddress = (state) => state.checkoutSlice.shippingAddress
export const selectBillingAddress = (state) => state.checkoutSlice.billingAddress

export default checkoutSlice.reducer