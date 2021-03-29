const Users = {};
const { json } = require("body-parser");
const UserModel = require("../models/User");
//function
const validateData = (name, lastname, nick, email, phone) => {
  let validate = true,
      valueName=''
      if(name === "" || name==null){
        validate = false;
        valueName='name'
      }else if(lastname === "" || lastname==null){
        validate = false;
        valueName='lastname'
      }else if(nick === "" || nick==null){
        validate = false;
        valueName='nickname'
      }else if(email === "" || email==null){
        validate = false;
        valueName='email'
      }else if ( phone === "" || phone==null ) {
          validate = false;
          valueName='phone'
      }
  return [validate,valueName];
};

//Controllers
Users.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

Users.createUser = async (req, res) => {
  const { name, lastname, nickname, email, phone, photo, isFav } = req.body;
  const validation=await validateData(name, lastname, nickname, email, phone)
  if (validation[0]) {
    const newUser = new UserModel({
      name,
      lastname,
      nickname,
      email,
      phone,
      photo,
      isFav
    });
    const status = await newUser.save();
    let created = {
      id: status._id,
    };
    res.json(created);

  } else {
      console.log(validation[1])
     res.status(400).json(`Error! El dato ${validation[1]} es requerido.`)
  }
};

Users.getUser = async (req, res) => {
  const id = req.params.idUser;
  const user = await UserModel.findById(id);
  res.json(user);
};

Users.updateUser = async (req, res) => {
  const id = req.params.idUser;
  const { name, lastname, nickname, email, phone, isFav } = req.body;
  const validation=validateData(name,lastname,nickname,email,phone)
  if (validation[0]){
      await UserModel.findOneAndUpdate(
        { _id: id },
        {
          name,
          lastname,
          nickname,
          email,
          phone,
          isFav
        }
      );
      res.json({ message: "User Updated" });
  }else{
      res.status(400).json(`Error! El dato ${validation[1]} es requerido.`)
  }

};

Users.deleteUser = async (req, res) => {
  const id = req.params.idUser;
  await UserModel.findOneAndDelete({ _id: id });
  res.status(200).json({ message: "User Deleted" });
};

module.exports = Users;
