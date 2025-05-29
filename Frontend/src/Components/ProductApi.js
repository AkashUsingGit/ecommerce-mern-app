import React from 'react'

const ProductApi = async(setProduct) => {

    try {
        const response = await fetch("http://localhost:4000/api/v1/product/getAllProducts");
        const data = await response.json();
        setProduct(data.data);
    } catch (error) {
    }
};

export {
    ProductApi
}
