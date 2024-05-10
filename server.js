const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

app.use('/file', require('./routes/Tophiring'));
app.use('/files', require('./routes/Register'));

mongoose.connect(DB_URL, {
// //   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

app.listen(PORT, () => {
  console.log('Your server is running on port', PORT);
});
