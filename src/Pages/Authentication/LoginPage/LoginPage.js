import React ,{useState} from 'react'
import './LoginPage.css'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { loginHandler } from '../authSlice'
import { Loader } from '../../../Components/Loader/Loader'

import { useTogglePassword } from '../Hooks/TogglePassword'
const LoginPage=()=>{
    const dispatch=useDispatch();
    const {passwordToggle,togglePassword}=useTogglePassword();
    const { isLoading } = useSelector((state) => state.auth || {});

    const [login,setLogin]=useState({
        input:{},
        error:"",
    })
    
    const loginInputHandler=(e)=>{
        const {name,value}=e.target;
        setLogin({...login,input:{...login.input,[name]:value}})
    }

    
    return(

        <div className='grid-container'>

            <div>
            <h2 className='brand-header'> Ornate Connect</h2>
            
            <hr></hr>
        <div className="landingpage-container">
            <div className="landingpage-img">
            <img src="./Assets/landingImg.svg" className="img-slide" />
           
            </div>
         
         <div className='form-info'>
         <h2>Sign-In</h2>
                {login.error && (
                    <div className='error-text'>Error :{login.error}</div>
                )}
        <form onSubmit={(e)=>{e.preventDefault();dispatch(loginHandler({login,setLogin}))}}>
        <div className="form">
            <div className="login-form">
            <label for="email">Email <br></br>
           <input 
            
           type="userName"
           placeholder="enter your Name" 
           name="username"
           value={login.input.username || ""}
           className='input'
           onChange={loginInputHandler}
           
           
           required />
         </label>
                <label for="password">Password
           <input 
           type={passwordToggle.type}
           value={login.input.password || ""}
           name="password"
           onChange={loginInputHandler}
           placeholder="enter your password" 
           className="input"
           
           required />
         </label>
         {passwordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={togglePassword} >visibility</span>) :(<span className="material-icons" id="eye-icon-slash" onClick={togglePassword} >visibility_off</span>)}

                <div className='btns'>
                   <button  className="sign-in-button-outlined" type="submit"  onClick={() =>
                  setLogin({
                    ...login,
                    input: {
                      username: "adarshbalika",
                      password: "adarshBalika123",
                    },
                  })
                }>login with test credentials</button>
                    <button  className="sign-in-button" type="submit">login</button>
                </div>
            
            </div>
        </div>
    </form>
            
    <div className="sign-up-info">
        <p>new to Ornate ?</p>
          <Link to="/signup">
            <button className="sign-up-button">create your Ornate account</button>
         </Link>
       
        
    
    </div>

    </div>
    </div> 
    </div>

    </div>  
    
    )
}
export {LoginPage}