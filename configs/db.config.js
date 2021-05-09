const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to DB 🚀', process.env.DB_NAME);
    console.log('Listening on port 3000');
  })
  .catch(err => console.error('Error connecting to mongo', err));
 