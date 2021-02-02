import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { connect } from 'react-redux'
import { isLogout } from '../Store/Action/auth'

const Header = ({ isAuth, logout }) => {
    useEffect(() => {}, [isAuth])

    return (
        <div className="header">
            {isAuth ? (
                <Link to="/Login" onClick={() => logout(false)}>
                    Logout
                </Link>
            ) : (
                <Link to="/Login">Login</Link>
            )}
            <Link to="/MenuItems">Home</Link>
            {isAuth ? <Link to="/CreateMenuItem">Create Item</Link> : null}

            <Link to="/Cart">
                Cart
                <ShoppingCartIcon />
            </Link>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuth: state.isAuth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: (value) => {
            dispatch(isLogout(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
