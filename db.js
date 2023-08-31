import mongoose from "mongoose";

const listSchema = {
    type: String,
    content: String
}
const List = mongoose.model("List", listSchema);

export async function newToday(cont){
    const today = new List({
        type: "today",
        content:cont
    });
    try{
        const savedUser = await today.save();
        console.log("user saved: ", savedUser);
    }catch(error){
        console.log("error")
    }
}

export async function newWork(cont){
    const work = new List({
        type: "work",
        content:cont
    });
    try{
        const savedUser = await work.save();
    }catch(error){
        console.log("error")
    }
}

export async function deleteItem(id){
    await List.findByIdAndRemove(id)
    
}

export async function findAll(){
    return List.find()
}