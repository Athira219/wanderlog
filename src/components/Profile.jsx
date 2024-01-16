import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../service/baseUrl';

// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfileApi } from '../service/allApi';
import { isAuthContext } from '../context/ContextWanderlog';

function Profile() {
  const {authWanderlog,setAuthWanderlog} = useContext(isAuthContext)
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const [profileValue, setProfileValue] = useState({
    username: '',
    bio: '',
    profile: ''
  })

  const [changeProfile, setChangeProfile] = useState('')

  useEffect(() => {
    const existLoginUser = JSON.parse(sessionStorage.getItem('existLoginUser'))
    console.log('existLoginUser=', existLoginUser);
    setProfileValue({ ...profileValue, username: existLoginUser.username, bio: existLoginUser.bio, profile: '' })
    setChangeProfile(existLoginUser.profile)
  }, [])

  console.log('changeProfile=', changeProfile);

  const [preview, setPreview] = useState('')
  useEffect(() => {
    if (profileValue.profile) {
      setPreview(URL.createObjectURL(profileValue.profile))
    } else {
      setPreview('')
    }

  }, [profileValue.profile])

  console.log('preview=', preview);




  // console.log('profileValue=',profileValue);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateWanderlog = async () => {

    const { username, bio, profile } = profileValue
    if (!username || !bio || !profile) {
      toast.info('Fill the Form')

    } else {
      const body = new FormData()

      body.append('username', username)
      body.append('bio', bio)
      preview ? body.append('profile', profile) : body.append('profile', profile)

      const token = sessionStorage.getItem('token')
      console.log('profile token=', token);
      if (token) {
        const header = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
        const updateWanderlogProfile = await updateProfileApi(body, header)
        console.log('updateWanderlogProfile', updateWanderlogProfile);
        if (updateWanderlogProfile.status === 200) {
          sessionStorage.setItem('existLoginUser',JSON.stringify(updateWanderlogProfile.data))

          toast.success('update sucessfully')
          handleClose()
        } else {
          toast.error('Try again')
          handleClose()
        }
      } else {
        const header = {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
        const updateWanderlogProfile = await updateProfileApi(body, header)
        console.log('updateWanderlogProfile', updateWanderlogProfile);
        if (updateWanderlogProfile.status === 200) {
          sessionStorage.setItem('existLoginUser',JSON.stringify(updateWanderlogProfile.data))
          toast.success('update sucessfully')
          handleClose()
          
        } else {
          toast.error('Try again')
          handleClose()
        }
      }

    }

  }

  const wanderlogLogOut = ()=>{
    
    sessionStorage.removeItem('existLoginUser')
    sessionStorage.removeItem('token')
    handleClose()
    
     navigate('/')
    
    window.location.reload()
    setAuthWanderlog(false)
  }



  return (
    <>


      {changeProfile === '' ?
        <img height={'60rem'} className='rounded' onClick={handleShow} src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png' alt="" />
        : <img height={'60rem'} width={'60rem'} className='rounded-circle ' onClick={handleShow} src={preview ? preview : `${baseUrl}/uploads/${changeProfile}`} alt="" />
               
}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="profile">
                <input onChange={(e) => setProfileValue({ ...profileValue, profile: e.target.files[0] })} id='profile' type="file" style={{ display: 'none' }} />
                {changeProfile === '' ?
                  <img height={'200rem'} width={'200rem'} className='rounded ' onClick={handleShow} src={preview ? preview : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'} alt="" />
                  : <img height={'200rem'} width={'200rem'} className='rounded ' onClick={handleShow} src={preview ? preview : `${baseUrl}/uploads/${changeProfile}`} alt="" />
                }
              </label>
            </Col>
            <Col sm={12} md={6}>
              <input type="text" value={profileValue.username} onChange={(e) => setProfileValue({ ...profileValue, username: e.target.value })} placeholder='Username ' className='form-control w-100 bg-light' />
              <textarea value={profileValue.bio} onChange={(e) => setProfileValue({ ...profileValue, bio: e.target.value })} className='bg-light form-control mt-2 ' placeholder='Enter Bio' name="" id="" cols="30" rows="5"></textarea>
              <Link to={'/Register'}><button className='btn btn-success w-100 mt-2'>Add Account</button></Link>
              <button onClick={wanderlogLogOut} className='btn btn-success w-100 mt-2'>Log Out <i class="fa-solid fa-power-off ms-2"></i></button>

            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={updateWanderlog}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default Profile
