// Generated by CoffeeScript 1.3.3
var $;

$ = ender;

describe("Opentip", function() {
  describe("debug()", function() {
    var consoleDebug;
    consoleDebug = console.debug;
    beforeEach(function() {
      return sinon.stub(console, "debug");
    });
    afterEach(function() {
      return console.debug.restore();
    });
    return it("should only debug when debugging == true", function() {
      Opentip.debugging = false;
      Opentip.prototype.debug("test");
      expect(console.debug.called).to.be["false"];
      Opentip.debugging = true;
      Opentip.prototype.debug("test");
      return expect(console.debug.called).to.be["true"];
    });
  });
  describe("constructor()", function() {
    before(function() {
      return Opentip.adapter = Opentip.adapters["native"];
    });
    it("arguments should be optional", function() {
      var opentip;
      opentip = new Opentip("div", "content");
      expect(opentip.content).to.equal("content");
      expect(opentip.triggerElement).to.equal("div");
      opentip = new Opentip("div", "content", "title", {
        hideOn: "click"
      });
      expect(opentip.content).to.equal("content");
      expect(opentip.triggerElement).to.equal("div");
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.options.title).to.equal("title");
      opentip = new Opentip("div", {
        hideOn: "click"
      });
      expect(opentip.triggerElement).to.equal("div");
      expect(opentip.options.hideOn).to.equal("click");
      expect(opentip.content).to.equal("");
      return expect(opentip.options.title).to.equal(void 0);
    });
    it("should use the href attribute if AJAX and an A element", function() {
      var element, opentip;
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      expect(opentip.options.ajax).to.be.a("object");
      return expect(opentip.options.ajax.url).to.equal("http://testlink");
    });
    it("should disable AJAX if neither URL or a link HREF is provided", function() {
      var element, opentip;
      element = $("<div>text</div>").get(0);
      opentip = new Opentip(element, {
        ajax: true
      });
      return expect(opentip.options.ajax).to.not.be.ok();
    });
    return it("should disable a link if the event is onClick", function() {
      var element, opentip;
      sinon.spy(Opentip.adapter, "observe");
      element = $("<a href=\"http://testlink\">link</a>").get(0);
      opentip = new Opentip(element, {
        showOn: "click"
      });
      expect(Opentip.adapter.observe.calledOnce).to.be.ok();
      expect(Opentip.adapter.observe.getCall(0).args[1]).to.equal("click");
      expect(Opentip.adapter.observe.getCall(0).args[3]).to.be.ok();
      return Opentip.adapter.observe.restore();
    });
  });
  return describe("setContent()", function() {
    return it("should update the content if tooltip currently visible", function() {
      var opentip, stub;
      opentip = new Opentip("div", "content");
      stub = sinon.stub(opentip, "updateElementContent");
      opentip.visible = false;
      opentip.setContent("TEST");
      opentip.visible = true;
      opentip.setContent("TEST2");
      return expect(stub.callCount).to.equal(1);
    });
  });
});
