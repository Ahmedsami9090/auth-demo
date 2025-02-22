import { useDispatch, useSelector } from 'react-redux'
import { userSignup } from '../../redux/signupSlice'
import * as yup from 'yup'
import Heading from '../Heading/Heading'
import { reduxStore } from '../../redux/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import SubmitBtn from '../SubmitBtn/SubmitBtn'

const Signup = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>()
  const { error } = useSelector((state: ReturnType<typeof reduxStore.getState>) => {
    return state.userSignupSlice
  })
  const navigate = useNavigate()
  const [btnLoader, setBtnLoader] = useState<boolean>(false)

  const signupFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeat_password: '',
      name: ''
    },
    onSubmit: async (val) => {
      try {
        setBtnLoader(true)
        const res = await dispatch(userSignup({
          name: val.name,
          password: val.password,
          email: val.email
        }))
        if ('error' in res) {
          toast.error(error.message)
        } else {
          toast.success(`signed up successfully`)
          navigate('/login')
        }
      } catch (error) {
        toast.error('Unexpected error occurred')
      } finally {
        setBtnLoader(false)
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/, "Please enter a valid email format").required(),
      password: yup.string()
        .min(8, "Password should be at least 8 char")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/, "Password should contains at least one letter, one number and one special character")
        .required(),
      name: yup.string()
        .min(3)
        .matches(/^[a-z A-Z]{3,}$/, "Name should not contain numbers or special characters")
        .required(),
      repeat_password: yup.string().oneOf([yup.ref('password')], 'No match').required()
    }),
  })
  return (
    <div className='w-full md:w-1/4'>
      <Heading title='register' />
      <form onSubmit={signupFormik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" id="name" value={signupFormik.values.name} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          {signupFormik.errors.name && signupFormik.touched.name ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{signupFormik.errors.name}</span></p>
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" value={signupFormik.values.email} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {signupFormik.errors.email && signupFormik.touched.email ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{signupFormik.errors.email}</span></p>
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" value={signupFormik.values.password} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {signupFormik.errors.password && signupFormik.touched.password ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{signupFormik.errors.password}</span></p>
          </div> : ''}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="repeat_password" id="repeat_password" value={signupFormik.values.repeat_password} onChange={signupFormik.handleChange} onBlur={signupFormik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
          {signupFormik.errors.repeat_password && signupFormik.touched.repeat_password ? <div>
            <p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">{signupFormik.errors.repeat_password}</span></p>
          </div> : ''}
        </div>
        <SubmitBtn title='Submit' btnLoader={btnLoader} />
      </form>
    </div>
  )
}

export default Signup