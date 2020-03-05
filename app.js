const express = require("express");
const bodyParser = require('body-parser')
const fs = require("fs");

const PORT = 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
// needed for POST FORM decoding
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function () {
  console.log(`App running on: http://localhost:${PORT}`);
});

// initial sample data
let myNotes = [];

// our routes
app.get('/notes', function (req, res) {
  fs.readFile("db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(`error ${error}`);
    }

    if (data == undefined || data == "") {
      console.log(`no notes to display from db`);
    } else {
      myNotes = data
    }
    console.log(`My Notes: ${myNotes}`)

  });
  res.send(myNotes);
});

app.post('/api/notes', function (req, res) {
  fs.readFile("db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(`error ${error}`);
    }

    if (data == undefined || data == "") {
      console.log(`no notes to display from db`);
    } else {
      myNotes = data
    }
    console.log(`My Notes: ${myNotes}`)
  });

  console.log(`<< inserting note: `, req.body);
  console.log(typeof(myNotes));
  // save the data to our table
  let pushNotes = JSON.parse(myNotes);
  pushNotes.push(req.body);
  pushNotes = JSON.stringify(pushNotes)

  fs.writeFile("db.json", pushNotes, function (error) {

    if (error) {
      return console.log(error);
    }

    console.log(pushNotes);

  });
  res.send({ message: `saved: ${req.body.name}` });
});

app.post('/api/notes/:id', async function (req, res) {

  fs.readFile("db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(`error ${error}`);
    }

    if (data == undefined || data == "") {
      console.log(`no notes to display from db`);
    } else {
      myNotes = data
    }
    console.log(`My Notes read from db: ${myNotes}`)
  });

  const id = req.params.id;
  console.log(`ID: ${id}`)
  console.log(`Note type: `+ typeof (myNotes))

  let updateNotes = JSON.parse(myNotes)
  updateNotes.splice(id, 1)
  updateNotes = JSON.stringify(updateNotes);
  console.log(`New notes after delete: ${updateNotes}`)

  fs.writeFile("db.json", updateNotes, function (error) {

    if (error) {
      console.log(error);
    }

    console.log(updateNotes);

  });
  res.send({ message: `Finished deleting id ${id}` });
}) // app.delete()

