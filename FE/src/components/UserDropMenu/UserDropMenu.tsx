import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { reduxStore } from '../../redux/store'
import { clearUserData } from '../../redux/loginSlice'
import { toast } from 'react-toastify'


interface UserDropMenuInt {
    setClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDropMenu = (props: UserDropMenuInt) => {
    const { username, email, isLogged } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
        return state.loginSlice
    })
    const dispatch = useDispatch<typeof reduxStore.dispatch>()
    const handleClick = () => {
        props.setClicked(false)
    }
    const handleSignOut = () => {
        dispatch(clearUserData())
        handleClick()
        toast.success('Signed out successfully')
    }
    return (
        <div className="z-50 absolute md:w-1/12 w-full left-0 top-20 md:left-auto my-3  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{username || ''}</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email || ''}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <Link to="/" onClick={handleClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</Link>
                </li>
                <li>
                    <Link to="/profile" onClick={handleClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                </li>
                <li>
                    <Link to="/login" onClick={handleClick} hidden={isLogged} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</Link>
                </li>
                <li>
                    <Link to="/signup" onClick={handleClick} hidden={isLogged} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Register</Link>
                </li>
                <li>
                    <Link to="/" onClick={handleSignOut} hidden={!isLogged} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                </li>
            </ul>
        </div>
    )
}

export default UserDropMenu