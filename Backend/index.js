const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const PORT = process.env.PORT || 7700;
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://codeconverterbymani.netlify.app',
}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("You are on Code converter app")
})


app.post("/convert",async(req,res)=>{
    const {code, language} = req.body;

    let contents = `Please convert the following code snippets into this ${language} language.\n Remember you don't have to debug or tell me anything about the code, you have to only convert the given code into ${language} language and give me that coverted code in markdown language as a response. \n here is my code \n ${code}`;

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

app.post("/debug",async(req,res)=>{
    const {code} = req.body;

    let contents = `Please debug my given code and give me 100% corrected bug free code as well as tell me like what things was wrong and what did you improve.\n Remember You have to give response in markdown language.  \n here is my code \n ${code}`;

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

app.post("/quality",async(req,res)=>{
    const {code} = req.body;

    let contents = `Please provide a code quality assessment for the given code. Consider the following parameters:\n1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting.\n2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations.\n3. Error Handling: Examine the code for proper error handling and graceful error recovery mechanisms.\n4. Code Testability: Evaluate the code for ease of unit testing, mocking, and overall testability.\n5. Code Complexity: Analyze the code for excessive complexity, convoluted logic, and potential code smells.\n6. Code Duplication: Identify any code duplication and assess its impact on maintainability and readability.\n7. Code Readability: Evaluate the code for readability, clarity, and adherence to coding best practices.\nPlease provide a summary of the code quality assessment and a report showing the percentage-wise evaluation for each parameter mentioned above.\n Remember you have to give response in markdown language. \n here is my code \n ${code}`;

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