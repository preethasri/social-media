import React,{useState} from 'react'
import './SignUpPage.css'
import { useSelector,useDispatch } from 'react-redux'
import { useTogglePassword } from '../Hooks/TogglePassword'
import { Link } from 'react-router-dom'
import { signUpHandler } from '../authSlice'
import { Loader } from "../../../Components/Loader/Loader"

const SignUpPage=()=>{
    const {togglePassword,passwordToggle,confirmPasswordToggle,confirmTogglePassword}=useTogglePassword();
    
    const dispatch=useDispatch();
    const {isLoading}=useSelector((state)=>state.auth ||{})
    const [signup,setSignUp]=useState({
        input:{},
        error:"",
        passwordMatch:true,
        
    })
    
    const signUpInputHandler=(e)=>{
        const {name,value}=e.target;
        if (name === "confirmPassword") {
            setSignUp({
              ...signup,
              input: { ...signup.input, [name]: value },
              passwordMatch: value === signup.input.password ? true : false,
            });
          } else {
            setSignUp({
              ...signup,
              input: { ...signup.input, [name]: value },
            });
          }
        };
        

    
    
    return(
        <div className='grid-container'>
           
            <div>
            <h2 class="brand-header">Ornate Connect</h2>

            <hr></hr>
        <div className="landingpage-container">
            <div className="landingpage-img">
              <img src="/Assets/landingImg.svg" ></img>
              
            </div>
        <div className='form-info'>
        <h2>Create Account</h2>
               
            
             <form   onSubmit={(e)=>{e.preventDefault();  dispatch(signUpHandler({signup,setSignUp})) } }>
        <div className="form">
            <div className="sign-up-form">
                
               
                <label for="firstName">Name
        <input type="text"
        placeholder="enter your name" 
        required
        name='firstName' 
        onChange={signUpInputHandler} 
        value={signup.input.firstName || ""}
         />
       </label>
         
               
       <label for="username">Name
        <input type="text"
        placeholder="enter your user name" 
        required
        name='username' 
        onChange={signUpInputHandler} 
        value={signup.input.username || ""}
         />
       </label>

            
                <label for="email">Email-id
        <input type="text" 
        placeholder="enter your mail address" 
        required
        name="email" 
        onChange={signUpInputHandler} 
        value={signup.input.email || ""}
         />
       </label>
                <label for="password">Password
        <input 
        placeholder="enter your password" 
        name="password"
        required 
        id="password"
        type={passwordToggle.type}
        onChange={signUpInputHandler} 
        value={signup.input.password ||""} 
         />
        {passwordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={togglePassword} >visibility</span>) :(<span className="material-icons-outlined" id="eye-icon-slash" onClick={togglePassword}>visibility_off</span>)}

        <br></br>
       </label>
                <label for="confirmPassword" className="confirm-password">Confirm-password
        <input 
        
        placeholder="confirm your password" 
        name="confirmPassword" 
        required
        id="confirmPassword"
        type={confirmPasswordToggle.type}
        onChange={signUpInputHandler} 
        value={signup.input.confirmPassword || ""}
         />
        {confirmPasswordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={confirmTogglePassword} >visibility</span>) :(<span className="material-icons-outlined" id="eye-icon-slash" onClick={confirmTogglePassword} >visibility_off</span>)}
       <div>
        {!signup.passwordMatch ? (<div className="error">password do not match</div>):null}
        </div>
       </label>
                <button className={`sign-up ${signup.passwordMatch ?"" :"btn-disabled"}`}  type='submit' disabled={!signup.passwordMatch}  
              >Continue
      </button>
            </div>
        </div>
    </form>
    <div className="login-form-info">
        <span>Already have an account? 
          <Link to="/login">
            <button className="login-form-link" >Login</button>
        </Link>
        </span>
    </div>
   
    
        </div>
        </div>
        <div>

        </div>
        </div>
      
        </div>
    )
}



export {SignUpPage}