const app = require("express")();
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const port = process.env.PORT || 4040;
const url =
  "mongodb+srv://admin:admin@quikr.cdfjx.mongodb.net/Quikr?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let dataUser = await db
      .collection("Login")
      .find({ Email: req.body.Email })
      .toArray();
    await client.close();

    bcrypt.compare(req.body.Password, dataUser[0].Password1, function (
      err,
      result
    ) {
      console.log("Result", result);
      res.send({ result, dataUser });
    });
  } catch (err) {
    res.status(500).send("Something broke!");
  }
});

app.post("/register", async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.Password1, salt);

    req.body.Password1 = hash;

    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Login").insertOne(req.body);
    await client.close();
    res.json({ message: "Registered As User" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/getSearch", async (req, res) => {
  var searchVal = req.body.search.toLowerCase();
  var searchOption = req.body.searchOption;
  console.log(searchVal, searchOption);
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db
      .collection(`${searchOption}`)
      .find({ Title: { $regex: `${searchVal}` } })
      .toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getMobiles", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Mobiles").find().toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getElectronics", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Electronics").find().toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getFurnitures", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Furnitures").find().toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getVehicles", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Vehicles").find().toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getHousings", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Housing").find().toArray();
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getAll", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let dataMobile = await db.collection("Mobiles").find().toArray();
    let dataElectronic = await db.collection("Electronics").find().toArray();
    let dataFurniture = await db.collection("Furnitures").find().toArray();
    let dataVehicle = await db.collection("Vehicles").find().toArray();
    let dataHouse = await db.collection("Housing").find().toArray();
    let data = [
      ...dataMobile,
      ...dataElectronic,
      ...dataFurniture,
      ...dataVehicle,
      ...dataHouse,
    ];
    let arr1 = data.filter((item) => item.AdType === "paid");
    let arr2 = data.filter((item) => item.AdType === "free");
    let result = [...arr1, ...arr2];
    await client.close();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/postadvt/mobiles", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Mobiles").insertOne(req.body);
    await client.close();
    res.json({ Message: "Posted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/postadvt/electronics", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Electronics").insertOne(req.body);
    await client.close();
    res.json({ Message: "Posted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/postadvt/vehicles", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Vehicles").insertOne(req.body);
    await client.close();
    res.json({ Message: "Posted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/postadvt/furnitures", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Furnitures").insertOne(req.body);
    await client.close();
    res.json({ Message: "Posted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/postadvt/housings", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("Quikr");
    let data = await db.collection("Housing").insertOne(req.body);
    await client.close();
    res.json({ Message: "Posted" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Listening on PORT : ", port);
});
