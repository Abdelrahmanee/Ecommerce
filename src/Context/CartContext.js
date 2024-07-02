import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";



export const CartContext = createContext()

const cartURL = 'https://ecommerce.routemisr.com/api/v1/cart'





export default function CartContextProvider(props) {
    const { headers } = useContext(UserContext)
    const [cartCount, setCartCount] = useState(0)
    const [cartId, setCartId] = useState(null)





    function updateCount(item_id, count) {
        return axios.put(cartURL + `/${item_id}`, { count }, { headers })
            .then((response) => response)
            .catch((err) => err)
    }
    function addToCart(productId) {
        return axios.post(cartURL, { productId }, { headers })
            .then((response) => {
                return response
            })
            .catch((err) => err)
    }


    function getLoggedUserCart() {
        return axios.get(cartURL, { headers })
            .then((response) => response)
            .catch((error) => error);
    }
    function getCartCount() {
        return axios.get(cartURL, { headers })
            .then((response) => { setCartCount(response.data.numOfCartItems) })
            .catch((error) => error);
    }

    function removeItem(item_id) {
        return axios.delete(cartURL + `/${item_id}`, { headers })
            .then((response) => {
                return response
            })
            .catch((err) => err)
    }

    function clearCart() {
        return axios.delete(cartURL, { headers })
            .then((response) => response)
            .catch((err) => err)
    }

    function onlinePayment(cart_id, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart_id}?url=http://localhost:3000`,
            {
                shippingAddress: values
            }
            , { headers })
            .then((response) => response)
            .catch((err) => err)
    }

    async function getCartId() {
        const { data } = await getLoggedUserCart();
        console.log(data?.data._id);
        setCartId(data?.data._id)
    }

    useEffect(() => {


        getCartId()
    }, [])



    return <CartContext.Provider value={{ onlinePayment, cartId, cartCount, setCartCount, getCartCount, addToCart, getLoggedUserCart, removeItem, updateCount, clearCart }}>
        {props.children}
    </CartContext.Provider>
}