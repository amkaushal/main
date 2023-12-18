const usersDB = {
    users: require ('../models/employee.json'),
    setUsers: function (data) {this.users = data}
}

const path = require ('path')
const fsPromises = require('fs').promises
const bcrypt = require ('bcrypt')

const handleNewUser = async(req,res)=>{
    const {username, pwd} = req.body;
    if (!username || !pwd) return res.status(400).json({'message':'Username and password required'});
    // check for duplicate usernames
    const duplicate = usersDB.users.find(person => person.username === username)
    if (duplicate) return res.status(409).json({'message':'Username exists'})
    try{
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = {
            username,
            pwd:hashedPwd
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname,'..', 'models', 'employee.json'), JSON.stringify(usersDB.users));
        res.status(201).json({'message': `New user ${username} created`})
        console.log(usersDB.users)
    }catch(err){
    console.log(err)
}
}

module.exports = {handleNewUser};