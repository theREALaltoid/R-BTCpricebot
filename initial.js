require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
  userAgent: "BTCpricebot",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);
// Configure options for stream: subreddit & results per query
const streamOpts = {
  subreddit: "all",
  results: 100,
  pollTime: 2000,
};
// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on("comment", comment => {
  console.log(comment);
const coindesk = require('node-coindesk-api')
 
coindesk.getCurrentPrice().then(function (data) {
  

        
        var USD = data.bpi.USD.rate_float;
        var GPB = data.bpi.GBP.rate_float;
        var EU = data.bpi.EUR.rate_float;
       if (comment.body.includes("bitcoin's price")){                                                                                                                                         
                                                                                                                                                                                                                                       

 comment.reply("The current exchange rate of BTC is: " +
"1 BTC = " + USD + " USD." + 
" 1 BTC = " + GPB + " GPB." +
" 1 BTC = " + EU + " EU.");}


if (comment.body.includes("!price")){                                                                                                                                         
                                                                                                                                                                                                                                       

 comment.reply("The current exchange rate of BTC is: " +
"1 BTC = " + USD + " USD." + 
" 1 BTC = " + GPB + " GPB." +
" 1 BTC = " + EU + " EU.");}

if (comment.body.includes("bitcoins price")){                                                                                                                                         
                                                                                                                                                                                                                                       

 comment.reply("The current exchange rate of BTC is: " +
"1 BTC = " + USD + " USD." + 
" 1 BTC = " + GPB + " GPB." +
" 1 BTC = " + EU + " EU.");}
    
})
});
  


  

