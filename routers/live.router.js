const express = require('express');
const axios = require('axios');
const moment = require("moment");
const router  = express.Router();
const mongoose = require("mongoose")
const Channel = require("../models/Channels.model.js")
const Pass = require("..models/Pass.model.js")
router.get('/live', async function (req,res){
   console.log("hgggg")
    try {
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        if(connect){
            const channels = await Channel.find();
            if(channels){
                res.render("./live/list.ejs", {
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

router.get('/usxlogin', async function (req, res){
   try {
    const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        if(connect){   
                res.render("./live/login.ejs", {
                  error: null,
                  pageTitle: "بث مباريات",
                  cssFile: "login.css",
                })
        } else {
            console.error("could not connect")
        }
   } catch (error) {
    console.log(error)
   }
});
router.post('/usxlogin', async function(req,res){
    try {
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority')
        if(connect){
          const pass = await Pass.findOne();
          if(pass){
            if (pass == req.body.pass){
                res.redirect(`/manage/s?pass=${pass}`)
            } else {
                res.render("./live/login.ejs", {
                    pageTitle: "Login", error: "فشل ايجاد رمز اتصال"
                })
            }
          }
        } else {
            res.render("./live/login.ejs", {
                error: "فشل الاتصال", pageTitle:"Login",
            })
        }
    } catch (error) {
        console.log(error); res.render("./live/login.ejs", {
            pageTitle: "login", error: "فشل الاتصال"
        })
    }
}); router.get('/usxmanage', async function(req, res){
    try {
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        if(connect){ const pass = await Pass.findOne(); if(req.query.pass==pass){
            const channels = await Channel.find();
            if(channels){
                res.render("./live/manage.ejs", {
error: null,
pageTitle: "Manage",
cssFile: "manage.css",
channels: channels
                })
            }} else {
                res.redirect("/usxlogin")
            }
        } else {
            console.error("could not connect")
        }
    } catch (error) {
        res.render("./live/manage.ejs", {
            error: "Failed to connect to DB \n حدث خطا اثناء الاتصال، حاول لاحقا",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "حدث خطا اثناء الاتصال"
        });
    }
})
router.get("/barca", (req,res)=> {
    res.render("./live/match.ejs")
})

module.exports = router;
