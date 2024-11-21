import React, { useEffect } from 'react'
import { isAuth } from '../Helpers/Helper'

function Header({children}) {


    return (
    <>
        <div id="home" className="banner" data-blast="bgColor">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light navbar-fixed-top">
                <div className="container">
                    <h1 className="wthree-logo">
                        <a href="/" id="logoLink" data-blast="color">
                            <img src="/images/logo.png" alt="" className=" w-16 h-12 img-fluid m-auto" />
                        </a>
                    </h1>
                    <div className="nav-item  position-relative">
                        <a href="#menu" id="toggle" onClick={(e) => {
                            e.preventDefault()
                            toggleClass(e.currentTarget, 'on')
                        }}>
                            <span onClick={(e) => {
                                e.preventDefault()
                                toggleClass(e.target, 'on')
                            }}></span>
                        </a>
                        <div id="menu">

                            {
                                isAuth() ?
                                    <ul>
                                        <li><a data-blast="color" href="/dashboard" className="scroll">Dashboard</a></li>
                                        <li><a data-blast="color" href="/logout" className="scroll">Logout</a></li>
                                    </ul>
                                    :

                                    (
                                        <ul><li><a data-blast="color" href="/">Home</a></li>

                                            <li><a data-blast="color" href="#team" className="scroll">Members</a></li>
                                            <li><a data-blast="color" href="#contact" className="scroll">Contact</a></li>

                                            <li><a data-blast="color" href="/login" className="scroll">Sign in</a></li>
                                        </ul>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </nav>

           

        </div>

        {children}

        
       
  
        <footer className="pt-5 " id='contact'>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <h2 className="agile-title"><a href="/" className="text-capitalize" data-blast="color">
                  <img src="/images/logo.png" alt="" className=" w-40 img-fluid m-auto" />
                </a>
                </h2>
              </div>
  
              <div className="col-lg-3 mt-lg-0 my-4">
                <div className="fv3-contact my-3">
                  <span className="fa fa-instagram mr-2" data-blast="color"></span>
                  <p className="text-secondary">@youngbill_empire</p>
                </div>
                <div className="fv3-contact my-3">
                  <span className="fa fa-phone mr-2" data-blast="color"></span>
                  <p className="text-secondary">+234 706 697 1349</p>
                </div>
              </div>
  
            </div>
          </div>
          {/* <!-- //footer --> */}
  <div className="cpy-right text-center py-2" data-blast="bgColor">
    <p className="text-dark">© 2023 Youngbill_Empire. All rights reserved </p>
  </div>
        </footer>
      </>
    )
}

export default Header