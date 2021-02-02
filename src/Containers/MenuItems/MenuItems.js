import React, { useState, useEffect } from 'react'
import './MenuItems.css'
import MenuItem from '../../Component/MenuItem/MenuItem'
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from '../Store/Action/CartActions'

import { STORE_ITEMS } from '../Store/Action/action'

const MenuItems = (props) => {
    const [menuItems, setMenuItems] = useState([])
    const url = 'https://localhost:5001/MenuItem/'

    const getItems = () => {
        axios.get(url).then((response) => {
            setMenuItems(response.data)
        })
    }

    const getItemByIdHandler = (id) => {
        console.log('Add to cart called == ' + id)
        alert('Item Added to cart')
        props.addToCart(id)
    }
    props.onDDD(menuItems)
    useEffect(() => {
        getItems()
        // return () => {
        //     console.log('cleaning up')
        // }
    }, [])
    return (
        <div className="item_container">
            {menuItems.map((mi) => {
                return (
                    <MenuItem
                        key={mi.id}
                        {...mi}
                        getIdClicked={() => getItemByIdHandler(mi.id)}
                    />
                )
            })}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDDD: (menuItems) =>
            dispatch({ type: STORE_ITEMS, allItems: menuItems }),
        addToCart: (id) => {
            dispatch(addToCart(id))
        },
    }
}

export default connect(null, mapDispatchToProps)(MenuItems)
