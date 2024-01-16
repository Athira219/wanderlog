import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import CreateWanderlog from '../components/CreateWanderlog';
import { Col, Row } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import Card from 'react-bootstrap/Card';

import mapImage from '../aset/MapImage.png'
import { userWanderlogPost } from '../service/allApi';
import { CreateWanderlogContext, deleteWanderlogContext, updatewanderlogContext } from '../context/ContextWanderlog'



function Dashboard() {
  const { deleteWnderlog, setDeleteWanderlog } = useContext(deleteWanderlogContext)
  const { updateWanderrlog, setUpdateWanderlog } = useContext(updatewanderlogContext)
  const { createWanderlogPost, setCreateWanderlogPost } = useContext(CreateWanderlogContext)
  const [userWanderlogState, setUserWanderlogState] = useState([])

  const userWanderlog = async () => {
    const token = sessionStorage.getItem('token')
    console.log(token);

    const Header = {
      'Content-Type': 'application/json',
      'Authorization': `$bearer ${token}`
    }
    const userWanderlogResult = await userWanderlogPost(Header)
    console.log('userWanderlogResult =', userWanderlogResult.data);

    setUserWanderlogState(userWanderlogResult.data)


  }
  useEffect(() => {
    userWanderlog()

  }, [deleteWnderlog, updateWanderrlog, createWanderlogPost])
  console.log('userWanderlogState=', userWanderlogState);




  return (
    <div >
      <Header />


      <div className='shadow p-5 container rounded mt-5 w-100 bg-white text-dark'>
        <div className='d-flex align-items-center justify-content-center '>
          <h3 >Add your Post</h3>
          <CreateWanderlog />
        </div>
        <div className='bg-dark mt-5 container-fluid  rounded shadow' >
          <Row>
            {userWanderlogState?.length > 0 ?
              userWanderlogState?.map((item) => (

                <Col xs={12} sm={6} md={4}>
                  <ProjectCard wanderlogs={item} ispresent={true} />
                </Col>
              ))

              : null}

          </Row>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
