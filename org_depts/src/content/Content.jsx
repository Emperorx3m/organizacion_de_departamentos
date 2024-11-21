import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import BeforeFooter from './BeforeFooter'
import Feautures from './Feautures'
const base_url = import.meta.env.VITE_BACK_URL;
import { config } from '../Helpers/Helper';

function Content() {

  const [members, setmembers] = useState([])

  useEffect(() => {

      axios.get(`${base_url}getusers`, config)
          .then(d => {
              console.log('users')//, d.data)
              setmembers(d.data)
          })
          .catch((e) => { console.log('Error loading user data') })

  }, []) 

  return (
    <>
      <Banner />
      <div className="title-section pl-6 py-lg-5">
                    <h4>Youngbill_Empire</h4>
                    <h3 className="w3ls-title text-uppercase">A few professionals [DEMO]</h3>
                </div>
      <Feautures members={members} />
      <BeforeFooter />
    </>
  )
}

export default Content