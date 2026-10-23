const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

function handleTimestamp(req, res) {
  const input = req.params.date;
  let date;

  if (input === undefined) {
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

app.get("/api", handleTimestamp);
app.get("/api/", handleTimestamp);
app.get("/api/:date", handleTimestamp);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
