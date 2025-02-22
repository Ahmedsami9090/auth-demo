import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <div className='px-5 py-10 flex justify-center items-center'>
        <Outlet />
      </div>
      <div className=''>
        <Footer />
      </div>


    </>
  )
}

export default Layout