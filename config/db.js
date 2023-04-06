const mongoose = require("mongoose");
const MONGO_DB = process.env.MONGO_DB;
//promise
const databaseInstance = () => {
  mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("Database connected".blue.underline)}).catch((err)=>{console.log(err).red.underline});
}



module.exports = databaseInstance;
