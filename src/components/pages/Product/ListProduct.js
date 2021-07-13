import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListProduct = () => {
    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])
    const loadCustomer = async () => {
        const Cutomerdata = await axios.get('http://127.0.0.1:3333/api/customer').then(res => {
            console.log(res)
        })
    }
    useEffect(() => {
        loadCustomer();
    }, [])
    return (
        <div className="h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ...">
            <div className="container">
                <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        </div>
    )
}

export default ListProduct
