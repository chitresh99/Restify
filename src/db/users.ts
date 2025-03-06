import mongoose, { Mongoose } from "mongoose";

const Userschema = new mongoose.Schema({
    username: {type : String,required:true},
    email:{type:String,required:true},
    authentication :{
    password :{type:String,required:true,select:false},
    //we set selected = false because we wanna avoid fetching the password
    salt:{type:String,select:false},
    sessiontoken:{type:String,select:false}
    },
})

//turning the schema to a model
export const UserModel = mongoose.model('User',Userschema);

//actions to use them in controllers

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email:string) =>UserModel.findOne({email});
export const getUserBySessionToken = (sessiontoken:string) => UserModel.findOne({
    'authentication:sessionToken':sessiontoken
})

export const getUserById = (id:string) => UserModel.findById(id);
export const createUser = (values: Record<string,any>) => new UserModel(values)
    .save().then((user) => user.toObject()); 
export const deleteUserbyId = (id:string) => UserModel.findOneAndDelete({_id:id});
export const updateUserbyId = (id:String, values: Record<string,any>) => UserModel.findByIdAndUpdate(id,values)