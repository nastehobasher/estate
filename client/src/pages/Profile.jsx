import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef,useState,useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading,error } = useSelector((state) => state.user)
  const [file,setFile] = useState(undefined)
  const [filePer,setFilePerc] = useState(0)
  const[fileploadError,setFileUploadErro]= useState(false)
  const[formData,setFormData]= useState({})
  const [updateSuccess, setupdateSuccess] =useState(false)
  const dispatch = useDispatch()

// firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    //where to save avatar
    const storageRef = ref(storage,fileName)
    const uploadTask= uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadErro(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setupdateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async ()=>{
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))
    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
      <div className='p-3 max-w-lg mx-auto'> 
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        onChange={(e) => setFile(e.target.files[0])} 
        type='file' ref={fileRef} hidden accept='image/*'/>

        <img
        onClick={()=>fileRef.current.click()} 
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' 
        src={formData.avatar || currentUser.avatar} alt='profile'
        />
        <p className='text-sm self-center'>
          {fileploadError ? 
          (<span className='text-red-700'> Error Image upload(image must be less than 2 mb)
          </span>) :
          filePer > 0 && filePer < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${filePer}%`}
            </span>)
            :
            filePer === 100 ?(
              <span className='text-green-700 '>Image succesfully uploaded!</span>)
              :(
              ''
            )
        }
        </p>
        <input 
        type='text' 
        placeholder='username' 
        defaultValue={currentUser.username}
        id='username' 
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />
        <input 
        type='text' 
        placeholder='email' 
        defaultValue={currentUser.email}
        id='email' 
        className='border p-3 rounded-lg'
        onChange={handleChange}
        />
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'
        onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' :'Update'}
        </button>
        {/* <button className='bg-green-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>create listing</button> */}
      </form>
      <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
        {/* <p className='text-red-700 mt-5'>{ error ? error : ''}</p> */}
        <p className='text-green-700 mt-5'>{ error ? 'user is updated succesfuly' : ''}</p>
    </div>
    // </div>
  )
}
