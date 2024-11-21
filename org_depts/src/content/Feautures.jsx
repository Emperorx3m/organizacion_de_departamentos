import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Feautures({members}) {

    // const [members, setmembers] = useState([])

    // useEffect(() => {

    //     axios.get(`${base_url}getusers`, config)
    //         .then(d => {
    //             console.log('users', d.data)
    //             setmembers(d.data)
    //         })
    //         .catch((e) => { console.log('Error loading user data') })

    // }, [])

    return (
        <section className="pb-sm-5 py-4 team-agile" id="team">
            <div className="container py-md-5">
                {/* <div className="title-section py-lg-5">
                    <h4>Youngbill_Empire</h4>
                    <h3 className="w3ls-title text-uppercase">A few professionals [DEMO]</h3>
                </div> */}
                <div className="d-flex team-agile-row pt-sm-5 pt-3">
                    {
                        members.map((mmb, i) => (

                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="box20">
                                    <img  src={mmb.image} alt="" className="img-fluid object-cover object-top fimg" />
                                    <div className="box-content">
                                        <h3 className="title cpaitalize">{mmb.fullname}</h3>
                                        <span className="post uppercase">{mmb.role}</span>
                                    </div>
                                    <ul className="drop-shadow-2xl icon text-white uppercase w-auto bg-black">
                                        {mmb.orgname} <br /> {mmb.deptID}
                                    </ul>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Feautures