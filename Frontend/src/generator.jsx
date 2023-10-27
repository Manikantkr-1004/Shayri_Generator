import React, { useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from "axios";
import copyTextToClipboard from '@uiw/copy-to-clipboard';

export function Generator() {
    
    const [input,setInupt] = useState("");
    const [result,setResult] = useState("```\nPlese Type in Input to Generate.\nYou can Generate Anything whatever you want.\n```");
    const [loading,setLoading] = useState(false);

    const handleGenerate = ()=>{
        if(input===""){
            alert("Please type Anything to Generate");
            return;
        }
        if(loading){
            alert("Please wait for response");
            return;
        }

        setLoading(true);

        axios.post("https://generator-fb3g.onrender.com/generate",{input})
        .then((res)=>{
            setResult(res.data)
            setLoading(false);
            setInupt("");

        }).catch((err)=>{
            alert("something went wrong, refresh and try again!!")
            setLoading(false);
        })
    }

    const handleCopy = ()=>{
        copyTextToClipboard(result, (isCopy) => {
            console.log('isCopy:', isCopy);
        });
        alert("Copied Successfully!!")
    }

    const handleShare = ()=>{
        window.open(`https://api.whatsapp.com/send/?text=${result}`,"_blank")
    }

    return (
        <div style={{width:"100%"}}>
            <div style={{width:"100%",height:"90vh",overflow:"auto"}}>
                <div style={{color:"black",width:"80%",margin:'auto',marginTop:"15px",marginBottom:"15px"}}>
                    <MarkdownPreview source={result} />
                    {result!=="```\nPlese Type in Input to Generate.\nYou can Generate Anything whatever you want.\n```" && 
                    <div style={{marginTop:"15px",background:"#d8d8d8",width:"70px",margin:"auto",display:"flex",justifyContent:"space-between",gap:"5px",padding:"10px 20px",borderRadius:"5px"}}>
                        <img onClick={handleCopy} style={{cursor:"pointer"}} width="20px" src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png" alt="copy" />
                        <img onClick={handleShare} style={{cursor:"pointer"}} width="20px" src="https://www.shareicon.net/data/512x512/2015/10/17/657498_arrow_512x512.png" alt="share" />
                    </div>}
                </div>
            </div>
            <div style={{width:"100%",height:"10vh",position:"fixed",bottom:"0px",border:"2px solid black",display:"flex",justifyContent:"space-between"}}>
                <input value={input} onChange={(e)=> setInupt(e.target.value)} style={{width:"80%",height:"100%"}} type='text' placeholder='Generate Shayri/Quotes/Joke/Story & More....' />
                <button onClick={handleGenerate} style={{width:"20%",height:"100%",outline:"none",cursor:"pointer",fontWeight:"bold"}}>{loading?"Loading...":"Generate..."}</button>
            </div>
        </div>
    )
}
