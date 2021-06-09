import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://new-user:PccS7UhSiGdpKFWp@cluster0.l4ccl.mongodb.net/dummy?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("data1");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Employee inserted!" });
  }
}
export default handler;
