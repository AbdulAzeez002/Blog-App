const express=require('express')
const app=express()
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const userRoutes = require("./routes/user/userRoutes");
const categoryRoute = require("./routes/category/categoryRoute");
const postRoutes = require('./routes/post/postRoutes');
const commentRoutes=require('./routes/comment/commentRoutes')
const { errorHandler,notFound } = require("./middlewares/errorHandler");
const cors=require('cors');


dotenv.config()

const PORT=process.env.PORT

//
app.use(cors())

// middleware
app.use(express.json())


//Users route
app.use("/api/users", userRoutes);


//category route
app.use("/api/category", categoryRoute);

// post route

app.use("/api/posts",postRoutes)

// comment route

app.use("/api/comments",commentRoutes)

//err handler
app.use(notFound);
app.use(errorHandler);



app.listen(PORT,console.log(`server listening on ${PORT}`))
