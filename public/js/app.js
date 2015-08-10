var Ractive = require('ractive')
var movies = require("./data").movies;

var ractive = new Ractive({
  el: "app",
  template: "#template",
  data: {
    movies: movies.slice(0)
  }
});
