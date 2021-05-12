const mongoose = require('mongoose');

const mongoDbUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

mongoose
  .connect( mongoDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB 🚀', process.env.DB_NAME);
    console.log('Listening on port 3000');
  })
  .catch(err => console.error('Error connecting to mongo', err));
 
  /*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://marinancelia:<password>@cluster1.hwvrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

Replace <password> with the password for the marinancelia user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.*/