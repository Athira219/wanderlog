import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { baseUrl } from '../service/baseUrl';
import mapImage from '../aset/MapImage.png'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import EditWanderlog from './EditWanderlog';
import { deleteWanderApi } from '../service/allApi';
import { toast } from 'react-toastify';
import { deleteWanderlogContext } from '../context/ContextWanderlog'



function ProjectCard({ wanderlogs, ispresent }) {
  const { deleteWnderlog, setDeleteWanderlog } = useContext(deleteWanderlogContext)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  //---------DELETE WANDERLOG-----//
  const deleteWanderlog = async () => {
    const id = wanderlogs._id
    console.log('delete id=', id);

    const token = sessionStorage.getItem('token')
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`
    }
    const deleteWanderlogPost = await deleteWanderApi(id, header)
    console.log('deleteWanderlogPost=', deleteWanderlogPost);

    if (deleteWanderlogPost.status === 200) {
      toast.success(`${deleteWanderlogPost.data.place} Successfully Deleted`)
      setDeleteWanderlog(deleteWanderlogPost.data)
      // handleDeleteWanderlog()

    } else {
      toast.error('Try again')
    }
  }

  return (
    <>

      <Card className='mt-2 p-3 bg-light' style={{ width: '100%', height: '95%' }}>
        <Card.Img variant="top" src={wanderlogs.wanderlogImage ? `${baseUrl}/uploads/${wanderlogs.wanderlogImage}` : mapImage} />
        <Card.Body>
          <Card.Text>
            <div className='d-flex justify-content-center align-items-center'>
              <h3 className='text-success'>{wanderlogs.place}</h3>
            </div>
              <p className='text-success'>{wanderlogs.date}</p>
            <div className='d-flex'>
              <p style={{ display: 'inline' }} className='text-dark'>

                {wanderlogs.wanderlog.length > 140 ?
                  `${wanderlogs.wanderlog.slice(0, 140)}.....` : wanderlogs.wanderlog}
                {wanderlogs.wanderlog.length > 140 &&
                  (<h6 className='text-success' onClick={handleShow} style={{ textDecoration: 'underline', display: 'inline', cursor: 'pointer' }}>See more</h6>
                  )
                }
              </p>



            </div>
          </Card.Text>
          {ispresent ? <div className='d-flex justify-content-between align-items-center'>
              <EditWanderlog wanderlogs={wanderlogs} />
            <Button variant="success" onClick={() => deleteWanderlog()} ><i class="fa-solid fa-trash text-warning"></i></Button>
          </div> : null
          }
        </Card.Body>
      </Card>





      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className='d-flex justify-content-around align-items-center w-100 '>
            <h3>{wanderlogs.place}</h3>
            <p >{wanderlogs.date}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div >
            <img className='w-100' height={'100%'} src={wanderlogs.wanderlogImage ? `${baseUrl}/uploads/${wanderlogs.wanderlogImage}` : mapImage} alt="" />
            <p>{wanderlogs.wanderlog}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default ProjectCard
