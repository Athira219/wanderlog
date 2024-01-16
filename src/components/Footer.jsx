import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <hr />
            <div className='container-fluid shadow '>
                <div className='container-fluid py-5'>


                    <Row >

                        <Col sm={12} md={6} lg={3}>
                            <h2 >Our Service</h2>
                            <ul className='list-unstyled'>
                                <li><Link to='/Register' className='text-decoration-none fs-4'>Register</Link></li>
                                <li><Link to='/login' className='text-decoration-none fs-4'>Login</Link></li>
                                <li><Link to='/' className='text-decoration-none fs-4'>Home</Link></li>
                                <li><Link to='/' className='text-decoration-none fs-4'>project</Link></li>
                            </ul>

                        </Col>
                        <Col sm={12} md={6} lg={3}>

                            <h2 >Guides</h2>
                            <ul className='list-unstyled'>
                                <li><a href='https://bootswatch.com/' className=' text-decoration-none fs-4'>React</a></li>
                                <li><a href='https://react-bootstrap.netlify.app/' className=' text-decoration-none fs-4'>React Bootstrap</a></li>
                                <li><a href='https://bootswatch.com/' className=' text-decoration-none fs-4'>React Watch</a></li>
                            </ul>

                        </Col>
                        <Col sm={12} md={6} lg={5} >
                            <h3 className='mb-4 ' >
                                Subscribe to our newsletter to stay in touch with the latest
                            </h3>
                            <div className='border mt-1 mb-1 d-flex align-items-center w-75' style={{ borderRadius: '20px' }}>
                                <input className='bg-dark flex-grow-1 ms-2 mt-1 mb-1 p-2 text-light' style={{ outline: 'none', border: 'none', borderRadius: '20px' }} placeholder='Your email address' type="text" />
                                <button className='btn btn-light rounded-circle '><i className="fas fa-envelope"></i></button>
                            </div>

                        </Col>
                        <p className='d-flex justify-content-center align-items-center mt-4'>Copyright &#64; 2024 Wander log Built with React.</p>
                    </Row>


                </div>

            </div>
        </>
    )
}

export default Footer
