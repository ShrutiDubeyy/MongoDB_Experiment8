const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017"; // MongoDB runs inside GitHub Actions
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("elearning");
    const logs = db.collection("activity_logs");

    // CREATE
    await logs.insertOne({ user: "Alice", activity: "Watched Video", time: new Date() });
    console.log(" Inserted activity log");

    // READ
    const recent = await logs.find().sort({ time: -1 }).limit(5).toArray();
    console.log("Recent activities:", recent);

    // UPDATE
    await logs.updateOne({ user: "Alice" }, { $set: { activity: "Completed Quiz" } });
    console.log(" Updated activity");

    // DELETE
    await logs.deleteOne({ user: "Alice" });
    console.log(" Deleted activity");

  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await client.close();
    console.log(" Connection closed");
  }
}

main().catch(console.error);
