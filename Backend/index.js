const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const PORT = process.env.PORT || 7700;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("You are on Shayri Generator app")
})


app.post("/generate",async(req,res)=>{
    const {input} = req.body;

    let contents = `${input}. \n Remember you have to give me response in markdown language.`;

    axios.post(process.env.APIURL,{
        model: process.env.APIMODEL,
        messages: [
            {
                role:"user",
                content: contents
            }
        ]
    },{
        headers: {
            "Authorization": `Bearer ${process.env.APIKEY}`,
            "Content-Type":"application/json"
        }
    }).then((data)=>{
        res.send(data.data.choices[0].message.content);
    }).catch((err)=>{
        res.status(400).send(err)
    })
})




app.listen(PORT, ()=>{
    console.log("Server is running successfully.");
})
