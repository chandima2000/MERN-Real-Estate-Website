import React from "react";
import {useSelector} from 'react-redux';
import {useRef,useState,useEffect} from 'react';
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';


function Profile() {
    
    const fileRef = useRef(null);
    const {currentUser} = useSelector(state => state.user);
    const [file,setFile] = useState(undefined);
    const [filePerc,setFilePerc] = useState(0);
    const[fileUploadError, setFileUploadError] = useState(false);
    const[formData,setFormData] = useState({});
    console.log(filePerc);
    //console.log(file);
    console.log(formData);
    console.log(fileUploadError);
  
    useEffect(() => {
        if(file) {
            handleFileUpload(file);
        }
    },[file]);
 
const handleFileUpload = (file) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;  //This will create a unique file name
        const storageRef = ref(storage, fileName) //This shows the which place save the image
        const uploadTask = uploadBytesResumable(storageRef,file) //It will shows the percentage of the uploading image

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
                setFilePerc(Math.round(progress));
            },    
        (error)=> {
            setFileUploadError(true);
        },

        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
            
                // setFormData({ ...formData, avatar: downloadURL });

                //we get the previous form data and set the avatar downloadURL
                setFormData(prevData => ({ ...prevData, avatar: downloadURL }))

                );
            }
        );
    };


    return (  
        <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
                <form className="flex flex-col gap-4">

                    <input 
                        onChange={(e) =>setFile(e.target.files[0])} 
                        type ="file" ref={fileRef} 
                        hidden 
                        accept="images/*"
                    />

                    <img 
                        onClick={() => fileRef.current.click()} 
                        src = {currentUser.avatar} 
                        alt = "profile" 
                        className="rounded-full h-24 w-24 object-cover cursor-pointers self-center mt-2 cursor-pointer"
                    />
                 
                        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>
                        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>
                        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg"/>
                        <button className="bg-slate-700 p-3 text-white uppercase hover:opacity-95 rounded-lg">update</button>

                </form>
                <div className="flex justify-between mt-5">
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                    <span className="text-red-700 cursor-pointer">Sign Out</span>
                </div>
        </div>
        
    );
}

export default Profile;
