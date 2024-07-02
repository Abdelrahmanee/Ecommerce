import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";


export const AddressContext = createContext();





export default function AddressContextProvider(props) {

    const baseURL = `https://ecommerce.routemisr.com/api/v1/addresses`
    const { headers } = useContext(UserContext)


    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)


    async function addAddress(values) {
        setIsLoading(true)

        return await axios.post(baseURL, values, { headers }).
            then((response) => { setIsLoading(false); return response })
            .catch((err) => { setError(err.message); setIsLoading(false); return err })

    }
    function getLoggedUserAddresses() {
        return axios.get(baseURL, { headers })
            .then((response) => {
                return response
            })
            .catch((error) => error);
    }

    function removeAddress(add_id) {
        return axios.delete(baseURL + `/${add_id}`, { headers })
            .then((response) => {
                return response
            })
            .catch((err) => err)
    }
    function getSpecificAddress(address_id) {
        return axios.get(baseURL + `/${address_id}`, { headers })
            .then((response) => {
                console.log(response);
                return response
            })
            .catch((err)=>err)

    }

    return <AddressContext.Provider value={{ getSpecificAddress, addAddress, removeAddress, getLoggedUserAddresses, error, isLoading }} >

        {props.children}
    </AddressContext.Provider>
}