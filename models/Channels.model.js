const mongoose = require("mongoose")
const channelSchema = new mongoose.Schema({ 
    name: String, 
    status: String,
    link: String,
    img: String,
    locked: String,
    desc: String,
    featured: String,
    cover: String,
    chType: String
});

const Channel = new mongoose.model('Channel', channelSchema);
module.exports = Channel;