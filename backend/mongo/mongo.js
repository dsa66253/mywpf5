import mongoose from "mongoose";

function connectMongo() {
  console.log("in function connectMongo process.env.MONGO_URL:", process.env.MONGO_URL)
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo Connected!");
  });
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
