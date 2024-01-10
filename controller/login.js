const router = require("express").Router()
const authSchema = require("../Models/Authentication")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret="dhag74328bzhjbjb1545czdnbhsdvjusbc";

// Define the user schema and model

// User registration route
router.post('/register', async (req, res) => {
    console.log(req.body)
  try {

    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await authSchema.create({ username, password: hashedPassword });
   

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user in the database
    const user = await authSchema.findOne({ username });
    // If the user doesn't exist or the password is incorrect, respond with an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, secret);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Protected route example
router.get('/protected',authenticateToken,async(req, res) => {
    try {
        const user = await authSchema.findById(req.User.userId)
        res.json(req.User.userId)

    } catch (error) {
        res.json(error)
    }
});

// Middleware for authenticating the JWT token
 function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  if (token == null) {
    return res.sendStatus(401).json(token);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.User = user;
    next();
  });
}



module.exports = router