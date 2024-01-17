
import React, { useContext, useEffect } from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap'
import mapImage from '../aset/MapImage.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWanderLogApi } from '../service/allApi';
import { CreateWanderlogContext } from '../context/ContextWanderlog';
import { ThreeDots } from 'react-loader-spinner'


function CreateWanderlog() {
  const { createWanderlogPost, setCreateWanderlogPost } = useContext(CreateWanderlogContext)

  const [loading, setLoading] = useState(false)

  const [wanderlogValue, setWanderlogValue] = useState({
    place: '',
    date: '',
    wanderlog: '',
    wanderlogImage: ''
  })
  console.log('wanderlogValue=', wanderlogValue);
  //-------CHANGE IMAGE---------//
  const [changeImg, setChangeImg] = useState('')
  useEffect(() => {
    wanderlogValue.wanderlogImage &&
      setChangeImg(URL.createObjectURL(wanderlogValue.wanderlogImage))
  }, [wanderlogValue.wanderlogImage])

  console.log('changeImg=', changeImg);


  //----------TOKEN------------//
  const [token, setToken] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])
  console.log('token=', token);

  //-------MODLE SECTION--------//

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setWanderlogValue({
      place: '',
      date: '',
      wanderlog: '',
      wanderlogImage: ''
    })
    setChangeImg('')

  }

  const handleCloseTop = () => setShow(false);

  const handleShow = () => setShow(true);

  //----------ADD WANDERLOG-----------//

  const addwanderlog = async (e) => {
    setLoading(true)
    e.preventDefault()
    const { place, date, wanderlog, wanderlogImage } = wanderlogValue
    if (!place || !date || !wanderlog || !wanderlogImage) {
      toast.info('Fill the Form')
      setTimeout(() => {
        setLoading(false)
      },2000)
    } else {

      const body = new FormData()


      body.append('place', place)
      body.append('date', date)
      body.append('wanderlog', wanderlog)
      body.append('wanderlogImage', wanderlogImage)

      if (token) {

        const header = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
        const addWanderResult = await addWanderLogApi(body, header)
        console.log('addWanderResult=', addWanderResult);

        if (addWanderResult.status === 200) {
          setCreateWanderlogPost(addWanderResult.data)
          console.log('addWanderResult=', addWanderResult.data);
          toast.success(`${addWanderResult.data.place} Successfully Created`)

          handleClose()
          setTimeout(() => {
            setLoading(false)
          },2000)

        } else {
          toast.error('Try again')
          console.log(addWanderResult.response.data);
          handleClose()
          setTimeout(() => {
            setLoading(false)
          },2000)
        }
      }




    }
  }

  return (
    <div>
     <div className='d-flex justify-content-center align-items-center  '>
        <h3 >Add your Post</h3>
        <button className='btn btn-dark ms-3' onClick={handleShow}><i class="fa-solid fa-plus "></i></button>
  
     </div>

      {loading ?
        <div className='d-flex justify-content-center align-items-center w-100' height={'100%'}>
          <ThreeDots
            visible={true}
            height="800"
            width="80"
            color="blue"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />


        </div>


        :

        // <div>
          

          <Modal show={show} onHide={handleCloseTop}>
            <Modal.Header closeButton>
              <Modal.Title className='text-white'>Wanderlog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col sm={12} md={6}>
                  <label htmlFor="profile">
                    <input id='profile' type="file" onChange={(e) => setWanderlogValue({ ...wanderlogValue, wanderlogImage: e.target.files[0] })} style={{ display: 'none' }} />
                    <img height={'200rem'} width={'200rem'} className='rounded ' src={changeImg ? changeImg : mapImage} alt="" />
                  </label>
                </Col>
                <Col sm={12} md={6}>
                  <input type="text" value={wanderlogValue.place} onChange={(e) => setWanderlogValue({ ...wanderlogValue, place: e.target.value })} placeholder='Place' className='form-control w-100 mb-2 bg-light ' />
                  <input type="date" value={wanderlogValue.date} onChange={(e) => setWanderlogValue({ ...wanderlogValue, date: e.target.value })} placeholder='date' className='form-control w-100 mb-2 bg-light' />

                  <textarea value={wanderlogValue.wanderlog} onChange={(e) => setWanderlogValue({ ...wanderlogValue, wanderlog: e.target.value })} name="" id="" cols="24" rows="5" className='form-control bg-light' placeholder='write a wanderlog '></textarea>

                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={addwanderlog}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        
      }
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </div>
  )
}

export default CreateWanderlog
