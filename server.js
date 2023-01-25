const exp = require("constants");
const express = require("express");
const app = express();


app.use(express.static("./public"));
app.use(express.static("./build"));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${ PORT }`);
});
