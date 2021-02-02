import React from 'react'

import './MenuItem.css'

const MenuItem = ({ id, name, price, photoPath, getIdClicked }) => {
    return (
        <div className="card">
            <img src={photoPath} alt="card_image"></img>
            <div className="card__info">
                <h2>{name}</h2>
                <h3>${price}</h3>

                <button onClick={getIdClicked}>Add To Cart</button>
            </div>
        </div>
    )
}

export default MenuItem
