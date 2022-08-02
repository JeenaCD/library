const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

// mongoose.connect('mongodb://localhost:27017/Library');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true});
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    // _id:String,
    bookId : String,
    title : String,
    author: String,
    imageUrl: String,
    about: String
});

const bookdata = mongoose.model('bookdata',BookSchema);
// [bookdata].query({ _id: ObjectId(id) });
module.exports = bookdata;