const express = require("express");
const connectDB = require("./config/db");
const errorHandeler = require("./middleware/errorMiddleware");
const path = require("path");
const app = express();
const cors= require("cors");  

connectDB();

app.use(cors());
//to get data from req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//user api route
app.use("/v1/api/user", require("./Routes/UserRoute/userRoute"));
app.use("/v1/api", require("./Routes/UserAuth/userAuth"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
app.use(errorHandeler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
