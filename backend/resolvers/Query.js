import {makeName, checkChatBox, getChatBox, newChatBox, getPosts, checkUser, getAllUsers} from "./utility.js"
import { ChatBoxModel } from '../db.js';
import bcrypt from "bcryptjs"; 

const Query = {
    async queryChatBox(parent, {name1, name2}, { db }, info){
        // must have name1 and name2
        if (!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        // see if chatBox exist? and return chatBox
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if (!chatBox) 
            chatBox = await newChatBox(db, chatBoxName);
        chatBox = await getChatBox(chatBoxName);

        return chatBox;
    },
    async queryAllPosts(parent, {}, { db }, info){
        // get all posts with populated author 
        let tmp = await getPosts();
        console.log("queryAllPosts", tmp)
        return tmp;
    },
    async queryUser(parent, {username}, { db }, info){
        // use to queryUser details
        let user = checkUser(db, username)
        console.log("after checkUser()")
        if (!user) throw new Error("Missing chatBox name for CreateChatBox");
        return user

    },
    async queryLoginUser(parent, {username, password}, { db }, info){
        // use to authentical user
        if (!username || !password) return {success:false, detail:"no input"}
        console.log("queryLoginUser recevie:", username, password)
        let user = await checkUser(db, username)
        if (!user){
            return{
                success:false,
                detail:"not found user"
            }
        }
        let res = await bcrypt.compare(password, user.password);
        console.log("compare res", res)
        
        if(res){
            return{
                success:true,
                admin:user.admin,
                detail:"cookies"
            }
        }else{
            return {
                success:false,
                admin:user.admin,
                detail:"wrong password"
            }
        }
        

    },
    async queryAllMembers(parent, {}, { db }, info){
        // get all member for Members page
        
        let tmp = await getAllUsers(db);
        console.log("queryAllMembers()", tmp)
        return tmp;
    },
    

}

export default Query;