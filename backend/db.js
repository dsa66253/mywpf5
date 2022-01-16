import mongoose from 'mongoose';
const Schema = mongoose.Schema

const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  messages: [{
    type: mongoose.Types.ObjectId, 
    ref: "message"
  }]
})
const ChatBoxModel = mongoose.model('chatbox', ChatBoxSchema)

const MessageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  sender: {
    type: String,
    required: [true, 'Name field is required.']
  },
  body: {
    type: String,
    required: [true, 'Body field is required.']
  },
  date:{
    type: String,
  },
  // who have read the message
  read:{
    type: String,
  },
  type:{
    type: String,
  },
  chatBoxName:{
    type: String,
  }

})
// Creating a table within database with the defined schema
const MessageModel = mongoose.model('message', MessageSchema)


const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username field is required.']
  },
  email:{
    type:String
  },
  student:{
    type: String
  },
  password: {
    type: String,
    // required: [true, 'password field is required.']
  },
  picuture:{
    type: String
  },
  online: {
    type: Boolean,
  },
  friends: {
    type: [String], 
  },
  admin:{
    type: Boolean
  },
  interest:{
    type: String
  },
  field:{
    type: String
  },
  skill:{
    type: String
  },
  graduate:{
    type: String
  },
  position:{
    type: String
  },


})
const UserModel = mongoose.model('user', UserSchema)

const PostSchema = new Schema({
  author: {
    type: mongoose.Types.ObjectId, 
    ref: "user"
  },
  title:{
    type: String,
  },
  body:{
    type: String,
  },
  type:{
    type: String,
  },
  date:{
    type: String,
  },
  chatBoxName:{
    type: String,
  },
  
  

})

const PostModel = mongoose.model('post', PostSchema)



export {ChatBoxModel, UserModel, MessageModel, PostModel}