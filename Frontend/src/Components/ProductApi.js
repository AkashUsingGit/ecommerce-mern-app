import React from 'react'

const ProductApi = async(setProduct) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
        const response = await fetch(`${BASE_URL}/product/getAllProducts`);
        const data = await response.json();
        setProduct(data.data);
    } catch (error) {
    }
};

export {
    ProductApi
}
