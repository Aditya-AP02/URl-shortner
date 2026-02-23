const mongoose = require('mongoose');

async function connectMongoDb(url){
  // MongoDB connection to project-02
  return mongoose.connect(url)
    .then(() => {
      console.log("✅ MongoDB connected to project-02");
    })
    .catch((err) => {
      console.log('❌ MongoDB connection error:', err);
    });
  
}

module.exports={
  connectMongoDb,
}