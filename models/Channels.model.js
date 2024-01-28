const mongoose = require("mongoose")
const channelSchema = new mongoose.Schema({ 
    name: String, 
    match: String,
    status: Boolean, 
    provider: String, 
    link: String, 
    status: String  
});

const Channel = new mongoose.model('Channel', channelSchema);
module.exports = Channel;