import mongoose from 'mongoose'

import app from '../app.js'

mongoose.Promise = global.Promise

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DATABASE, PORT = 3000 } = process.env

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() => {
    console.log('👌 Connection to MongoDB succesful ...')
    app.listen(PORT, () =>
      console.log('✅ Server is running... Use API on port:', PORT)
    )
  })
  .catch(error => {
    console.log('🚫 Connection to MongoDB unsuccesful: ', error.message);
    process.exit(1)
  })