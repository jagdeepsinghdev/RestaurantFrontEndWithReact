import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    STORE_ITEMS,
    IS_LOGIN,
    LOGOUT,
    CLEARCART,
} from '../Action/action'

const initialState = {
    allItems: [],
    cartItems: [],
    total: 0,
    isAuth: false,
}

const Reducer = (state = initialState, action) => {
    if (action.type === STORE_ITEMS) {
        return {
            ...state,
            allItems: action.allItems,
        }
    }

    if (action.type === ADD_TO_CART) {
        let addedItem = state.allItems.find((item) => item.id === action.id)

        let existed_item = state.cartItems.find((item) => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price,
            }
        } else {
            addedItem.quantity = 1

            let newTotal = state.total + addedItem.price

            return {
                ...state,
                cartItems: [...state.cartItems, addedItem],
                total: newTotal,
            }
        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.cartItems.find((item) => action.id === item.id)
        let new_items = state.cartItems.filter((item) => action.id !== item.id)
        console.log('remove redux call' + action.id)
        //calculating the total
        let newTotal = state.total - itemToRemove.price * itemToRemove.quantity

        if (newTotal < 0) {
            newTotal = 0
        }
        return {
            ...state,
            cartItems: new_items,
            total: newTotal,
        }
    }
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.allItems.find((item) => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal,
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.allItems.find((item) => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.cartItems.filter(
                (item) => item.id !== action.id
            )
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                cartItems: new_items,
                total: newTotal,
            }
        } else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal,
            }
        }
    }

    if (action.type === IS_LOGIN) {
        if (action.token) {
            return {
                ...state,
                isAuth: true,
            }
        }
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            isAuth: false,
        }
    }
    if (action.type === CLEARCART) {
        return {
            ...state,
            cartItems: [],
            total: 0,
        }
    }

    return state
}

export default Reducer
