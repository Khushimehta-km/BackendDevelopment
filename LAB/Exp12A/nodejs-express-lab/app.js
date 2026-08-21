const express = require("express");

const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    res.json({
        message: "User registered successfully",
        username: username,
        email: email
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    heading: 'Welcome to EJS Templating',
    message: 'EJS makes it easy to generate dynamic HTML'
  });
});

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.render('users', { users });
});

app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  
  const user = {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    city: 'New York'
  };
  
  res.render('profile', { user });
});
