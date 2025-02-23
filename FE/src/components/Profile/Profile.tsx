import { useDispatch, useSelector } from "react-redux"
import Heading from "../Heading/Heading"
import { reduxStore } from "../../redux/store"
import { useLayoutEffect } from "react"
import { getProfile } from "../../redux/getProfileSlice"
import { toast } from "react-toastify"
import avatar from '../../assets/avatar.svg'


const Profile = () => {
  const {email, role, id, name} = useSelector((state : ReturnType<typeof reduxStore.getState> )=>{
    return state.getProfileSlice
  })
  const dispatch = useDispatch<typeof reduxStore.dispatch>()
  useLayoutEffect(()=>{
    try {
      dispatch(getProfile())
    } catch (error) {
      toast.error(`${error}`)
    }
  },[])
  
  return (
    <div className="md:w-1/2 w-full">
      <Heading title="profile"/>
      <div className="w-full mx-auto md:mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center py-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt="Bonnie image" />
          <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
          <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">{email}</span>
          <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">{role}</span>
          <span className="text-sm mt-2 text-gray-500 dark:text-gray-400">{id}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile