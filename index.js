class UAParser {
  constructor(data) {
    this.params = new URLSearchParams(data)
    this.eventModel = {}

    if (this.params.get("t") === "pageview") {
      this.pageView()
    }
  }

  parse() {
    return this.eventModel
  }

  pageView() {
    this.eventModel.event = "page_view"
    // dataMapping();
    this.eventModel.eventData = {
      page_title: this.params.get("dt"),
      page_location: this.params.get("dl"),
      page_path: this.params.get("dp")
    }
  }
}

module.exports = { UAParser: UAParser }
