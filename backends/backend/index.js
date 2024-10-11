const express = require ("express");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require("multer");

const path = require("path");

//import routes
const userouter = require ("./Routes/UserRouter");
const boatrouter = require("./Routes/boatregistationroute");
const requestrouter = require("./Routes/RequestRoutes");
const complaintRoutes = require("./Routes/ComplaintRoutes");
const communityMembersRoute = require('./routes/communityMembers');
const paymentRoute = require('./routes/payment');
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const ticketRoute = require("./routes/ticketRoute");
//supplier
const dashboardRoutes = require('./routes/dashboard');
const orderRoutes = require('./routes/orderRoutes');
const supplierRoutes = require('./Routes/supplierRoutes');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//add fish stock
app.use("/users",userouter);
//boat details
app.use("/boats",boatrouter);
//request
app.use("/requests", requestrouter);
app.use("/file", express.static("file"));
//boat complain
app.use("/complaints", complaintRoutes);
//comunity - employee managment
app.use('/api', communityMembersRoute);
app.use('/api', paymentRoute);
//ticket
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/tickets", ticketRoute);
//supplire
app.use('/api', dashboardRoutes);
app.use('/api', orderRoutes);
app.use('/api', supplierRoutes);

mongoose.connect("mongodb+srv://admin:xJn80IeVCudzfhuH@clusterfisheries.5mn6x.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5005);
})
.catch((err)=> console.log((err)));

// Multer configuration for file uploads
const upl = multer({ dest: "uploads/" });

// Simple file upload route
app.post("/upload", upl.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

//setup multer
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './file');
    },
    filename:function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },

});

//insert model part
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");

const upload = multer({storage})
app.post("/uploadFile", upload.single("file"), async(req, res) => {
    console.log(req.file);
    const name = req.body.name;
    const title = req.body.title;
    const pdf = req.file.filename;
    try{
        await pdfSchema.create({
            name:name,
            title:title,
            pdf:pdf,
        });
        console.log("File uploaded successfully");
        res.send({status:200}); 
    }catch(err){
        console.log(err);
        res.status(500).send({status: "error"});
    }   
    
});

//get model part
app.get("/getFile", async(req, res) => {
    try{
        const data = await pdfSchema.find({});
        res.send({status: 200, data: data});
    }catch(err){
        console.log(err);
        res.status(500).send({status: "error"});
    }
});