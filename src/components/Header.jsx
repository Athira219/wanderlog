import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import profile from '../aset/profile.png'
import Profile from './Profile';
import { Link } from 'react-router-dom'


function Header() {
  const [istoken, setaIsToken] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setaIsToken(true)
    }
  }, [])
  console.log('header token =', istoken);

  return (
    <>
      <Navbar expand="lg" className="bg-dark" >
        {/* <Navbar expand="lg" className="fixed-top" style={{ backgroundColor: '#073c45' }}> */}
        <Container>
          <Navbar.Brand >
            <div className='d-flex '>

              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <img className=" rounded rounded-circle me-3 " style={{ display: 'inline' }} width={'40rem'} height={'40rem'} src="data:image/jpeg;base64,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" alt="" />

                <h3 style={{ overflowY: 'hidden', display: 'inline' }} className='text-white'>Wanderlog </h3>

              </Link>
            </div>
          </Navbar.Brand>
          <div className='ms-auto bg-dark'>

            {istoken ?
              <Profile />
              : null
            }
          </div>
        </Container>
      </Navbar>
      {/* <hr /> */}
    </>
  )
}

export default Header
