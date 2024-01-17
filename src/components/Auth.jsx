import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { wanderLoginApi, wanderRegister } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthContext } from '../context/ContextWanderlog';
import { ThreeDots } from 'react-loader-spinner'
import validator from 'validator';






function Auth({ register }) {
  const { authWanderlog, setAuthWanderlog } = useContext(isAuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // const [email, setEmail] = useState("");

  const [registerValue, setRegisterValue] = useState({
    username: '',
    email: '',
    password: ''

  })
  console.log('registerValue=', registerValue);

  //----------------------register function----------------//
  const wanderRegisterFunction = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { username, email, password } = registerValue



    if (!username || !email || !password) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      toast.info('Fill the Form')
    }
    else if (!validator.isEmail(email)) {
      // setEmail('Invalid Email')
      toast.error('Invalid Email')
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
    else {

      const registerResult = await wanderRegister(registerValue)
      console.log('registerResult=', registerResult);
      if (registerResult.status === 200) {
        setTimeout(() => {
          setLoading(false)
        }, 2000)

        toast.success(`${registerResult.data.username} Registed `)
        setRegisterValue({
          username: '',
          email: '',
          password: ''
        })
        navigate('/login')
      } else {
        toast.error(`${registerResult.response.data}`)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    }
  }

  //--------------------------login section---------------------//

  const wanderLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password } = registerValue
    if (!email || !password) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
      toast.info('Fill the Form')
    } 
    // else if (!validator.isEmail(email)) {
    //   // setEmail('Invalid Email')
    //   toast.error('Invalid Email')
    //   setTimeout(() => {
    //     setLoading(false)
    //   }, 2000)
    // }
     else {
      const loginResult = await wanderLoginApi(registerValue)
      console.log('loginResult=', loginResult);
      if (loginResult.status === 200) {
        setTimeout(() => {
          setLoading(true)
        }, 2000)
        sessionStorage.setItem('existLoginUser', JSON.stringify(loginResult.data.existLoginUser))
        sessionStorage.setItem('token', loginResult.data.token)
        toast.success('Login Successfully')
        setAuthWanderlog(true)
        setRegisterValue({
          email: '',
          password: ''
        })
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        setTimeout(() => {
          setLoading(false)
        }, 2000)
        toast.error(`${loginResult.response.data}`)
      }
    }

  }
  return (
    <>
      {loading ? <div className='d-flex justify-content-center align-items-center w-100' height={'100%'}>
        <ThreeDots
          visible={true}
          height="800"
          width="80"
          color="white"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />


      </div> :
        <div class="container-fluid">
          <img height={'700rem'} className='w-100 ' src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className=' p-5 mt-5 rounded shadow'>
              <div className='row d-flex align-items-center'>
                <div className='col-sm-12  w-100'>
                  {register ? <h1 className='text-success text-center mb-5'>SIGN UP</h1>
                    : <h1 className='text-success text-center mb-5'>SIGN IN</h1>}
                  <form >
                    {register &&
                      <input type="text" value={registerValue.username} onChange={(e) => setRegisterValue({ ...registerValue, username: e.target.value })} className='form-control bg-light w-100 mb-3' placeholder='Enter Username' />
                    }
                    <input type="email" value={registerValue.email} onChange={(e) => setRegisterValue({ ...registerValue, email: e.target.value })} className='form-control bg-light w-100 mb-3' placeholder='Enter Email' />
                    <input type="password" value={registerValue.password} onChange={(e) => setRegisterValue({ ...registerValue, password: e.target.value })} className='form-control bg-light w-100 mb-3' placeholder='Enter Password' />
                    {register ?
                      <div>
                        <button className='btn btn-success w-100' onClick={wanderRegisterFunction}>Register</button>
                        <p className='text-light mt-3'>Already a User ?Click here to <Link className='text-white' to={'/login'} style={{ textDecoration: 'underline' }}>Login</Link></p>

                      </div>
                      : <div>
                        <button className='btn btn-success w-100' onClick={wanderLogin}>Login</button>
                        <p className='text-light mt-3'>New User ?Click here <Link className='text-white' to={'/Register'} style={{ textDecoration: 'underline' }}>Register</Link></p>
                      </div>}

                  </form>

                </div>

              </div>


            </div>
          </div>
        </div>}
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default Auth
