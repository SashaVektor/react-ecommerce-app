import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousUrl: ""
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addToCard: (state, action) => {
            const productIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (productIndex >= 0) {
                // Item already exists in the card, increase the cartQuantity
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${action.payload.name} increased by one`, {
                    position: "top-left"
                })
            } else {
                // Item dosent  exists in the card, add Item to the card
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to card`, {
                    position: "top-left"
                })
            }
            // save card to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decreaseAtCart: (state, action) => {
            const productIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1
                toast.info(`${action.payload.name} decreased by one`, {
                    position: "top-left"
                })
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems
                    .filter(item => item.id !== action.payload.id)
                state.cartItems = newCartItem
                toast.success(`${action.payload.name} removed from card`, {
                    position: "top-left"
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removedFromCard: (state, action) => {
            const newCartItem = state.cartItems.filter(item => item.id !== action.payload.id)
            state.cartItems = newCartItem;
            toast.success(`${action.payload.name} removed from card`, {
                position: "top-left"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCard: (state, action) => {
            state.cartItems = []
            toast.success(`cart has been cleared`, {
                position: "top-left"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        calculateSubTotal: (state, action) => {
            const array = []
            state.cartItems.map((item) => {
                const { price, cartQuantity } = item
                const cartItemAmount = price * cartQuantity
                return array.push(cartItemAmount)

            })
            const totalAmount = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.cartTotalAmount = totalAmount
        },
        calculateTotalQuantity: (state, action) => {
            const array = []
            state.cartItems.map((item) => {
                const { cartQuantity } = item
                const quantity = cartQuantity
                return array.push(quantity)

            })
            const totalQuantity = array.reduce((a, b) => {
                return a + b
            }, 0)
            state.cartTotalQuantity = totalQuantity
        },
        saveUrl: (state, action) => {
            state.previousUrl = action.payload
        }
    }
})

export const { addToCard, decreaseAtCart, removedFromCard,
    clearCard, calculateSubTotal,
    calculateTotalQuantity, saveUrl } = cartSlice.actions

export const selectCartItems = (state) => state.cartSlice.cartItems
export const selectCartTotalQuantity = (state) => state.cartSlice.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cartSlice.cartTotalAmount
export const selectPreviousUrl = (state) => state.cartSlice.previousUrl

export default cartSlice.reducer