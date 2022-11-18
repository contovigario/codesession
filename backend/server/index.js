// server/index.js
const PORT = process.env.PORT || 3001;

const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

const axiosInstance = axios.create({
  baseURL: 'https://storage.googleapis.com/coding-session-rest-api/',
  headers: { 'X-Auth-Token' : 'token'}
});

app.use(cors(corsOptions));

app.get("/api/place/:id", async(req, res) => {
  try {
    const response = await axiosInstance.get(req.params.id)
    res.json({
      opening_hours: response.data.opening_hours,
      displayed_what: response.data.displayed_what,
      displayed_where: response.data.displayed_where,
      contacts: response.data.addresses[0].contacts
    });
  }
  catch(error) {
    console.log(error.response.status)
    res.json({error: error.response.status});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
