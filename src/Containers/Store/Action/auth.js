import { IS_LOGIN, LOGOUT } from './action.js'
export const isLogin = (token) => {
    return {
        type: IS_LOGIN,
        token,
    }
}
export const isLogout = (value) => {
    return {
        type: LOGOUT,
        value,
    }
}
