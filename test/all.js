var chai = require('chai');
var should = chai.should();
var TinyG = require("../tinyg");

var g = new TinyG();

describe('tinyg', function() {
  it('should trigger "open" event', function(done) {
    var errTimeout = setTimeout(function () {
      // check if serialPortControl exists
      // if yes, open event was never called
      (g.serialPortControl==undefined).should.be.true;
      done();
    }, 1000);

    g.on('open', function() {
      clearTimeout(errTimeout);
      g.serialPortControl.should.not.equal(null);
      done();
    });
    g.openFirst();
  });

  it('should be able to flush the print job', function(done) {
    // interrupt after one second
    setTimeout(function () {
      (g.linesRequested > 0).should.be.true;

      // flush
      g.flush();
      (g.linesRequested > 0).should.be.false;
      done();
    }, 1000);

    g.sendFile(__dirname+'/1002.gcode')
  });

  it('should trigger close event on close', function(done) {

    var errTimeout = setTimeout(function () {
      (g.serialPortControl==undefined).should.be.false;
      done();
    }, 1000); //

    g.on('close', function() {
      clearTimeout(errTimeout);
      (g.serialPortControl==undefined).should.be.true;
      (g.dataPortControl==undefined).should.be.true;
      done();
    });

    g.close();
  })
});
