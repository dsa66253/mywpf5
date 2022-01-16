import {checkChatBox} from "./utility.js"

// todo backend almost done, proceed to frontend 
const Subscription = {
    chatBox:{
        async subscribe(parent, { chatBoxName }, { db, pubsub }, info){

            let chatBox = await checkChatBox(db, chatBoxName, chatBoxName);
            if(!chatBox) throw new Error(`${chatBoxName} not found`);
            return pubsub.asyncIterator(`${chatBoxName}`);
        }
    },
    test:{
        subscribe(parent, {}, { db, pubsub }, info){
            console.log("helo")
            return pubsub.asyncIterator(`heeee`);
        }
    }
}
export { Subscription as default };