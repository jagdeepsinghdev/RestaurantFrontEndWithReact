import React from 'react'
import './Cart.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { useHistory } from 'react-router-dom'

import {
    removeItem,
    addQuantity,
    subtractQuantity,
    clearCart,
} from '../Store/Action/CartActions'

const Cart = ({
    addedItems,
    total,
    removeItem,
    addQuantity,
    subtractQuantity,
    clearCart,
}) => {
    const history = useHistory()

    const handleRemove = (id) => {
        console.log(id)
        removeItem(id)
    }
    //to add the quantity
    const handleAddQuantity = (id) => {
        addQuantity(id)
    }
    //to substruct from the quantity
    const handleSubtractQuantity = (id) => {
        subtractQuantity(id)
    }
    const handleCheckout = () => {
        console.log('checkoout pressed')
        clearCart()
        history.push('/Checkout')
    }
    return (
        <>
            {addedItems.map((item) => {
                console.log(item)
                return (
                    <div key={item.id}>
                        <div className="item_desc">
                            <h3 className="title">{item.name}</h3>
                            <img
                                src={item.photoPath}
                                alt="cart_item_image"
                            ></img>

                            <p>
                                <b>Price: ${item.price}</b>
                            </p>
                            <p>
                                <b>Quantity: {item.quantity}</b>
                            </p>
                            <div className="add-remove">
                                <Link to="/cart">
                                    <AddCircleIcon
                                        aria-label="Linkedin.com"
                                        onClick={() => {
                                            handleAddQuantity(item.id)
                                        }}
                                    ></AddCircleIcon>
                                </Link>
                                <Link to="/cart">
                                    <RemoveCircleIcon
                                        aria-label="Linkedin.com"
                                        onClick={() => {
                                            handleSubtractQuantity(item.id)
                                        }}
                                    ></RemoveCircleIcon>
                                </Link>
                            </div>
                            <button
                                className="button"
                                onClick={() => {
                                    handleRemove(item.id)
                                }}
                            >
                                Remove
                            </button>
                            <hr />
                        </div>
                    </div>
                )
            })}

            {addedItems.length ? (
                <div className="if_Items">
                    <h1>
                        {' '}
                        <hr />
                        Total: CAD$ {total.toFixed(2)}
                    </h1>
                    <button
                        className="button"
                        onClick={() => {
                            handleCheckout()
                        }}
                    >
                        Checkout
                    </button>
                </div>
            ) : (
                <div className="emptyCart">
                    <h2>Cart Empty</h2>
                </div>
            )}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        addedItems: state.cartItems,
        total: state.total,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addQuantity: (id) => {
            dispatch(addQuantity(id))
        },
        subtractQuantity: (id) => {
            dispatch(subtractQuantity(id))
        },
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        clearCart: () => {
            dispatch(clearCart())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
