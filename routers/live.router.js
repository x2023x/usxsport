const express = require('express');
const axios = require('axios');
const moment = require("moment");
const router  = express.Router();
const mongoose = require("mongoose")
const Channel = require("../models/Channels.model.js")



router.get("/live", async (req,res)=>{
   console.log("hgggg")
    try {
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        if(connect){
            const channels = await Channel.find();
            if(channels){
                res.render("./live/list", {
error: null,
pageTitle: "بث مباريات",
cssFile: "index.css",
channels: channels
                })
            }
        } else {
            console.error("could not connect")
        }
      } catch (error) {
        res.render("./live/list", {
            error: "Failed to connect to DB \n حدث خطا اثناء الاتصال، حاول لاحقا",
            cssFile: "index.css",
            channels: null,
            pageTitle: "حدث خطا اثناء الاتصال"
        });
      }
})

module.exports = router;
