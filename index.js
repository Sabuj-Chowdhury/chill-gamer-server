const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i53p4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    app.post("/add-review", async (req, res) => {
      try {
        const review = req.body;
        const database = client.db("gameReviewsDB");
        const reviewsCollection = database.collection("reviews");

        const result = await reviewsCollection.insertOne(review);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.send("Failed to add review");
      }
    });
    app.get("/top-rated-games", async (req, res) => {
      try {
        const games = await client
          .db("gameReviewsDB")
          .collection("reviews")
          .find()
          .sort({ rating: -1 })
          .limit(6)
          .toArray();
        res.send(games);
      } catch (error) {
        console.error("Error fetching top-rated games:", error);
        res.send({ error: "Failed to fetch top-rated games" });
      }
    });

    app.get("/all-reviews", async (req, res) => {
      try {
        const reviews = await client
          .db("gameReviewsDB")
          .collection("reviews")
          .find() // Fetch all reviews
          .toArray();

        res.status(200).send(reviews); // Send all reviews to the client
      } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).send({ error: "Failed to fetch reviews" });
      }
    });

    app.get("/reviews/:id", async (req, res) => {
      try {
        const reviewId = req.params.id;
        const database = client.db("gameReviewsDB");

        // Convert the id to an ObjectId
        const review = await database
          .collection("reviews")
          .findOne({ _id: new ObjectId(reviewId) });

        if (review) {
          res.status(200).json(review);
        } else {
          res.status(404).json({ error: "Review not found" });
        }
      } catch (error) {
        console.error("Error fetching review details:", error);
        res.status(500).json({ error: "Failed to fetch review" });
      }
    });

    app.post("/watchlist", async (req, res) => {
      try {
        const { reviewId, gameTitle, userEmail, userName } = req.body;
        const database = client.db("gameReviewsDB");
        const watchlistCollection = database.collection("watchlist");

        const result = await watchlistCollection.insertOne({
          reviewId,
          gameTitle,
          userEmail,
          userName,
        });
        res.status(200).send(result);
      } catch (error) {
        console.error("Failed to save data to watchlist:", error);
        res.status(500).send({ error: "Failed to add to watchlist" });
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("chill gamer server is runing....");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
