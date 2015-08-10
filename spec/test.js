var data = require('../public/js/data').movies;

describe("a proper data", function() {
  it("should contain 4 elements", function() {
    expect(data.length).toBe(4);
  });
});
