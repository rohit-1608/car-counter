import mongoose from "mongoose";

async function connect() {
  // const dbUri: string = "mongodb://localhost:27017/car_counter";
  const dbUri: string =
    "mongodb+srv://razerspeed:Pulsar200ns@cluster0.pgoe7mv.mongodb.net/test";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUri);
    console.info("Connected to database");
  } catch (error) {
    console.error("could not connect to database");
    process.exit(1);
  }
}

export default connect;
