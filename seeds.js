const mongoose = require("mongoose");
const Celebrity = require("./models/Celebrity");

// open up the connection to MongoDB
mongoose.connect("mongodb://localhost/celebrities");

const celebrities = [
  {
    name: "Nathan Barley",
    occupation: "webmaster",
    catchPhrase: "Keep it livid",
  },
  {
    name: "Flight of the Conchords",
    occupation: "band",
    catchPhrase: "They came, they saw, they Conchord",
  },
  {
    name: "Kurupt FM",
    occupation: "pirate radio",
    catchPhrase: "It's a Kurupt ting",
  },
];

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(`Success! - ${celebrities.length} were added to the database`);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
