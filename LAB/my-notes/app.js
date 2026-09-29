const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let notesCollection;

async function connectDB() {
    await client.connect();

    const database = client.db("notes_lab");
    notesCollection = database.collection("notes");

    console.log("Connected to MongoDB");
}

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

// Display all notes
app.get("/", async (req, res) => {
    const notes = await notesCollection.find().toArray();

    res.render("index", { notes: notes });
});

// Show add-note form
app.get("/notes/new", (req, res) => {
    res.render("new");
});

// Add note
app.post("/notes", async (req, res) => {

    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.send("Title and content are required.");
    }

    await notesCollection.insertOne({
        title: title,
        content: content,
        category: category,
        createdAt: new Date()
    });

    res.redirect("/");
});

// Delete note
app.post("/notes/:id/delete", async (req, res) => {

    await notesCollection.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});