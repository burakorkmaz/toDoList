import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let todayTasks = [];
let workTasks = [];

app.get("/", (req,res) => {
    res.render("index.ejs" ,{
        tasks: todayTasks,
        today : dayNames[new Date().getDay()]
    });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        works : workTasks
    })
})


app.post("/todaysubmit", (req, res) => {
    const newTask = req.body.newItem;
    if (newTask) {
        todayTasks.push(newTask);
    }
    res.redirect("/");

});

app.post("/worksubmit", (req, res) => {
    const newWork = req.body.newItem;
    if (newWork) {
        workTasks.push(newWork);
    }
    res.redirect("/work");

});


app.listen(port, () =>{
    console.log(`Port is : ${port}.`)
});



