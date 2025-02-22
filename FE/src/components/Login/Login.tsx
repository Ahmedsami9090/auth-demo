import { useDispatch, useSelector } from 'react-redux'
import Heading from '../Heading/Heading'
import { reduxStore } from '../../redux/store'
import { userLogin } from '../../redux/loginSlice'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import SubmitBtn from '../SubmitBtn/SubmitBtn'


const Login = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>()
  const { error } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.loginSlice
  })
  const navigate = useNavigate()
  const [btnLoader, setBtnLoader] = useState<boolean>(false)
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        setBtnLoader(true)
        const res = await dispatch(userLogin(val))
        if ('error' in res) {
          toast.error(error.message)
        } else {
          toast.success(`Welcome back`)
          navigate('/')
        }
      } catch (error) {
        toast.error('Unexpected error occurred')
      } finally {
        setBtnLoader(false)
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/, "please enter a valid email format").required(),
      password: yup.string()
        .min(8, "password should be at least 8 char")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/, "password should contains at least one letter, one number and one special char")
        .required()
    })
  })

  return (
    <div className='w-full md:w-1/4'>
      <Heading title='login' />
      <form onSubmit={loginFormik.handleSubmit} className="w-full mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {loginFormik.errors.email && loginFormik.touched.email ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{loginFormik.errors.email}</span></p>
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {loginFormik.errors.password && loginFormik.touched.password ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{loginFormik.errors.password}</span></p>
          </div> : ''}
        </div>
        <SubmitBtn title='Login' btnLoader={btnLoader} />
      </form>
    </div>
  )
}

export default Login