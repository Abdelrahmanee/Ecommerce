import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";




export const WishListContext = createContext()




export default function WishListContextProvider(props) {


    const baseURL = 'https://ecommerce.routemisr.com/api/v1/wishlist'

    const {headers } = useContext(UserContext)
    const [wishlistCount, setWishListCount] = useState(0)

    function getWishListCount() {
        return axios.get(baseURL, { headers })
            .then((response) => {
                console.log(response.data);
                setWishListCount(response.data.count)})
            .catch(error => error)
    }
    function getLoggedUserWishList() {
        return axios.get(baseURL, { headers })
            .then((response) => response)
            .catch(error => error)
    }


    function addToWishList(productId) {
        return axios.post(baseURL, { productId }, { headers })
            .then(response => response)
            .catch(error => error)
    }
    function removeFromWishList(productId) {
        return axios.delete(baseURL + `/${productId}`, { headers })
            .then(response => response)
            .catch(error => error)
    }



    return <WishListContext.Provider value={{ getWishListCount ,  getLoggedUserWishList, removeFromWishList, addToWishList, wishlistCount, setWishListCount }}>
        {props.children}
    </WishListContext.Provider>
}