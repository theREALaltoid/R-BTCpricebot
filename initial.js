require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
  userAgent: "reddit-bot-example-node",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);
// Configure options for stream: subreddit & results per query
const streamOpts = {
  subreddit: "btc",
  results: 100
};
// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on("comment", comment => {
  console.log(comment);
  var https = require("https");

  https.get(
    {
      host: "api.coindesk.com",
      path: "/v1/bpi/currentprice.json"
    },
    function(response) {
      // Continuously update stream with data
      var body = "";
      response.on("data", function(d) {
        body += d;
      });
      response.on("end", function() {
        // Data reception is done, do whatever with it!
        var parsed = JSON.parse(body);
        console.log(parsed.bpi.USD.rate);
        var USD = parsed.bpi.USD.rate_float;
        var GPB = parsed.bpi.GBP.rate_float;
        var EU = parsed.bpi.EUR.rate_float;
        if (comment.body === "!price") {
          comment.reply(
            "The current exchange rate of BTC is: " +
            "1 BTC = " +
            USD +
            " USD." +
            " 1 BTC = " +
            GPB +
            " GPB." +
            " 1 BTC = " +
            EU +
            " EU."
          );
        }
      });
    }
  );
});
