import React, { useEffect } from 'react'
import axios from 'axios';
import { login_ } from '../Helpers/Helper';
const base_Url = import.meta.env.VITE_BACK_URL;

console.log('back url', base_Url)
function Login() {

  const formsub = (e) => {
    e.preventDefault();
    const orgid = e.currentTarget.orgid.value;
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    if (orgid && username && password) {
      login_(orgid, username, password)
        .then(token => {
          window.location = '/dashboard'
        }
        )
        .catch(err => alert(err));
    } else {
      console.log('empty val')
    }


    // console.log('org id',)
  }


  return (
    <div className='flex justify-center items-center min-w-screen min-h-fit mt-20'>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg">
        <form method='post' className='w-96' onSubmit={formsub}>

          <h4 className='text-center p-4 '>Sign in to your Organization</h4>
          <div className="form-group mb-6 flex flex-col-reverse">
            <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Organization ID</label>
            <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="orgid"
              aria-describedby="org ID" placeholder="Org ID" />
          </div>

          <div className="form-group mb-6 flex flex-col-reverse">
            <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Username</label>
            <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="username"
              aria-describedby="Username" placeholder="Username" />
          </div>

          <div className="form-group mb-6 flex flex-col-reverse">
            <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-xs text-gray-700">Password</label>
            <input type="password" className="border-b focus:border-b" data-blast="borderColor" name="password"
              placeholder="Password" />
          </div>


          <button id="formsub" data-blast="bgColor" type="submit" className="border w-full p-2">Sign in</button>

        </form>
      </div>
    </div>
  )
}

export default Login

