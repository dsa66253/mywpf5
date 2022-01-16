import {addMessageToChatBox, checkUser, makeName, checkChatBox, newChatBox} from "./utility.js" 
// import { onLineUserArray, setonLineUserArray } from '../server.js';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs"; 

const Mutation={
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
        // must have name1 and name2
        if (!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        // see if chatBox exist? and return chatBox
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if (!chatBox) 
            chatBox = await newChatBox(db, chatBoxName);
        return chatBox;
    },
    async createUser(parent, {username, email, studentID, password, picture, online}, {db, pubsub}, info){
        // determine user exist or not
        let newUser = await checkUser(db, username, username);
        const saltRounds = 10;
        console.log("checkUser and find", newUser)
        // let passwordHash = await bcrypt.hash(password, saltRounds);
        let passwordHash = password
        // todo unique email
        if(newUser) {
            let createUserResponse = {
                username:username,
                success:false,
                detail:"duplicate username"
            }
            return createUserResponse
        }
        // user not exist and create one
        newUser = new db.UserModel({username, 
            email,
            studentID,
            password: passwordHash,
            picture,
            online,
            admin:false,

            });
        
        newUser.save();
        let createUserResponse = {
            username:username,
            success:true,
            detail:"success"
        }
        // setonLineUserArray((prev)=>(onLineUserArray.indexOf(username)===-1?[...prev, username]:[...prev]))
        // console.log("onLineUserArray: ", onLineUserArray)
        // pubsub.publish(`onlineUser`, {onlineUser:onLineUserArray}
        // //!這邊的格式要與原版的tutorial再確認 
        // //!"onlineUser"的key要與client要求的回傳值一致，但client端的onlineUser要跟schema一致
        // //!所以"onlineUser"的key要與schema的onlineUser 一致
        // );
        console.log("create newUser: ", newUser)
        return createUserResponse;
    },
    async createPost(parent, {author, body, title, type, date}, {db, pubsub}, info){
        let user = await checkUser(db, author)
        if (!user) throw new Error("No this user: " + errFunc);
        console.log("user", user.username)
        let newPost = db.PostModel({
            author:user._id, body, title, type, date
        })
        newPost.save()
        console.log("newPost", newPost)
        return newPost;
    },
    async createMessage(parent, {type, sender, body, date, read, chatBoxName}, {db, pubsub}, info){
        // console.log({type, sender, body, date, read, chatBoxName})
        // create instance of Message
        let newMessage = db.MessageModel({
            type, sender, body, date, read, chatBoxName, _id:new mongoose.Types.ObjectId()
        })

        newMessage.save();
        // search for correspoding chatBox
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if(!chatBox){
            chatBox = await newChatBox(db, chatBoxName);
        }
        chatBox.messages.map(e=>{
            // console.log(e.body)
        })
        // console.log("1chatBox.populated(messages)", chatBox.populated("messages"))
        // add message to correspoding chatBox
        await addMessageToChatBox(chatBox, newMessage);
        chatBox.messages.map(e=>{
            // console.log(e.body)
        })
        // console.log("2chatBox.populated(messages)", chatBox.populated("messages"))
        // // console.log("chatBox after add msg", chatBox)
        // // console.log(newMessage)
        pubsub.publish(`${chatBoxName}`, {
            chatBox: newMessage,
          });
        return newMessage;
    },



}

export default Mutation;