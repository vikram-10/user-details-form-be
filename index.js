let express=require('express');
let app=express();
let mongo=require('mongodb');
let bodyParser=require('body-parser');
let cors=require('cors');
app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json());

let mongoClient=mongo.MongoClient;
let url=process.env.URL;

app.get("/",async function(req,res){
    try{
        let client=await mongoClient.connect(url)
        console.log("Connected to cluster");
        let db=client.db('user-details');
        console.log("Connected to DB");
        let data=await db.collection('users').find().toArray();
        res.json(data);
    }
    catch(err){
        console.log(err);
    }
})


app.post("/",async function(req,res){
    try{    
        let client=await mongoClient.connect(url)
        console.log("Connected to cluster");
        let db=client.db('user-details');
        console.log("Connected to DB");
        db.collection('users').insertOne(req.body);
        console.log("Elements inserted!");
        client.close();
        console.log("Client closed!");
        res.json({
            "message":"Success"
        });
    }
    catch(err){
        console.log(err);
        res.json({
            "message":"Failure"
        });
    }
});




app.listen(process.env.PORT||4000,function(){
    console.log("Listening on port 4000");
})