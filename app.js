const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const app=express();
const https=require("https");
require('dotenv').config()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;

    //inserting data in the mailchimp
    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url=process.env.URL_AND_UNIQUE_ID;  
    const options={
        method:"POST",
        auth:STRING_AND_API_KEY          
    }
    const request = https.request(url,options,function(response)
    {
        if (response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/falure.html");
        }
    })
    request.write(jsonData);
    request.end();
    ////////////////////////////////////////
});

app.post("/falure",function(req,res)
{
    res.redirect("/");
})

let port = process.env.PORT;
if (port == null || port == "") {
port = 3000;
}

app.listen(port,function(){
    console.log("server is running on post 3000");
})
