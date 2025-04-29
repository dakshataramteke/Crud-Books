const mongoose = require("mongoose");

main()
  .then(console.log("Mongo DB Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/RestAC");
}
const BookSchema = new mongoose.Schema({
  book_Name: {
    type: String,
    required: true,
  },
  author: {
    type:String,
    // required: true
  },
  Publish_Date: {
    type: Number,
    min: 0,
  },
  Image: {
    filename: String,
    url: String
  },
  price: {
    type: Number,
    min: 0,
  },
});
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
