import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { deleteItem, findAll, newToday, newWork } from "./db.js";

const app = express();
const port = 3000;


const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/toDoList", {
  useNewUrlParser: true,
});


app.get("/", async(req,res) => {
    const temp = await findAll({});
    let todayTasks = [];
    temp.forEach(function(element){
        if(element.type === "today"){
            todayTasks.push(element);
        }
    })
    res.render("index.ejs" ,{
        tasks: todayTasks,
        today : dayNames[new Date().getDay()]
    });
});

app.get("/work", async(req, res) => {
    const temp = await findAll({});
    let workTasks = [];
    temp.forEach(function(element){
        if(element.type === "work"){
            workTasks.push(element);
        }
    })
    res.render("work.ejs", {
        works : workTasks
    })
})


app.post("/todaysubmit", (req, res) => {
    const newTask = req.body.newItem;
    if (newTask) {
        newToday(newTask);
    }
    res.redirect("/");

});


app.post("/worksubmit", (req, res) => {
    const temp = req.body.newItem;
    if (temp) {
        newWork(temp);
    }
    res.redirect("/work");

});

app.post("/deleteToday", async(req,res) => {
    const checkedItemId = req.body.checkBox;
    await deleteItem(checkedItemId);
    res.redirect("/")
});

app.post("/deleteWork", async(req,res) => {
    const checkedItemId = req.body.checkBox;
    await deleteItem(checkedItemId);
    res.redirect("work")
})

app.listen(port, () =>{
    console.log(`Port is : ${port}.`)
});



