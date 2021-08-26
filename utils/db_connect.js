const mongoose = require("mongoose");
require("dotenv").config({ path: "./env/.env" });
const PORT = process.env.PORT || 4444;

module.exports = async (app) => {
  const dbConnect = {
    protocol: process.env.DB_PROTOCOL,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dbname: process.env.DB_NAME,
  };
  const { protocol, username, password, host, port, dbname } = dbConnect;
  const MongoDB_URI = `${protocol}${username}:${password}@${host}:${port}/${dbname}`;
  // console.log(MongoDB_URI);
  await mongoose
    .connect(MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      app.listen(PORT, () => console.log(`Server runs on Port ${PORT}`));
      console.log("DB Connected");
    })
    .catch((err) => console.error(err));
};
