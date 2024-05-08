const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = process.env.MONGODB_URL;

const ConnectDb =  () => {
    mongoose.connect(URL);
    mongoose.set("strictQuery",true);

    const connection = mongoose.connection;
    connection.once("open", () => {
        console.log(`Database Connected Successfully!`);
    });
};

module.exports = ConnectDb;
