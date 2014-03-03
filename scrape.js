var links = [];
var fs = require('fs');
var casper = require('casper').create({
  verbose: true,
  pageSettings: {
     loadImages:  false,         // The WebPage instance used by Casper will
     loadPlugins: false,         // use these settings
     userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }, 
  clientScripts: ["bower_components/jquery/dist/jquery.min.js"]
});

// function getLinks() {
//     var links = document.querySelectorAll('h3.r a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});



casper.start('https://github.com/login/', function() {
    this.fill('form[action="/session"]', { login: 'alexmckenley@gmail.com', password: '' }, true);
});

casper.then(function() {
    var body = this.evaluate(function(){
      return $(document.body).html();
    });
    fs.write('index.html', body, 'w');
    // now search for 'phantomjs' by filling the form again
    // this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
});

// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     // links = links.concat(this.evaluate(getLinks));
// });

casper.run(function() {
    // echo results in some pretty fashion
    // this.echo(links.length + ' links found:');
    // this.echo(' - ' + links.join('\n - ')).exit();
    this.echo("DONE").exit();
});