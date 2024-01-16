import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateWanderApi } from '../service/allApi';
import { baseUrl } from '../service/baseUrl';
import { updatewanderlogContext } from '../context/ContextWanderlog';

function EditWanderlog({ wanderlogs }) {

    const { updateWanderrlog, setUpdateWanderlog } = useContext(updatewanderlogContext)

    const [wanderlogValue, setWanderlogValue] = useState({
        place: wanderlogs.place,
        date: wanderlogs.date,
        wanderlog: wanderlogs.wanderlog,
        wanderlogImage: ''
    })
    console.log('wanderlogValue=', wanderlogValue);

    //-------CHANGE IMAGE---------//
    const [changeImg, setChangeImg] = useState('')
    useEffect(() => {
        if (wanderlogValue.wanderlogImage) {
            setChangeImg(URL.createObjectURL(wanderlogValue.wanderlogImage))

        }

    }, [wanderlogValue.wanderlogImage])

    console.log('changeImg=', changeImg);


    //----------TOKEN-----------//

    const [token, setToken] = useState('')
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [])
    console.log('token=', token);

    //--------------MODAL FUNCTIONS---------------//

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleCloseTop = () => setShow(false);

    const handleShow = () => setShow(true);

    //---------------UPDATE WANDERLOG-------------//

    const updateWanderlog = async (e) => {
        e.preventDefault()

        const id = wanderlogs._id
        console.log('id=', id);

        const { place, date, wanderlog, wanderlogImage } = wanderlogValue

        if (!place || !date || !wanderlog || !wanderlogImage) {
            toast.info('Fill the Form')
        } else {

            const body = new FormData()


            body.append('place', place)
            body.append('date', date)
            body.append('wanderlog', wanderlog)
            changeImg ? body.append('wanderlogImage', wanderlogImage) : body.append('wanderlogImage', wanderlogImage)

            if (token) {

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
                const editWanderResult = await updateWanderApi(id, body, header)
                console.log('editWanderResult=', editWanderResult);

                if (editWanderResult.status === 200) {
                    setUpdateWanderlog(editWanderResult.data)
                    console.log(editWanderResult.data);
                    toast.success(`${editWanderResult.data.place} Updated Successfully`)

                    handleClose()

                } else {
                    toast.error('Try again')
                    console.log(editWanderResult.response.data);
                    handleClose()
                }
            } else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                const editWanderResult = await updateWanderApi(id, body, header)
                console.log('editWanderResult=', editWanderResult);

                if (editWanderResult.status === 200) {
                    setUpdateWanderlog(editWanderResult.data)
                    console.log(editWanderResult.data);
                    toast.success(`${editWanderResult.data.place} Updated Successfully`)

                    handleClose()

                } else {
                    toast.error('Try again')
                    console.log(editWanderResult.response.data);
                    handleClose()
                }

            }




        }
    }
    return (
        <div>
            {/* <button className='btn btn-dark ms-3' ><i class="fa-solid fa-plus "></i></button> */}
            <Button variant="success" onClick={handleShow} className='text-light rounded' ><i class="fa-solid fa-pen-to-square"></i></Button>
            <Modal show={show} onHide={handleCloseTop}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-white'>Wanderlog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12} md={6}>
                            <label htmlFor="profile">
                                <input id='profile' type="file" onChange={(e) => setWanderlogValue({ ...wanderlogValue, wanderlogImage: e.target.files[0] })} style={{ display: 'none' }} />
                                <img height={'200rem'} width={'200rem'} className='rounded ' src={changeImg ? changeImg : `${baseUrl}/uploads/${wanderlogs.wanderlogImage}`} alt="" />
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
                    <Button variant="success" onClick={updateWanderlog}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </div>
    )
}

export default EditWanderlog
