const express = require('express');
const path = require('path');
const Book = require('./models/db.js');
const methodOverride = require('method-override');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const BookSchema = require("./BookSchema");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const ValidateBook = (req,res,next)=>{
  const {error} = BookSchema.validate(req.body);
  if(error){
    const message = error.details.map((el)=>el.message).join(",");
    console.log(message);
    return res.status(400).send(message);
  }
  next();
}
app.get("/",async (req,res)=>{
   const allBooks =await Book.find({});
    res.render("index.ejs",{allBooks});
})

app.get("/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/new",upload.single('book[Image]'),ValidateBook, async(req,res)=>{

  let url = req.file.path;
  let filename = req.file.filename;
    console.log(req.file);
    const newBooks = new Book(req.body.book);
    newBooks.Image = {url,filename};
  const Books = await newBooks.save();
  res.redirect("/");

})

// })
app.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const editbooks = await Book.findById(id);
  console.log("Get the books",editbooks);
  res.render("edit.ejs", { editbooks });
});

app.put("/:id/edit", async (req, res) => {
  let { id } = req.params;
  console.log("Put request Data",req.body);

  const UpdateBooks = await Book.findByIdAndUpdate(id, { ...req.body.book }, { new: true });
  console.log(UpdateBooks);
  res.redirect("/");
});
app.delete("/:id/delete",async (req,res)=>{
  let {id} = req.params;
 const DeleteBook =await Book.findByIdAndDelete(id);
 res.redirect("/");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
