class UAParser {
  constructor(data) {
    if (data === null || data === "") {
      throw "No data sent"
    }

    this.params = new URLSearchParams(data)
    if (this.params.has("t")) {
      this.hitType = this.params.get("t")
      this.eventData = {}
      this.buildEvent()
    } else {
      throw "Data is invalid"
    }
  }

  toString() {
    return {
      event: this.hitType,
      eventData: this.eventData
    }
  }

  buildEvent() {
    switch (this.hitType) {
      case "pageview":
        this.pageView()
        break;
      case "exception":
        this.exception()
        break;
      case "social":
        this.social()
        break;
      case "timing":
        this.timing()
        break;
      case "screenview":
        this.screenview()
        break;
      case "transaction":
        this.transaction()
        break;
      case "item":
        this.item()
        break;
      case "event":
        this.event()
        break;
      default:
        throw "Not a supported hit type"
    }
    this.addCustomEntries()
  }

  pageView() {
    this.eventData.page_title = this.params.get("dt")
    this.eventData.page_location = this.params.get("dl")
    if (this.params.has("dp")) {
      this.eventData.page_path = this.params.get("dp")
    }
  }

  exception() {
    if (this.params.has("exd")) {
      this.eventData.exception_description = this.params.get("exd")
    }
    if (this.params.has("exf")) {
      this.eventData.exception_is_fatal = parseInt(this.params.get("exf"))
    }
  }

  social() {
    this.eventData.social_action = this.params.get("sa")
    this.eventData.social_network = this.params.get("sn")
    this.eventData.social_target = this.params.get("st")
  }

  timing() {
    this.eventData.timing_category = this.params.get("utc")
    this.eventData.timing_value = this.params.get("utv")
    this.eventData.timing_time = parseInt(this.params.get("utt"))
    if (this.params.has("utl")) {
      this.eventData.timing_label = this.params.get("utl")
    }
  }

  screenview() {
    this.eventData.screen_name = this.params.get("cd")
  }

  transaction() {
    this.eventData.transaction_id = this.params.get("ti")
    if (this.params.has("ta")) {
      this.eventData.transaction_affiliation = this.params.get("ta")
    }
    if (this.params.has("tr")) {
      this.eventData.transaction_revenue = parseFloat(this.params.get("tr"))
    }
    if (this.params.has("ts")) {
      this.eventData.transaction_shipping = parseFloat(this.params.get("ts"))
    }
    if (this.params.has("tt")) {
      this.eventData.transaction_tax = parseFloat(this.params.get("tt"))
    }
    if (this.params.has("cu")) {
      this.eventData.currency = this.params.get("cu")
    }
  }

  item() {
    this.eventData.transaction_id = this.params.get("ti")
    this.eventData.item_name = this.params.get("in")

    if (this.params.has("ic")) {
      this.eventData.item_id = this.params.get("ic")
    }
    if (this.params.has("ip")) {
      this.eventData.item_price = parseFloat(this.params.get("ip"))
    }
    if (this.params.has("iq")) {
      this.eventData.item_quantity = parseInt(this.params.get("iq"))
    }
    if (this.params.has("iv")) {
      this.eventData.item_variation = this.params.get("iv")
    }
    if (this.params.has("cu")) {
      this.eventData.currency = this.params.get("cu")
    }
  }

  event() {
    this.eventData.category = this.params.get("ec")
    this.eventData.action = this.params.get("ea")
    if (this.params.has("el")) {
      this.eventData.label = this.params.get("el")
    }
    if (this.params.has("ev")) {
      this.eventData.value = parseInt(this.params.get("ev"))
    }
  }

  addCustomEntries() {
    for (const entry of this.params) {
      var key = entry[0]
      var value = entry[1]

      if (key.match(/^cd[0-9]{1,3}$/)) {
        var dataKey = `dimension_${key.slice(2)}`
        this.eventData[dataKey] = value
      }

      if (key.match(/^cm[0-9]{1,3}$/)) {
        var dataKey = `metric_${key.slice(2)}`
        this.eventData[dataKey] = parseInt(value)
      }

      if (key.match(/^cg[0-9]{1}$/)) {
        var dataKey = `content_group_${key.slice(2)}`
        this.eventData[dataKey] = value
      }
    }
  }
}

module.exports = { UAParser: UAParser }
