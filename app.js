const express = require('express');
const connectToMongoDB = require('./db');
const app = express();
app.use(express.json({ limit: "1gb" }));
app.use(
  express.urlencoded({ limit: "1gb", extended: false, parameterLimit: 1000000 })
);
require("./routes/index")(app);
app.get('/', (req,res)=>{
  res.send('Hello from API Gateway!');
})
connectToMongoDB()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start the server:', err.message);
    process.exit(1); // Exit the process with an error code
  });