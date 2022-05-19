import {useState} from "react";

function useTogglePassword(){
    const [passwordToggle,setPasswordToggle]=useState({
        type:"password",
        isEyeIcon:false,
    });
    const [confirmPasswordToggle,setConfirmPasswordToggle]=useState({
        type:"password",
        isEyeIcon:false,
    })
    const togglePassword=()=>{
        passwordToggle.isEyeIcon ? setPasswordToggle({  type:"password",
        isEyeIcon:false,}) :setPasswordToggle({  type:"text",
        isEyeIcon:true,})
    }
    const confirmTogglePassword=()=>{
        confirmPasswordToggle.isEyeIcon ? setConfirmPasswordToggle({  type:"password",
        isEyeIcon:false,}) :setConfirmPasswordToggle({  type:"text",
        isEyeIcon:true,})

    }
    return {
        passwordToggle,
        confirmPasswordToggle,
        togglePassword,
        confirmTogglePassword
    }

}

export {useTogglePassword}