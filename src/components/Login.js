import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Login = () =>{

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null)
    const password = useRef(null)
    const userName = useRef(null)

    const handleButtonClick = () =>{

       const message = !isSignInForm ? checkValidData(email.current.value,password.current.value,userName.current.value)  
       : checkValidData(email.current.value,password.current.value) 
       setErrorMessage(message);
       if(message) return;

       if(!isSignInForm){
        // Signed up Logic
    createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
       .then((userCredential) => {
       const user = userCredential.user;
       updateProfile(user, {
        displayName: userName.current.value, photoURL: USER_AVATAR
      }).then(() => {
            const {uid, email, displayName,photoURL} = auth.currentUser;
            dispatch(
                addUser({
                    uid:uid,
                    email:email,
                    displayName:displayName,
                    photoURL:photoURL}))
      }).catch((error) => {
        setErrorMessage(error)
      });  
    })
       .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       setErrorMessage(`${errorCode} - ${errorMessage}`)
    });
       }
       else{
        //Signed In Logic
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
        //  const user = userCredential.user;
    })
        .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
        setErrorMessage(`${errorCode} - ${errorMessage}`)
  });

       }
       
    }

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm)
    }

    return (
    <div>
        <Header/>
        <div className="absolute w-screen">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/df6621a3-890c-4ca0-b698-90bd5152f3d1/20a59be7-7062-4991-bca0-805e9a7f2716/IN-en-20240107-trifectadaily-perspective_alpha_website_small.jpg"
        alt="logo"/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && <input 
            type="text"
            ref={userName}
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"/>}
            <input
            type="text"
            ref={email}
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"/>
            <input
            type="password"
            ref={password}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"/>
            <p className="text-red-500">{errorMessage}</p>
            <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}>{isSignInForm? "Sign In" : "Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm
                ? "New to Netflix? Sign Up Now"
                : "Already registered? Sign In Now"}</p>
        </form>
    </div>
    )
}

export default Login;