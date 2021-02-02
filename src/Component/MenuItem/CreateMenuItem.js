import React, { useState } from 'react'
import axios from 'axios'

import './CreateMenuItem.css'

const CreateMenuItem = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [photoPath, setphotoPath] = useState('')
    const url = 'https://localhost:5001/MenuItem/'

    const postItemByHandler = async () => {
        const data = { name, price, photoPath }
        axios.post(url, data).then((response) => {
            console.log('Post Item ==' + response)
            setName('')
            setPrice('')
            setphotoPath('')
        })
    }

    return (
        <div className="CreateMenuItem">
            <h1>CreateMenuItem</h1>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            <input
                type="text"
                placeholder="Photo Path"
                onChange={(e) => setphotoPath(e.target.value)}
                value={photoPath}
            />
            <button onClick={() => postItemByHandler()}>Add Item</button>
        </div>
    )
}

export default CreateMenuItem
