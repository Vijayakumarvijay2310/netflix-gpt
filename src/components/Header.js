import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleShowGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () =>{

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    const handleSignOut =()=>{
        signOut(auth).then(() => {
          }).catch((error) => {
            navigate("/error")
          });
    }

    useEffect(()=>{ 
     const unsubscribed = onAuthStateChanged(auth, (user) => {
          if (user) {
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
          navigate("/browse");
          } else {
          dispatch(removeUser());
          navigate("/");
          }
          });

          //unsubscribe when component unmounts
          return () => unsubscribed();
     }, [])

     const handleGptSearch = () =>{
      dispatch(toggleShowGptSearch())
     }

     const handleLanguageChange =(e)=>{
      dispatch(changeLanguage(e.target.value))
     }
  
    return (
     <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44"
        src= {LOGO}
        alt="logo" />
        {user && (
        <div className="flex p-2">
        {showGptSearch && (
        <select 
        className="bg-gray-900 p-2 m-2 text-white" 
        onChange={handleLanguageChange}
        >
          {SUPPORTED_LANGUAGES.map(language => (
          <option key={language.identifier} value={language.identifier}>
            {language.name}
            </option>
          ))}  
        </select>
        )}
        <button 
        className="py-2 px-4 m-4 bg-purple-500 text-white rounded-lg"
        onClick={handleGptSearch} >
        {showGptSearch ? "Homepage" : "GPT Search"}</button>
        <img 
        className="w-12 h-12"
        alt="usericon"
        src={user?.photoURL} />
        <button className="font-bold text-white" onClick={handleSignOut}>Sign Out</button>
        </div>
        )}
        </div>
        )
}

export default Header;