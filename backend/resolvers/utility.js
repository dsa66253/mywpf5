import { extractExtensionDefinitions } from 'graphql-tools';
import mongoose  from 'mongoose';
import { ChatBoxModel, UserModel, PostModel} from '../db.js';


const makeName = (name1, name2)=>{
    return [name1, name2].sort().join("_");
}


const checkChatBox = (db, chatBoxName, errFunc)=>{
    // console.log("checkChatBox", chatBoxName)
    if(!chatBoxName) 
        throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({name:chatBoxName});
}
const newChatBox = (db, chatBoxName)=>{
    return new db.ChatBoxModel({name:chatBoxName, message:[]}).save();
}

const checkUser = (db, name)=>{
    if(!name){
        throw new Error("Missing user name for" + name);
        console.log("go to db to find data")
    }
    return db.UserModel.findOne({username:name});
}
const newUser = (db, name)=>{
    return new db.UserModel({name: name}).save();
};

const addMessageToChatBox = async (chatBox, message)=>{
    // todo 把populate看懂
    // console.log("message", message)
    chatBox.messages = [...(chatBox.messages), message._id];
    // console.log("chatBox addMessageToChatBox", chatBox)
    await chatBox.save();
    // await ChatBoxModel.
    // findOne({ name: chatBox.name }).
    // populate('messages').
    // exec(function (err, test) {
    //     if (err) 
    //         console.log("Error of population ", err)
    //     console.log("test", test)
    //     console.log("3chatBox.populated(messages)", chatBox.populated("messages"))
    // });
    
    // console.log("after population", chatBox)
    // console.log("messages[0]author", chatBox.messages[0].author)
    // console.log("messages[0]body", chatBox.messages[0].body)
    
}
const getChatBox = async (chatBoxName) => {
    // given string type chatBoxName, return resolve chatBox
    let chatBox = await ChatBoxModel.findOne({ name: chatBoxName }).populate('messages');
    console.log("chatBox ", chatBox);
    return chatBox
} 
const getPosts = async()=>{
    // populate post and return it
    //? return an array and populate it 
    let post = await PostModel.find({}).populate({path:"author"});
    return post;
}
const parsePosts= async (post)=>{
    console.log("post", post)
    return post.map((e)=>{
        console.log("e", e)
        return e.populate("author");
    })

}
const getAllUsers = async (db)=>{
    let tmp = await db.UserModel.find({});
    console.log("qeruyAllUsers()", tmp)
    return tmp ;

}
export{
    getPosts,
    makeName,
    getChatBox,
    checkChatBox,
    checkUser,
    // checkMessage,
    newUser,
    // newMessage,
    newChatBox,
    addMessageToChatBox,
    getAllUsers,
};