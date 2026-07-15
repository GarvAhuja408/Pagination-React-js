import { useState,useEffect } from "react";
import "./Message.css";

export default function Message(){

    let[messages,setMessages]=useState([]);
    let[page,setPage]=useState(1);

    async function getdata(){
        let data = await fetch("https://dummyjson.com/comments");
        let jsondata = await data.json();
        setMessages(jsondata.comments);
    }

    useEffect( ()=>{
        getdata()
    },[]);

    const messageperpage = 10 ;

    const startIndex = (page-1)*messageperpage;

    const endIndex = startIndex + messageperpage;

    const currentMessages = messages.slice(startIndex,endIndex);

    const totalPages = Math.ceil(messages.length / messageperpage);


    return(
        <div>

            <h3 className="heading">Messages</h3>

            {currentMessages.map( (msg)=>(
                <div className="msg" key={msg.id}>

                    <p>{msg.user.fullName}</p>
                    <br></br>
                    <p>{msg.body}</p>
                    
                </div>
            )
            )}
            
            <button disabled ={page===1} onClick={ ()=>{setPage(page-1)}}>Previous</button>

            <span>Page {page} of {totalPages}</span>

            <button disabled ={page===totalPages} onClick={ ()=>{setPage(page+1)} }>Next</button>
        </div>
    )
}