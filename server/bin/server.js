import mongoose from 'mongoose'

import app from '../app.js'

mongoose.Promise = global.Promise

const { USER, PASSWORD, HOST, DATABASE, PORT = 3000 } = process.env

const uri = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DATABASE}?retryWrites=true&w=majority`

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