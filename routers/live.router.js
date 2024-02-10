const express = require('express');
const axios = require('axios');
const moment = require("moment");
const router  = express.Router();
const mongoose = require("mongoose")
const Channel = require("../models/Channels.model.js")
const Pass = require("../models/Pass.model.js")



router.get("/", async (req,res)=> {
    const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority')
    if(connect){
      const channels = await Channel.find()
      res.render("index.ejs", {
        channels,

      })
    }else {
       res.render("index.ejs", {
        channels: null
       })
    }
})

router.get('/live', async function (req,res){
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
          const pass = await Pass.findOne();console.log(pass)
          if(pass){ console.log(req.body.pass)
            if (pass.pass == req.body.pass){
                res.redirect(`/usxmanage/s?pass=${pass.pass}`)
            } else {
                res.render("./live/login.ejs", {
                    pageTitle: "Login", error: "رمز خاطئ"
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
}); router.get('/usxmanage/s', async function(req, res){
    try {
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        if(connect){ const pass = await Pass.findOne(); if(req.query.pass==pass.pass){
            const channels = await Channel.find();
            if(channels){
                res.render("./live/manage.ejs", {
error: null,
pageTitle: "Manage",
cssFile: "manage.css",
channels: channels, pass: pass.pass
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
            pageTitle: "حدث خطا اثناء الاتصال", pass:req.query.pass
        });
    }
})


router.get("/live/:channelId", async (req,res)=> {
   try {
      const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
      if(connect){
         const channel = await Channel.findOne({ _id: req.params.channelId })
         if(channel){
         res.render("./live/match.ejs", {
         pageTitle: channel.name,
         channel: channel,
         error: null
    })} else {
res.render("./live/match.ejs", {
         pageTitle: "خطا",
         channel: null,
         error: "تم حذف السيرفر جرب سيرفر آخر"
    })
    }
      } else {
         res.render("./live/match.ejs", {
         pageTitle: "خطا",
         channel: null,
         error: "فشل الاتصال، تحققق من الانترنت لديك وحاول مرة اخرى لاحقاً"
    })
      }
   }
   catch (error){
      res.render("./live/match.ejs", {
         pageTitle: "خطا",
         channel: null,
         error: "فشل الاتصال، تحققق من الانترنت لديك وحاول مرة اخرى لاحقاً"
   })
   console.log(error)}
})




router.get('/manage/s/edit/:id', async function(req, res){
    try {
        const pass = req.query.pass;
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        
        if (connect) {
            const passDocument = await Pass.findOne({ pass: pass });

            if (passDocument) {
                const channel = await Channel.findById(req.params.id);

                if (channel) {
                    res.render("./live/edit.ejs", {
                        pageTitle: "تحرير القناة",
                        cssFile: "edit.css",
                        channel: channel,
                        pass: pass
                    });
                } else {
                    res.render("./live/manage.ejs", {
                        error: "لم يتم ايجاد السيرفر!",
                        pageTitle: "إدارة القنوات",
                        cssFile: "manage.css",
                        channels: channels,
                        pass: pass
                    });
                }
            } else {
                res.render("./live/manage.ejs", {
                    error: "كلمة مرور خاطئة!",
                    pageTitle: "إدارة القنوات",
                    cssFile: "manage.css",
                    channels: channels,
                    pass: pass
                });
            }
        } else {
            console.error("فشل الاتصال");
        }
    } catch (error) {
        console.error(error);
        res.render("./live/manage.ejs", {
            error: "Failed to connect to DB \n حدث خطا اثناء الاتصال، حاول لاحقا",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "حدث خطا اثناء الاتصال",
            pass: req.query.pass
        });
    }
}); router.get('/manage/s/add', async function(req, res){
    try {
        const pass = req.query.pass;
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        
        if (connect) {
            const passDocument = await Pass.findOne({ pass: pass });
            const channels = await Channel.find()
            if (passDocument) { 
                res.render("./live/add.ejs", {
                    pageTitle: "إضافة سيرفر جديد",
                    cssFile: "add.css",
                    pass: pass
                });
            } else {
                res.render("./live/manage.ejs", {
                    error: "كلمة المرور غير صحيحة!",
                    pageTitle: "إدارة السيرفرات",
                    cssFile: "manage.css",
                    channels: channels,
                    pass: pass
                });
            }
        } else {
            console.error("تعذر الاتصال بقاعدة البيانات");
        }
    } catch (error) {
        console.error(error);
        res.render("./live/manage.ejs", {
            error: "فشل الاتصال بقاعدة البيانات \n حدث خطأ أثناء الاتصال، يرجى المحاولة مرة أخرى",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "فشل الاتصال بقاعدة البيانات",
            pass: req.query.pass
        });
    }
});
router.post('/manage/s/add', async function(req, res){
    try {
        const pass = req.query.pass;
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        
        if (connect) {
            const passDocument = await Pass.findOne({ pass: pass });

            if (passDocument) {
                const { name, link, status, desc, locked, img, featured, cover, type } = req.body;
                
                const newChannel = new Channel({ 
                    name: name,
                    link: link,
                    status: status,
                    desc: desc,
                    locked: locked,
                    img: img,
                    featured: featured,
                    cover: cover,
                    chType: type
                });
                
                await newChannel.save();

                res.redirect(`/usxmanage/s?pass=${pass}`);
            } else {
                res.render("./live/manage.ejs", {
                    error: "كلمة المرور غير صحيحة!",
                    pageTitle: "إدارة السيرفرات",
                    cssFile: "manage.css",
                    channels: channels,
                    pass: pass
                });
            }
        } else {
            console.error("تعذر الاتصال بقاعدة البيانات");
        }
    } catch (error) {
        console.error(error);
        res.render("./live/manage.ejs", {
            error: "فشل الاتصال بقاعدة البيانات \n حدث خطأ أثناء الاتصال، يرجى المحاولة مرة أخرى",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "فشل الاتصال بقاعدة البيانات",
            pass: req.query.pass
        });
    }
});
router.post('/manage/s/edit/:id', async function(req, res){
    try {
        const pass = req.query.pass;
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        
        if (connect) {
            const passDocument = await Pass.findOne({ pass: pass });

            if (passDocument) {
                const channel = await Channel.findById(req.params.id);

                if (channel) {
                    channel.name = req.body.name;
                    channel.link = req.body.link;
                    channel.status = req.body.status;
                    channel.img = req.body.img;
                    channel.desc = req.body.desc;
                    channel.cover = req.body.cover;
                    channel.featured = req.body.featured;
                    channel.locked = req.body.locked;
                    channel.chType = req.body.type

                    await channel.save();
                    res.redirect(`/usxmanage/s?pass=${pass}`);
                } else {
                    res.render("./live/manage.ejs", {
                        error: "القناة غير موجودة!",
                        pageTitle: "إدارة السيرفرات",
                        cssFile: "manage.css",
                        channels: channels,
                        pass: pass
                    });
                }
            } else {
                res.render("./live/manage.ejs", {
                    error: "كلمة المرور غير صحيحة!",
                    pageTitle: "إدارة السيرفرات",
                    cssFile: "manage.css",
                    channels: channels,
                    pass: pass
                });
            }
        } else {
            console.error("تعذر الاتصال بقاعدة البيانات");
        }
    } catch (error) {
        console.error(error);
        res.render("./live/manage.ejs", {
            error: "فشل الاتصال بقاعدة البيانات \n حدث خطأ أثناء الاتصال، يرجى المحاولة مرة أخرى",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "فشل الاتصال بقاعدة البيانات",
            pass: req.query.pass
        });
    }
});

router.get('/manage/s/delete/:id', async function(req, res){
    try {
        const pass = req.query.pass;
        const connect = await mongoose.connect('mongodb+srv://heisenypto:123qwasz@livedbusx.vdflq0d.mongodb.net/?retryWrites=true&w=majority');
        
        if (connect) {
            const passDocument = await Pass.findOne({ pass: pass });

            if (passDocument) {
                const channel = await Channel.findOneAndDelete({ _id: req.params.id });

                if (channel) {
                    const channels = await Channel.find();
                    res.render("./live/manage.ejs", {
                        error: "The Server Deleted!",
                        pageTitle: "Manage Servers",
                        cssFile: "manage.css",
                        channels: channels,
                        pass: pass
                    });
                } else {
                    res.render("./live/manage.ejs", {
                        error: "Channel not found!",
                        pageTitle: "إدارة القنوات",
                        cssFile: "manage.css",
                        channels: channels,
                        pass: pass
                    });
                }
            } else {
                res.render("./live/manage.ejs", {
                    error: "Incorrect password!",
                    pageTitle: "إدارة القنوات",
                    cssFile: "manage.css",
                    channels: channels,
                    pass: pass
                });
            }
        } else {
            console.error("Could not connect to MongoDB");
        }
    } catch (error) {
        console.error(error);
        res.render("./live/manage.ejs", {
            error: "Failed to connect to DB \n حدث خطا اثناء الاتصال، حاول لاحقا",
            cssFile: "manage.css",
            channels: null,
            pageTitle: "حدث خطا اثناء الاتصال",
            pass: req.query.pass
        });
    }
});
module.exports = router;
