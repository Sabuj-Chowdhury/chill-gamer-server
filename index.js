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
        res.send("Failed to add review");
      }
    });

    app.get("/top-rated-games", async (req, res) => {
      try {
        const database = client.db("gameReviewsDB");
        const reviewsCollection = database.collection("reviews");

        const games = await reviewsCollection
          .find()
          .sort({ rating: -1 })
          .limit(6)
          .toArray();

        if (games.length > 0) {
          res.send(games);
        } else {
          res.send({ error: "No top-rated games found" });
        }
      } catch (error) {
        res.json({ error: "Failed to fetch top-rated games" });
      }
    });

    app.get("/all-reviews", async (req, res) => {
      try {
        const reviews = await client
          .db("gameReviewsDB")
          .collection("reviews")
          .find()
          .toArray();

        res.send(reviews);
      } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.send("Failed to fetch reviews");
      }
    });

    app.get("/my-reviews/:userEmail", async (req, res) => {
      try {
        const userEmail = req.params.userEmail;
        const database = client.db("gameReviewsDB");
        const reviewsCollection = database.collection("reviews");

        const userReviews = await reviewsCollection
          .find({ userEmail })
          .toArray();
        res.json(userReviews);
      } catch (error) {
        res.json("Failed to fetch reviews");
      }
    });

    app.get("/reviews/:id", async (req, res) => {
      try {
        const reviewId = req.params.id;
        const database = client.db("gameReviewsDB");

        const review = await database
          .collection("reviews")
          .findOne({ _id: new ObjectId(reviewId) });

        if (review) {
          res.json(review);
        } else {
          res.json({ error: "Review not found" });
        }
      } catch (error) {
        res.json("Failed to fetch review");
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
        res.send(result);
      } catch (error) {
        res.send("Failed to add to watchlist");
      }
    });

    app.get("/my-watchlist/:userEmail", async (req, res) => {
      try {
        const { userEmail } = req.params;
        const database = client.db("gameReviewsDB");
        const watchlistCollection = database.collection("watchlist");
        const reviewsCollection = database.collection("reviews");

        const userWatchlist = await watchlistCollection
          .find({ userEmail })
          .map(async (item) => {
            const review = await reviewsCollection.findOne({
              _id: new ObjectId(item.reviewId),
            });
            return {
              ...item,
              dateAdded: item._id.getTimestamp(),
              rating: review ? review.rating : "N/A",
            };
          })
          .toArray();

        res.json(userWatchlist);
      } catch (error) {
        res.json({ error: "Failed to fetch watchlist" });
      }
    });

    app.put("/reviews/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { reviewDescription, rating } = req.body;

        if (!reviewDescription || !rating) {
          return res.json("Review description and rating are required.");
        }

        const database = client.db("gameReviewsDB");
        const reviewsCollection = database.collection("reviews");

        const result = await reviewsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { reviewDescription, rating } }
        );

        if (result.matchedCount === 0) {
          return res.json("Review not found");
        }

        const updatedReview = await reviewsCollection.findOne({
          _id: new ObjectId(id),
        });

        return res.json(updatedReview);
      } catch (error) {
        return res.json("Internal server error");
      }
    });

    app.delete("/reviews/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const database = client.db("gameReviewsDB");
        const reviewsCollection = database.collection("reviews");

        const result = await reviewsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 1) {
          res.json({ message: "Review deleted successfully" });
        } else {
          res.json({ error: "Review not found" });
        }
      } catch (error) {
        res.json("Failed to delete review");
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
