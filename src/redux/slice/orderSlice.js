import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   orderHistory: [],
   totalOrderAmount: 0
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        storeOrders: (state, action) => {
            state.orderHistory = action.payload
        },
        calcTotalOrderAmount: (state, action) => {
            const array = []
            state.orderHistory.map((item) => {
                const { orderAmount } = item
                return array.push(orderAmount)
            })
            const totalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.totalOrderAmount = totalAmount
        }
    }
})

export const {storeOrders, calcTotalOrderAmount} = orderSlice.actions

export const selectOrderHistory = (state) => state.orderSlice.orderHistory
export const selectTotalOrderAmount = (state) => state.orderSlice.totalOrderAmount

export default orderSlice.reducer