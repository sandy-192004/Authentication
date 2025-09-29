const model = require("./model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey"; 


const registerDetail = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const existUser = await model.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new model({
      name:name,
      email:email,
      password: hashedPassword, 
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};



// LOGIN
const loginDetail = async(req,res) => {
    try{
        const { email, password } = req.body;

        const user = await model.findOne({ email });
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({msg:"Invalid password"});
        }

        const token = jwt.sign(
            {  name: user.name, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({msg:"Something went wrong", error: error.message});
    }
}


// DASHBOARD
const dashPage = (req,res) =>{
   
    if(req.user.role === "admin"){
        return res.status(200).json({msg: `Hello Admin ${req.user.name}`});
    } else {
        return res.status(200).json({ msg:`Hello ${req.user.name}`});
    }
}

module.exports = {registerDetail, loginDetail, dashPage};
