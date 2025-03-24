const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connectToMongo } = require('./mongo');
const config = require('./dbConfig.json');

const app = express();
const authCookieName = 'token';
const port = 4000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:5173', // Update this if needed
  credentials: true,
}));

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
    await updateUserToken(user.email, user.token);
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
    await updateUserToken(user.email, null);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// ✅ Check login status
apiRouter.get('/auth/status', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Not authenticated' });
  }
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
apiRouter.post('/survey', verifyAuth, async (req, res) => {
  console.log("📥 Received survey submission:", req.body);

  const { username, ExerciseFrequency, Howlong, Goal, FavoriteExercise, FavoriteBigThree } = req.body;

  if (!username || ExerciseFrequency === 'Default' || Howlong === 'Default' || Goal === 'Default' || FavoriteExercise === 'Default' || FavoriteBigThree === 'Default') {
    console.log("⚠️ Survey submission failed: Missing fields");
    return res.status(400).send({ msg: 'Please fill out all fields before submitting.' });
  }

  const newSurvey = { username, ExerciseFrequency, Howlong, Goal, FavoriteExercise, FavoriteBigThree };
  const db = await connectToMongo();
  await db.collection('surveys').insertOne(newSurvey);

  console.log("✅ Survey saved:", newSurvey);
  res.send({ msg: 'Survey submitted successfully!', survey: newSurvey });
});

// ✅ Get all survey responses
apiRouter.get('/surveys', verifyAuth, async (_req, res) => {
  const db = await connectToMongo();
  const surveys = await db.collection('surveys').find({}).toArray();
  res.send(surveys);
});

// ✅ Update a survey response
apiRouter.put('/survey/:id', verifyAuth, async (req, res) => {
  const db = await connectToMongo();
  const result = await db.collection('surveys').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.send({ updated: result.modifiedCount });
});

// ✅ Delete a survey response
apiRouter.delete('/survey/:id', verifyAuth, async (req, res) => {
  const db = await connectToMongo();
  const result = await db.collection('surveys').deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.send({ deleted: result.deletedCount });
});

// ✅ Test route
apiRouter.get('/test', (_req, res) => {
  res.send({ msg: 'Test route is working!' });
});

/**
 * 🔧 UTILITY FUNCTIONS
 */

// ✅ Create a new user in MongoDB
async function createUser(email, password) {
  const db = await connectToMongo();
  const usersCollection = db.collection('users');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };

  await usersCollection.insertOne(user);
  console.log("👤 New user created:", user);
  return user;
}

// ✅ Find a user by a specific field
async function findUser(field, value) {
  if (!value) return null;
  const db = await connectToMongo();
  const usersCollection = db.collection('users');

  const query = {};
  query[field] = value;
  const foundUser = await usersCollection.findOne(query);
  console.log(`🔎 Finding user by ${field}: ${value}`, foundUser);
  return foundUser;
}

// ✅ Update user token (login/logout)
async function updateUserToken(email, token) {
  const db = await connectToMongo();
  const usersCollection = db.collection('users');

  await usersCollection.updateOne({ email }, { $set: { token } });
}

// ✅ Set authentication cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  });

  console.log(`✅ Auth cookie set: ${authToken}`);
}

/**
 * 🛠 ERROR HANDLING
 */

app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err);
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  console.log("❌ Unknown route requested.");
  res.sendFile('index.html', { root: 'public' });
});

/**
 * 🚀 START THE SERVER
 */
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
