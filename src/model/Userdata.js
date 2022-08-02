const mongoose = require('mongoose');  
// mongoose.connect('mongodb://localhost:27017/Library'); 
// mongoose.connect('mongodb://localhost:27017/Library',{useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.connect('mongodb://127.0.0.1:27017/Library',{useNewUrlParser: true,useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://Sia:sarin@cluster0.1ekid0y.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true});
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});
const userSchema = new mongoose.Schema({
    username: String,
    password:String
})

module.exports = mongoose.model('userdata',userSchema);