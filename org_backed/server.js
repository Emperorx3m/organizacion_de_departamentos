//import
import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import multer from 'multer';
import cors from 'cors';
import mongoose from "mongoose";
import Users from './models/UsersModel.js'
import Depts from './models/deptsModel.js';
import Orgs from './models/OrgModel.js';
import auth from "./auth/auth.js";

dotenv.config()

//vars

const app = express();
const db_string = process.env.DB_STRING;
const port = process.env.PORT || 3002;
console.log('mongodb', db_string)
//dbconn
mongoose.connect(db_string)
    .then((th) => {
        console.log('##------+++++--------++++++++----##');
        console.log('Konnected to mongodb')
        console.log('##------+++++--------++++++++----##');
    })
    .catch((e) => {
        console.log('#####################################');
        console.log('Mongdb kouldnt connect')
        console.log('#####################################');
    })

mongoose.connection.on('open', () => {
    console.log('MONGODB OPEN-')
})

// mongoose

//middlewares
app.use(cors());
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.status(200).send('BIENVENIDO NEGRO CABRA')
})

app.post("/login", (req, res) => {
    const body = req.body;
    console.log('body', body)
    if (Object.keys(body).length > 0) {
        Users.findOne({ $and: [{ username: body.username }, { orgID: body.orgid }] })
            .then(data => {
                console.log(data.password)
                bcrypt.compare(body.password, data.password)
                    .then((passwordCheck) => {
                        // check if password matches
                        if (!passwordCheck) {
                            return res.status(400).send({
                                message: "Password incorrect",
                            });
                        } else {
                            const token_ = jwt.sign({
                                userid: data._id,
                                username: data.username,
                                role: data.role,
                                org: data.orgID,
                            },
                                process.env.CIPHER_KEY,
                                {
                                    expiresIn: "12h"
                                })

                            res.status(200).send({ token: token_ })
                        }
                    })
                    .catch((e) => {
                        res.status(404).send({ message: "Password error!" });
                    })
            })
            .catch((e) => {
                res.status(404).send({
                    message: "Member not found",
                });
            });
    } else {
        res.status(400).send({ message: "Una error ha occurido, intentalo de nuevo" });
    }

})

const saveDept = (deptname, masterdept, res) => {
    Depts.create({
        name: deptname,
        headdept: masterdept
    })
        .then(data => { res.status(201).send({ message: "Org Created" }) })
        .catch((err) => {
            var errBag = [];
            if (err.errors) {
                const keys_ = Object.keys(err.errors)
                keys_.forEach(e => {
                    var erx = err.errors[e].message;
                    errBag.push(erx)
                })
            } else if (err.keyValue) {
                const keys_ = Object.keys(err.keyValue)
                keys_.forEach(e => {
                    var erx = e + ' Taken already';
                    errBag.push(erx)
                })
            }
            else {
                errBag = err
            }
            res.status(404).send({ message: errBag })
        })
}

app.post('/addDept', auth, (req, res) => {
    const body = req.body
    console.log('adddept', body)
    const deptname = body.deptname
    var masterdept = body.masterdept



    if (deptname && req.user.role == 'admin') {
        if (masterdept) {
            Depts.findOne({ name: masterdept })
                .then(dt => {
                    if (dt.headdept) {
                        res.status(404).send({ message: 'Head department chosen is a sub-department!' })
                    }
                    else {
                        saveDept(deptname, masterdept, res);
                    }
                })
                .catch((e) => {
                    res.status(404).send({ message: 'Head department chosen does not exist!' })
                })
        } else {
            masterdept = null;
            saveDept(deptname, masterdept, res)
        }


    } else {
        res.status(404).send({ message: "Error! Check data and re-submit" })
    }
})

app.post('/addOrg', auth, (req, res) => {
    const body = req.body
    console.log('addorg', body)
    const orgID = (body.orgID)
    const name = body.name;

    if (orgID && name && req.user.role == 'admin') {

        Orgs.create({
            orgID: orgID.replaceAll(" ", ""),
            name: name,
        })
            .then(data => { res.status(201).send({ message: "Org Created" }) })
            .catch((err) => {
                var errBag = [];
                if (err.errors) {
                    const keys_ = Object.keys(err.errors)
                    keys_.forEach(e => {
                        var erx = err.errors[e].message;
                        errBag.push(erx)
                    })
                } else if (err.keyValue) {
                    const keys_ = Object.keys(err.keyValue)
                    keys_.forEach(e => {
                        var erx = e + ' Taken already';
                        errBag.push(erx)
                    })
                }
                else {
                    errBag = err
                }
                res.status(404).send({ message: errBag })
            })

    } else {
        res.status(404).send({ message: "Error! Check data and re-submit" })
    }
})

app.post('/addMember', auth, (req, res) => {
    const body = req.body
    
    const orgID = body.orgID
    const username = body.username
    const password = body.password
    const fullname = body.fullname
    const image = body.image
    const deptID = body.deptID
    const role = body.role
console.log('addmmber',orgID, body)
    //check org and dept
    if (orgID && username && password && fullname && image && deptID && role && req.user.role == 'admin') {
        Orgs.findOne({orgID: orgID})
            .then(org => {
                Depts.findOne({ name: deptID })
                    .then(dpt => {
                        bcrypt.hash(password, 12)
                            .then(passwd => {
                                // console.log('pass encrpt', passwd)
                                Users.create({
                                    orgID: orgID,
                                    username: username.replaceAll(" ", ""),
                                    password: passwd,
                                    fullname: fullname,
                                    orgname: org.name,
                                    image: image,
                                    deptID: deptID,
                                    role: role
                                })
                                    .then(data => { res.status(201).send({ message: "Created" }) })
                                    .catch((err) => {
                                        var errBag = [];
                                        if (err.errors) {
                                            const keys_ = Object.keys(err.errors)
                                            keys_.forEach(e => {
                                                var erx = err.errors[e].message;
                                                errBag.push(erx)
                                            })
                                        } else if (err.keyValue) {
                                            const keys_ = Object.keys(err.keyValue)
                                            keys_.forEach(e => {
                                                var erx = e + ' Exists already';
                                                errBag.push(erx)
                                            })
                                        }
                                        else {
                                            errBag = err
                                        }
                                        res.status(404).send({ message: errBag })
                                    })
                            })
                            .catch((e) => {
                                res.status(404).send({ message: "Error! Password not hashed" })
                            })
                    })
                    .catch((e) => {
                        res.status(404).send({ message: 'department chosen does not exist!' })
                    })
            })
            .catch((e) => {
                console.log('error org', e)
                res.status(404).send({ message: 'Organization does not exist!' })
            })

    } else {
        res.status(404).send({ message: "Error! Check data and re-submit" })
    }
})

app.get('/checkauthuser', auth, (req, res) => {
    const user = req.user;
    // console.log('user auth', user)
    Users.findById(user.userid, { password: 0 }, (err, data) => {
        if (err) { res.status(404).send('Error fetching user details'); }
        else {
            res.status(200).send(data);
        }
    })
})

app.get('/getdepts', auth, (req, res) => {
    const user = req.user;
    // console.log('user auth', user)
    Depts.find({}, { created_at: 0, updated_at: 0, _id: 0 }, (err, data) => {
        if (err) { res.status(404).send('Error fetching depts'); }
        else {
            res.status(200).send(data);
        }
    })
})

app.get('/getorgs', auth, (req, res) => {
    const user = req.user;
    // console.log('user auth', user)
    Orgs.find({}, { created_at: 0, updated_at: 0, _id: 0 }, (err, data) => {
        if (err) { res.status(404).send('Error fetchingorgs'); }
        else {
            res.status(200).send(data);
        }
    })
})


app.get('/getfellows', auth, (req, res) => {
    const user = req.user;
    console.log('ufellowsh', user)
    Users.find({$and: [{orgID: user.org, _id:  {$ne: user.userid}  }] }, { fullname: 1, role: 1, orgname: 1, deptID: 1, image: 1, _id: 0 }, (err, data) => {
        // Users.find({$and: [{orgID: user.org, _id: {$not: {$eq: user.userid}}  }] }, { fullname: 1, role: 1, orgname: 1, image: 1, _id: 0 }, (err, data) => {
        if (err) { res.status(404).send('Error getting fellows'); }
        else {
            res.status(200).send(data);
        }
    })
})

app.post('/filter', auth, (req, res) => {
    const body = req.body;
    console.log('filter', body);
    const orgID = (body.orgID) || req.user.org;
    const dept = (body.dept);
    const role = (body.role);

    var ao = {orgID: orgID }
    var aor = {$and: [{orgID: orgID, role: role  }] }
    var aod = {$and: [{orgID: orgID, deptID: dept  }] }
    var aord = {$and: [{orgID: orgID, role: role, deptID: dept  }] }

    var query = (orgID && !dept && !role) 
    ? 
    ao 
    : (
        (orgID && !dept && role) 
    ? 
    aor
    : (
        (orgID && dept && !role) 
    ? 
    aod
    : (
        (orgID && dept && role) 
    ? 
    aord
    : ao
    )
    )
    )
    ;
 
    console.log('query is', query);

    if (req.user.role == 'admin') {

        Users.find(query, (err, data) => {
            
            if (err) { res.status(404).send('Error getting fellows'); }
            else {
                console.log('data filt')
                res.status(200).send(data);
            }
        })

    } else {
        res.status(404).send({ message: "Error! Check data and re-submit" })
    }
})

app.get('/getusers', (req, res) => {
    console.log('users')
    Users.find({}, { fullname: 1, role: 1, orgname: 1, image: 1, _id: 0 }, (err, data) => {
        if (err) { res.status(404).send('Error fetchingorgs'); }
        else {
            res.status(200).send(data);
        }
    }).skip(1).limit(3)
})

//listener
app.listen(port, () => {
    console.log(`We liznin on port ${port}`);
})