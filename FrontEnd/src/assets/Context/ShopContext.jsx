import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/Frontend_Assets/all_product.js'

export const ShopContext = createContext(null)

const getDefaltCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [cartItems, setCardItem] = useState(getDefaltCart);


    const addToCart = (itemId) => {
        setCardItem((prev) => {
            const updated = { ...prev, [itemId]: prev[itemId] + 1 };
            console.log("Updating cart:", updated);
            return updated;
        });
    }

    const removeFromCart = (itemId) => {
        setCardItem((prev) => {
            const updated = { ...prev, [itemId]: prev[itemId] - 1 };
            console.log("Updating cart:", updated);
            return updated;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        console.log(totalAmount)
        return totalAmount
    }


    const getTotalCartItem = () => {
        let totalItem = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return totalItem
    }
    

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount ,getTotalCartItem};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;
