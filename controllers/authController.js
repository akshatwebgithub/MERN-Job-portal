import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
        const { name, email, password, lastName } = req.body
        // Validate:-
        if (!name) {
            next("Name is Required")
        }
        if (!email) {
            next("Email is Required")
        }
        if (!password) {
            next("Password is Required and greater than 6 characters")
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            next("Email Already Registered Please Login")
        }
        const user = await userModel.create({name,email,password,lastName})
        // Token:-
        const token = user.createJWT()
        res.status(201).send({
            success:true,
            message:'User Created Successfully',
            user:{
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                location:user.location
            },
            token
        })
}; 

export const loginController = async (req,res,next) => {
    const {email, password} = req.body
    // Validation
    if(!email || !password){
        next('Please Provide all fields')
    }
    // Find user by email:-
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next('Invalid Username or Password')
    }
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid Useraname or password");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(200).json({
      success: true,
      message: "Login SUccessfully",
      user,
      token,
    })
}