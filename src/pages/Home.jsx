import React, { useEffect, useState } from 'react'
import home from '../aset/wanderlog-home.jpg'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ProjectCard from '../components/ProjectCard'
import { allWanderlogApi } from '../service/allApi'



function Home() {
  const [islogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setIsLogin(true)
    }
  }, [])

  const [allwander, setAllWander] = useState([])

  let allWanderlogPost = async () => {
    const wanderLogPost = await allWanderlogApi()
    console.log('wanderLogPost=', wanderLogPost.data)
    setAllWander(wanderLogPost.data)
  }
  useEffect(() => {
    allWanderlogPost()
  }, [])
  console.log('allwander=', allwander);



  console.log('islogin=', islogin);
  return (
    <>
      <Header />
      <div className='w-100 bg-white ' style={{ minHeight: '100vh' }}>
        <div className='container-fluid '>
          <Row className='align-items-center '>
            <Col sm={12} md={6}>
              <div className='container mt-3 mb-3'>
                <h1 className='ms-5 text-dark mb-4' style={{ overflow: 'hidden' }}>The <span className='text-success'>World</span> <br /> is Yours to Explore</h1>
                {islogin ?
                  <Link to={'/dashboard'}><button className='btn btn-dark p-3 ' style={{ marginLeft: '5rem' }}>Let's Content your Wander<i class="fa-solid fa-earth-americas ms-3"></i></button></Link>
                  : <Link to={'/login'}><button className='btn btn-success ' style={{ marginLeft: '5rem' }}>Let's Explore<i class="fa-solid fa-angle-right ms-3"></i></button></Link>
                }
              </div>
            </Col>
            <Col sm={12} md={6}>
              <img className='img-fluid ' src={home} alt="no img" />
            </Col>
          </Row>

        </div>
      </div>
      <div className='shadow  w-100 container  mb-5  p-3' style={{ minHeight: '100vh' }}>

        {islogin ?
          <Row >
            {allwander?.length > 0 ?
              allwander.map((item) => (
                <Col sm={12} md={6} lg={4}>
                  <ProjectCard wanderlogs={item} />

                </Col>
              ))
              : null
            }

          </Row>
          :
          <Row>
            <Col sm={12} md={7}>


              <iframe className='rounded' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30770369.156222757!2d60.814647382537174!3d19.70629751111203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1704788399452!5m2!1sen!2sin" width={"100%"} height={"100%"} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

            </Col>
            <Col sm={12} md={5}>
              <marquee width="100%" direction="left" height="100%">
                <div >
                  <Card className='shadow mb-3 mt-2 bg-light text-dark' style={{ width: '23rem' }}>
                    <Card.Body className='text-dark'>
                      <Row>
                        <Col sm={12} md={9}><Card.Title>India</Card.Title>
                          <Card.Text >The Crown of the Palace</Card.Text></Col>
                        <Col sm={12} md={3}> <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/250px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg" /></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className='shadow mb-3 text-dark bg-light' style={{ width: '23rem' }}>
                    <Card.Body >
                      <Row>
                        <Col sm={12} md={9}><Card.Title>China</Card.Title>
                          <Card.Text>The Great wall of china</Card.Text></Col>
                        <Col sm={12} md={3}> <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOB55BJ1nEpe9OoR4ddtQ_o7S5MtkdSBMGOb6ISmwKJLnoXnDyU3Mhsf__0FkiNffiwk&usqp=CAU" /></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className='shadow mb-3 text-dark bg-light' style={{ width: '23rem' }}>
                    <Card.Body>
                      <Row>
                        <Col sm={12} md={9}><Card.Title>Egypt</Card.Title>
                          <Card.Text>The Giza pyramid   in Egypt</Card.Text></Col>
                        <Col sm={12} md={3}> <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pyramids_of_the_Giza_Necropolis.jpg/1920px-Pyramids_of_the_Giza_Necropolis.jpg" /></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className='shadow mb-3 text-dark bg-light' style={{ width: '23rem' }}>
                    <Card.Body>
                      <Row>
                        <Col sm={12} md={9}><Card.Title>Paris</Card.Title>
                          <Card.Text>The Eiffel Tower in Paris</Card.Text></Col>
                        <Col sm={12} md={3}> <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2018/04/25/09/26/eiffel-tower-3349075_1280.jpg" /></Col>
                      </Row>
                    </Card.Body>
                  </Card>

                </div>
              </marquee>

            </Col>
          </Row>
        }




      </div>





    </>
  )
}

export default Home
