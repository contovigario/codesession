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
    console.log(response.data)
    res.json({
      opening_hours: response.data.opening_hours,
      displayed_what: response.data.displayed_what,
      displayed_where: response.data.displayed_where,
      contacts: response.data.addresses[0].contacts, 
      tags: response.data.tags.filter((i) => (i.slice(0, 17) === 'entry:ba_category')),
      favorited: response.data.favorited,
      ratings_count: response.data.place_feedback_summary.ratings_count,
      average_rating: response.data.place_feedback_summary.average_rating,
      display_average_rating: response.data.place_feedback_summary.display_average_rating
    });
  }
  catch(error) {
    console.log(error.response)
    res.json({error: 'ERROR'
      //error.response.status + ': ' + error.response.statusText
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
