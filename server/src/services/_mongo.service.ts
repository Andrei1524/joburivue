const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  // event listener for connection
  console.log('mongo db connection ready');
});

mongoose.connection.on('error', (error: Error) => {
  // event listener for connection, we put this anywhere we want
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(
    'mongodb+srv://andrei:pHRNxcwQiLAyMVAR@cluster0.aq3dp.mongodb.net/joburivue?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };
