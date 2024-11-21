import React from 'react'

function Banner() {
  return (
    <div id="home" className="banner mb-20" data-blast="bgColor">

     <div className="container-fluid">
                <div className="row banner-row">
                    <div className="col-lg-8 bg-img text-center">
                        <h3 className="agile-title">Build your own Beautiful Website Today.</h3>
                        <div className="bnr-img">
                            <img src="/images/youngbill_empire.png" alt="" className="img-fluid m-auto" />
                        </div>

                    </div>
                    <div className="col-lg-4  my-auto p-0">

                        <div id="flex flex-col justify-center p-4">
                            <div className='uppercase text-2xl ml-5 mt-4'>MERN STACK PROJECT</div>
                            <div className='capitalize text-xl ml-5 mb-4'>organizational depts./sub depts and staff</div>
                            <div id="login-column">
                                <div className="box">

                                    <img src="/images/org2.png" alt="" className="img-fluid m-auto mb-4" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Banner