const { UAParser } = require("../index.js")

describe("No data", function () {
  it("Returns an empty hash given no data", function () {
    expect(new UAParser().parse()).toEqual({})
  })

  it("Returns an empty hash given null", function () {
    expect(new UAParser(null).parse()).toEqual({})
  })

  it("Returns an empty hash given an empty hash", function () {
    expect(new UAParser({}).parse()).toEqual({})
  })
})
