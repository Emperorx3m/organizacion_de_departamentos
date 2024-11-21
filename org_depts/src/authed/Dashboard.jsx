import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Feautures from '../content/Feautures';
import { config, isAuth } from '../Helpers/Helper';
const base_url = import.meta.env.VITE_BACK_URL;



function Dashboard() {

  const [user, setuser] = useState([])
  const [isAdmin, setisAdmin] = useState('checking');
  const [alldepts, setalldepts] = useState([]);
  const [orgs, setorgs] = useState([])
  const [fellows, setfellows] = useState([])
  const [roles, setroles] = useState([])

  useEffect(() => {
    // console.log('checkk auth')
    if (!isAuth()) { console.log('non auth'); window.location = '/login' };
    axios.get(`${base_url}checkauthuser`, config())
      .then(d => {
        // console.log('usr', d.data)
        setuser(d.data)
        setfellows([d.data])

        if (d.data.role == 'admin') { setisAdmin(true); 
        try {
          setTimeout(() => {
            document.getElementById('filterorg').value = d.data.orgID
          }, 2500);
        } catch (error) {
          
        }
        } else { setisAdmin(false) }
      })
      .catch((e) => { alert('Error loading user data') })
  }, [])

  useEffect(() => {
    var roles_ = roles;

    fellows.forEach(fl => {
      roles_.push(fl.role);
    })
    var rls = [...new Set(roles_)];
    setroles(rls);
  }, [fellows])
  

  const getDepts = () => {
    console.log('calling depts')
    axios.get(`${base_url}getdepts`, config())
      .then(d => {
        // console.log('depts', d.data)
        setalldepts(d.data)
      })
      .catch((e) => { alert('Error loading depts') })
  }

  const getOrgs = () => {
    console.log('calling orgs')
    axios.get(`${base_url}getorgs`, config())
      .then(d => {
        // console.log('orgs', d.data)
        setorgs(d.data)
      })
      .catch((e) => { alert('Error loading orgs') })
  }

  const getfellows = () => {
    console.log('calling fellows')
    axios.get(`${base_url}getfellows`, config())
      .then(d => {
        // console.log('fellows', d.data)
        var datah = d.data;
        datah.unshift(user);
        // console.log('fellows united', datah)
        // setuser(datah)
        setfellows(d.data)
      })
      .catch((e) => { alert('Error loading members') })
  }

  useEffect(() => {
    if (isAdmin !== 'checking') {
      if (isAdmin) {
        getDepts();
        getOrgs()
        getfellows()

      } else {
        getfellows()
      }
    }
  }, [isAdmin])


  const addmmbr = (e) => {
    e.preventDefault();
    var confirm = window.confirm('Are you sure?');
    if (confirm) {
      const username = e.currentTarget.username.value;
      const password = e.currentTarget.password.value;
      const orgID = e.currentTarget.orgID.value
      const fullname = e.currentTarget.fullname.value
      const image = e.currentTarget.image.value
      const deptID = e.currentTarget.deptID.value
      const role = e.currentTarget.role.value

      if (orgID && username && password && fullname && image && deptID && role) {
        const fmdt = {
          username: username,
          password: password,
          orgID: orgID,
          fullname: fullname,
          image: image,
          deptID: deptID,
          role: role,
        }
        axios.post(`${base_url}addMember`, fmdt, config())
          .then(token => {
            alert('member added successfully')
            document.getElementById('addmemberform').reset();
          }
          )
          .catch(err => {
            try {
              alert(err.response.data.message)
            } catch (error) {
              alert('Error occured')
            }
          });
      } else {
        console.log('empty val')
      }
    }

    // console.log('org id',)
  }

  const adddept = (e) => {
    e.preventDefault();
    var confirm = window.confirm('Are you sure?');
    if (confirm) {
      const deptname = e.currentTarget.deptname.value;
      const masterdept = e.currentTarget.masterdept.value;

      if (deptname) {
        var fmdt =
        {
          deptname: deptname,
          masterdept: masterdept
        }
        axios.post(`${base_url}addDept`, fmdt, config())
          .then(token => {
            alert('Department added successfully');
            document.getElementById('adddeptform').reset();
            getDepts();
          }
          )
          .catch(err => {
            try {
              alert(err.response.data.message)
            } catch (error) {
              alert('Error occured')
            }
          });
      } else {
        console.log('empty val', masterdept)
      }

    }

    // console.log('org id',)
  }

  const addORG = (e) => {
    e.preventDefault();
    var confirm = window.confirm('Are you sure?');
    if (confirm) {
      const orgid = e.currentTarget.orgid.value;
      const name = e.currentTarget.orgname.value;

      if (orgid && name) {
        var fmdt =
        {
          orgID: orgid,
          name: name
        }
        axios.post(`${base_url}addOrg`, fmdt, config())
          .then(token => {
            alert('Org added successfully')
            document.getElementById('addorgform').reset();
            getOrgs();
          }
          )
          .catch(err => {
            try {
              alert(err.response.data.message)
            } catch (error) {
              alert('Error occured')
            }
          });
      } else {
        console.log('empty val')
      }

    }

    

    // console.log('org id',)
  }
  
  const orgfilterchnage = (e) => {
      const val =document.getElementById('filterorg').value;
      const dept =document.getElementById('filterdept').value;
      const role =document.getElementById('filterrole').value;
      console.log('val org', val, dept, role)
      const fmdt = {
        orgID: val,
        dept: dept,
        role: role
      }
      document.getElementById('loader_').classList.remove('hidden');
      axios.post(`${base_url}filter`, fmdt, config())
      .then(d => {
        setfellows(d.data)
      document.getElementById('loader_').classList.add('hidden');

      }
      )
      .catch(err => {
      document.getElementById('loader_').classList.add('hidden');

        try {
          alert(err.response.data.message)
        } catch (error) {
          alert('Error occured')
        }
      });

     setTimeout(() => {
      //  document.getElementById('filterorg').value = val;
      //  document.getElementById('filterdept').value = dept;
      //  document.getElementById('filterrole').value = role;
 
     }, 3000);
    }

  return (
    <div className='mt-20'>

      <section id="portfolio" className="py-lg-5 portfolio-agile pt-3 pb-5">
        <div className="container py-lg-5">
          <div className="title-section pb-lg-5 text-center">
            <h4>welcome {user.username} [{user.fullname}]</h4>
            <h3 className="w3ls-title text-uppercase">Organization : {user.orgname}</h3>
            <h3 className="text-uppercase text'sm mt'2">DESIGNATION : {user.role}</h3>
          </div>
          {
            isAdmin && isAdmin !== 'checking' ?
              <div className="row">

                <ul className="nav nav-pills my-3" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active show" id="viewdata-tab" data-toggle="pill" href="#viewdata" role="tab"
                      aria-controls="viewdata" aria-selected="false">VIEW DATA</a>

                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="categorys-tab" data-toggle="pill" href="#categorys" role="tab"
                      aria-controls="categorys" aria-selected="false">ADD MEMBER</a>

                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="org__-tab" data-toggle="pill" href="#org__" role="tab"
                      aria-controls="org__" aria-selected="false">NEW  ORGANIZATION</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="dep_t-tab" data-toggle="pill" href="#dep_t" role="tab"
                      aria-controls="dep_t" aria-selected="false">NEW DEPT.</a>
                  </li>


                </ul>
              </div>
              :
              <div>ME</div>

          }
          <hr style={{ "marginTop": "-20px" }} />


          <div className="container">
            {
              isAdmin && isAdmin !== 'checking' ?
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active clearfix max-w-lgx adminfromsx" id="viewdata" role="tabpanel" aria-labelledby="viewdata-tab">
                  <div className='flex justify-evenly'> 

                  <div className="hidden" id='loader_'><i className="fa fa-spinner fa-spin" aria-hidden="true"></i></div>

                    FILTER BY ORGANIZATION: 
                    <div className="form-groupx mb-4 flex flex-col-reverse">
                       
                        <select id='filterorg' className="border-b focus:border-b" data-blast="borderColor" name="orgID"
                          aria-describedby="masterdept" onChange={orgfilterchnage} >
                          <option value="" className='uppercase'> Select Organization. </option>
                          {
                            orgs.map((org, i) => (
                              <option key={i} className='uppercase' value={org.orgID}> {org.name}-({org.orgID}) </option>
                            ))
                          }
                          

                        </select> </div>
                  </div>
                  
                  
                  <div className='flex justify-evenly'> 

                    FILTER BY DEPARTMENT: 
                    <div className="form-groupx mb-4 flex flex-col-reverse">
                        
                        <select id='filterdept' className="border-b focus:border-b" data-blast="borderColor" name="deptID"
                          aria-describedby="masterdept" onChange={orgfilterchnage} >
                          <option value="" className='uppercase'> Select dept. </option>
                          {
                            alldepts.map((dpt, i) => (
                              <option key={i} className='uppercase' value={dpt.name}> {dpt.name} </option>
                            ))
                          }

                        </select> </div>
                  </div>
                  
                  
                  
                  
                  <div className='flex justify-evenly'> 

                    FILTER BY EXISTING DESIGNATIONS: 
                    <div className="form-groupx mb-4 flex flex-col-reverse">
                        
                        <select id='filterrole' className="border-b focus:border-b" data-blast="borderColor" name="deptID"
                          aria-describedby="masterdept" onChange={orgfilterchnage} >
                          <option value="" className='uppercase'> Select dept. </option>
                          {
                            roles.map((dpt, i) => (
                              <option key={i} className='uppercase' value={dpt}> {dpt} </option>
                            ))
                          }

                        </select> </div>
                  </div>
                  
                  <div className='user__fellowsx'>
                    <Feautures members={fellows} />
                  </div>
                  </div>


                  <div className="tab-pane fade  clearfix max-w-lg adminfroms" id="categorys" role="tabpanel" aria-labelledby="categorys-tab">
                    <form method='post' id='addmemberform' onSubmit={addmmbr}>

                      <h4 className='text-center p-4 '>Add new member</h4>
                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Full name</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="fullname"
                          aria-describedby="" placeholder="James wood" />
                      </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Username</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="username"
                          aria-describedby="Username" placeholder="Username" />
                      </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-xs text-gray-700">Password</label>
                        <input type="password" className="border-b focus:border-b" data-blast="borderColor" name="password"
                          placeholder="Password" />
                      </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Choose Organization</label>
                        <select className="border-b focus:border-b" data-blast="borderColor" name="orgID"
                          aria-describedby="masterdept" >
                          <option value="" className='uppercase'> Select Organization. </option>
                          {
                            orgs.map((org, i) => (
                              <option key={i} className='uppercase' value={org.orgID}> {org.name}-({org.orgID}) </option>
                            ))
                          }

                        </select> </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Choose  department</label>
                        <select className="border-b focus:border-b" data-blast="borderColor" name="deptID"
                          aria-describedby="masterdept" >
                          <option value="" className='uppercase'> Select dept. </option>
                          {
                            alldepts.map((dpt, i) => (
                              <option key={i} className='uppercase' value={dpt.name}> {dpt.name} </option>
                            ))
                          }

                        </select> </div>


                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Designation</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="role"
                          aria-describedby="img url" placeholder="clerk" />
                      </div>



                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">External Image url</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="image"
                          aria-describedby="img url" placeholder="External Image url" />
                      </div>




                      <button id="formsub" data-blast="bgColor" type="submit" className="border w-full p-2">ADD MEMBER</button>

                    </form>
                  </div>


                  <div className="tab-pane fade clearfix max-w-lg adminfroms" id="org__" role="tabpanel" aria-labelledby="org__-tab">
                    <form method='post' id='addorgform' onSubmit={addORG}>

                      <h4 className='text-center p-4 '>Add new ORG.</h4>
                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Org ID (No spaces - will be used when logging in)</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="orgid"
                          aria-describedby="org ID" placeholder="Org007" />
                      </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Organization Name</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="orgname"
                          aria-describedby="Username" placeholder="MY ORG NAME" />
                      </div>

                      <button id="formsub" data-blast="bgColor" type="submit" className="border w-full p-2">ADD ORGANIZATION</button>

                    </form>
                  </div>


                  <div className="tab-pane fade clearfix max-w-lg adminfroms" id="dep_t" role="tabpanel" aria-labelledby="dep_t-tab">
                    <form method='post' id='adddeptform' onSubmit={adddept}>

                      <h4 className='text-center p-4 '>Add new DEPT</h4>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">DEPT NAME</label>
                        <input type="text" className="border-b focus:border-b" data-blast="borderColor" name="deptname"
                          aria-describedby="org ID" placeholder="Dept of justice" />
                      </div>

                      <div className="form-groupx mb-4 flex flex-col-reverse">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-xs text-gray-700">Choose Head dept (Leave blank if not a sub dept)</label>
                        <select className="border-b focus:border-b" data-blast="borderColor" name="masterdept"
                          aria-describedby="masterdept" >
                          <option value=""> Select Head dept. </option>
                          {
                            alldepts.map((dpt, i) => (
                              !dpt.headdept ?
                                (<option key={i} value={dpt.name}> {dpt.name} </option>) : ''
                            ))
                          }

                        </select>
                      </div>

                      <button id="formsub" data-blast="bgColor" type="submit" className="border w-full p-2">ADD DEPT</button>

                    </form>
                  </div>
                </div>
                :
                <div>
                 
                  <div className='user__fellowsx'>
                    <Feautures members={fellows} />
                  </div>
                </div>

            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default Dashboard