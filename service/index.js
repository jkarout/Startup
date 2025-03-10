const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const cors = require('cors');

const app = express();
const authCookieName = 'token';

// Simulated databases (stored in memory)
let users = [];
let surveyResponses = [];

// ✅ Force Port 3000
const port = 4000;  

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// ✅ Allow frontend requests and cookies


// ✅ API Router
const apiRouter = express.Router();
app.use('/api', apiRouter);

/**
 * 🔐 AUTHENTICATION ROUTES
 */

// ✅ Register a new user
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (await findUser('email', email)) {
    return res.status(409).send({ msg: 'User already exists' });
  }

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

// ✅ Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser('email', email);

  if (user && await bcrypt.compare(password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    console.log(`✅ User logged in: ${user.email}`);
    res.send({ email: user.email });
  } else {
    console.log("❌ Invalid login attempt.");
    res.status(401).send({ msg: 'Invalid credentials' });
  }
});

// ✅ Logout user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

/**
 * 🔒 SURVEY ROUTES (Protected)
 */

// ✅ Middleware to verify authentication
const verifyAuth = async (req, res, next) => {
  console.log("🔍 Checking authentication...");
  console.log("🍪 Cookies received:", req.cookies);

  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    console.log(`✅ User authenticated: ${user.email}`);
    req.user = user;
    next();
  } else {
    console.log("❌ Unauthorized access attempt.");
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ✅ Save a new survey response
apiRouter.post('/survey', verifyAuth, (req, res) => {
  console.log("📥 Received survey submission:", req.body);

  const { username, ExerciseFrequency, Howlong, Goal, FavoriteExercise, FavoriteBigThree } = req.body;

  if (!username || ExerciseFrequency === 'Default' || Howlong === 'Default' || Goal === 'Default' || FavoriteExercise === 'Default' || FavoriteBigThree === 'Default') {
    console.log("⚠️ Survey submission failed: Missing fields");
    return res.status(400).send({ msg: 'Please fill out all fields before submitting.' });
  }

  const newSurvey = { username, ExerciseFrequency, Howlong, Goal, FavoriteExercise, FavoriteBigThree };
  surveyResponses.push(newSurvey);

  console.log("✅ Survey saved:", newSurvey);
  res.send({ msg: 'Survey submitted successfully!', survey: newSurvey });
});

// ✅ Get all survey responses
apiRouter.get('/surveys', verifyAuth, (_req, res) => {
  res.send(surveyResponses);
});

apiRouter.get('/test', (_req, res) => {
  res.send({ msg: 'Test route is working!' });
});

/**
 * 🔧 UTILITY FUNCTIONS
 */

// ✅ Create a new user
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  console.log("👤 New user created:", user);
  return user;
}

// ✅ Find a user by a specific field
async function findUser(field, value) {
  if (!value) return null;
  const foundUser = users.find(u => u[field] === value);
  console.log(`🔎 Finding user by ${field}: ${value}`, foundUser);
  return foundUser;
}

// ✅ Set authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === 'production', // ✅ Secure in production
    httpOnly: true,
    sameSite: 'lax',
  });

  console.log(`✅ Auth cookie set: ${authToken}`);
}


/**
 * 🛠 ERROR HANDLING
 */

// ✅ Error handler middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);
  res.status(500).send({ type: err.name, message: err.message });
});

// ✅ Handle unknown routes properly
app.use((_req, res) => {
  console.log("❌ Unknown route requested.");
  res.status(404).json({ msg: "Not Found" });
});

/**
 * 🚀 START THE SERVER
 */
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

apiRouter.get('/auth/status', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Not authenticated' });
  }
});



