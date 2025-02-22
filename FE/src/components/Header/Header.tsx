import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/avatar.svg'
import { useState } from 'react'
import UserDropMenu from '../UserDropMenu/UserDropMenu'
const Header = () => {
    const [clicked, setClicked] = useState<boolean>(false)

    return (
        <>
            <nav className="bg-white border-b-1 border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center w-2/4 space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="md:w-2/12 w-6/12" alt="business Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Business Name</span>
                    </Link>
                    <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse ">
                        <button type="button" onClick={() => setClicked(!clicked)} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full cursor-pointer" src={avatar} alt="user photo" />
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        {clicked && <UserDropMenu setClicked={setClicked} />}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header