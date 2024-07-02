import React, { useContext } from 'react'
import Style from './Profile.module.css'
import { UserContext } from '../../Context/UserContext'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const MySwal = withReactContent(Swal)


export default function Profile() {

    
    const URL = `https://ecommerce.routemisr.com/api/v1/users/updateMe/`
    const { userData , userToken } = useContext(UserContext)


    async function updateLoggedUserData({name , email , phone}){
        
        return await axios.put(URL , {name , email , phone} , {headers : {token : userToken}} ).then(res=>res).catch(err=>err)
    }
    const handleClick = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Multiple inputs',
            html: `
            <input id="swal-input1" class="swal2-input" value=${userData.name}>
            <input id="swal-input2" class="swal2-input" value=${userData.email}>
            <input id="swal-input3" class="swal2-input" placeholder="phone">
          `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ];
            }
        });

        if (formValues) {
            console.log({...formValues});
            console.log(updateLoggedUserData({...formValues}))
        }
    };
    return (
        <>
            <div className="bg-main-light p-4 w-75 mx-auto rounded shadow mb-5 my-4 cart-area ng-star-inserted">

                <h3 className='display-6'>User Profile</h3>
                <div className="">
                    {userData &&
                        <div className="">
                            <input type="text" disabled className='form-control my-3' value={userData.name} />
                            <input type="text" disabled className='form-control my-3' value={userData.email} />
                            <input type="text" disabled className='form-control my-3' value={userData.role} />

                        </div>
                    }
                    <button onClick={handleClick} className='btn btn-main '>update</button>
                </div>
            </div>
        </>
    )
}
