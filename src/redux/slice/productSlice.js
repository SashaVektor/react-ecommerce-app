import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
}
const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
       storeProducts: (state, action) => {
        state.products = action.payload
       },
       getPriceRange: (state, action) => {
        const {products} = action.payload
        const array = []
        products?.map((product )=> {
            const price = product.price
            return array.push(price)

        })
        const max = Math.max(...array);
        const min = Math.min(...array);

        state.minPrice = min
        state.maxPrice = max
       },
    }
})

export const {storeProducts, getPriceRange} = productSlice.actions

export const selectProducts = (state) => state.productSlice.products
export const selectMinPrice = (state) => state.productSlice.minPrice
export const selectMaxPrice = (state) => state.productSlice.maxPrice

export default productSlice.reducer