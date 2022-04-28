const { UAParser } = require("../index.js")

describe("UAParser", function() {
  describe("No data sent", function () {
    it("Throws an error when given null", function () {
      expect(function () {
        new UAParser(null)
      }).toThrow("No data sent")
    })

    it("Throws an error when given an string", function () {
      expect(function () {
        new UAParser("")
      }).toThrow("No data sent")
    })
  })

  describe("Invalid data sent", function () {
    it("Throws an error when the data does not contaion 't'", function () {
      expect(function () {
        new UAParser("x=abc")
      }).toThrow("Data is invalid")
    })
  })

  describe("Not a supported hit type", function () {
    it("Returns an empty hash given no data", function () {
      const data = "t=invalid"

      expect(function() {
        new UAParser(data).toString()
      }).toThrow("Not a supported hit type")
    })
  })

  describe("pageview", function () {
    it("Returns a valid object with a page path", function() {
      const data = "t=pageview&dl=http://foo.com/home?a=b&dt=Settings&dp=/foo"

      const expected = {
        "event": "pageview",
        "eventData": {
          "page_title": "Settings",
          "page_location": "http://foo.com/home?a=b",
          "page_path": "/foo"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object without a page path", function () {
      const data = "t=pageview&dl=http://foo.com/home?a=b&dt=Settings"

      const expected = {
        "event": "pageview",
        "eventData": {
          "page_title": "Settings",
          "page_location": "http://foo.com/home?a=b"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("exception", function () {
    it("Returns a valid object", function () {
      const data = "t=exception"

      const expected = {
        "event": "exception",
        "eventData": {}
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with a description", function () {
      const data = "t=exception&exd=DatabaseError"

      const expected = {
        "event": "exception",
        "eventData": {
          "exception_description": "DatabaseError"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with is_fatal", function () {
      const data = "t=exception&exf=0"

      const expected = {
        "event": "exception",
        "eventData": {
          "exception_is_fatal": 0
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with description and is_fatal", function () {
      const data = "t=exception&exd=DatabaseError&exf=0"

      const expected = {
        "event": "exception",
        "eventData": {
          "exception_description": "DatabaseError",
          "exception_is_fatal": 0
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("social", function () {
    it("Returns a valid object", function () {
      const data = "t=social&sa=like&sn=facebook&st=http://foo.com"

      const expected = {
        "event": "social",
        "eventData": {
          "social_action": "like",
          "social_network": "facebook",
          "social_target": "http://foo.com"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("timing", function () {
    it("Returns a valid object", function () {
      const data = "t=timing&utc=category&utv=lookup&utt=123"

      const expected = {
        "event": "timing",
        "eventData": {
          "timing_category": "category",
          "timing_value": "lookup",
          "timing_time": 123
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with a label", function () {
      const data = "t=timing&utc=category&utv=lookup&utt=123&utl=label"

      const expected = {
        "event": "timing",
        "eventData": {
          "timing_category": "category",
          "timing_value": "lookup",
          "timing_time": 123,
          "timing_label": "label"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("screenview", function () {
    it("Returns a valid object", function () {
      const data = "t=screenview&cd=High Scores"

      const expected = {
        "event": "screenview",
        "eventData": {
          "screen_name": "High Scores"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("transaction", function () {
    it("Returns a valid object", function () {
      const data = "t=transaction&ti=OD564"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation", function () {
      const data = "t=transaction&ti=OD564&ta=Member"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation and revenue", function () {
      const data = "t=transaction&ti=OD564&ta=Member&tr=15.47"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member",
          "transaction_revenue": 15.47
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation, revenue and shipping", function () {
      const data = "t=transaction&ti=OD564&ta=Member&tr=15.47&ts=3.50"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member",
          "transaction_revenue": 15.47,
          "transaction_shipping": 3.50
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation, revenue, shipping and tax", function () {
      const data = "t=transaction&ti=OD564&ta=Member&tr=15.47&ts=3.50&tt=11.20"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member",
          "transaction_revenue": 15.47,
          "transaction_shipping": 3.50,
          "transaction_tax": 11.20
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation, revenue, shipping, tax and currency", function () {
      const data = "t=transaction&ti=OD564&ta=Member&tr=15.47&ts=3.50&tt=11.20&cu=EUR"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member",
          "transaction_revenue": 15.47,
          "transaction_shipping": 3.50,
          "transaction_tax": 11.20,
          "currency": "EUR"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with affiliation, revenue, shipping, tax and currency", function () {
      const data = "t=transaction&ti=OD564&ta=Member&tr=15.47&ts=3.50&tt=11.20&cu=EUR"

      const expected = {
        "event": "transaction",
        "eventData": {
          "transaction_id": "OD564",
          "transaction_affiliation": "Member",
          "transaction_revenue": 15.47,
          "transaction_shipping": 3.50,
          "transaction_tax": 11.20,
          "currency": "EUR"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("item", function () {
    it("Returns a valid object", function () {
      const data = "t=item&ti=OD564&in=Shoe"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with an id", function () {
      const data = "t=item&ti=OD564&in=Shoe&ic=SKU47"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe",
          "item_id": "SKU47"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with an id and price", function () {
      const data = "t=item&ti=OD564&in=Shoe&ic=SKU47&ip=3.50"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe",
          "item_id": "SKU47",
          "item_price": 3.50
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with an id, name, price and quantity, variation and currency", function () {
      const data = "t=item&ti=OD564&in=Shoe&ic=SKU47&ip=3.50&iq=4"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe",
          "item_id": "SKU47",
          "item_price": 3.50,
          "item_quantity": 4
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with an id, name, price, quantity and variation", function () {
      const data = "t=item&ti=OD564&in=Shoe&ic=SKU47&ip=3.50&iq=4&iv=Blue"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe",
          "item_id": "SKU47",
          "item_price": 3.50,
          "item_quantity": 4,
          "item_variation": "Blue"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with an id, name, price, quantity, variation and currency", function () {
      const data = "t=item&ti=OD564&in=Shoe&ic=SKU47&ip=3.50&iq=4&iv=Blue&cu=EUR"

      const expected = {
        "event": "item",
        "eventData": {
          "transaction_id": "OD564",
          "item_name": "Shoe",
          "item_id": "SKU47",
          "item_price": 3.50,
          "item_quantity": 4,
          "item_variation": "Blue",
          "currency": "EUR"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("event", function () {
    it("Returns a valid object", function () {
      const data = "t=event&ec=Category&ea=Action"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with a label", function () {
      const data = "t=event&ec=Category&ea=Action&el=Label"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "label": "Label"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with a value", function () {
      const data = "t=event&ec=Category&ea=Action&ev=55"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "value": 55
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with a label and value", function () {
      const data = "t=event&ec=Category&ea=Action&el=Label&ev=55"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "label": "Label",
          "value": 55
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })

  describe("custom dimensions, metrics and content groups", function () {
    it("Returns a valid object with custom dimensions", function () {
      const data = "t=event&ec=Category&ea=Action&cd1=Sports&cd2=Music"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "dimension_1": "Sports",
          "dimension_2": "Music"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with custom metrics", function () {
      const data = "t=event&ec=Category&ea=Action&cm1=47&cm2=99"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "metric_1": 47,
          "metric_2": 99
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })

    it("Returns a valid object with content groups", function () {
      const data = "t=event&ec=Category&ea=Action&cg1=news/sports&cg2=news/arts"

      const expected = {
        "event": "event",
        "eventData": {
          "category": "Category",
          "action": "Action",
          "content_group_1": "news/sports",
          "content_group_2": "news/arts"
        }
      }

      expect(new UAParser(data).toString()).toEqual(expected)
    })
  })
})
