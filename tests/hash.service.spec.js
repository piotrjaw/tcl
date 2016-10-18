describe('hash service', function () {

  var tclHashServiceMock;

  beforeEach(function() {
    module('tcl.core');
    inject(function (_tclHashService_) {
      tclHashServiceMock = _tclHashService_;
    });
  });

  describe('hash function', function () {
    it('should run tests', function () {
        expect(1).toEqual(1);
    });

    it('should return same values for same strings', function () {
      var string1 = 'teststring';
      var string2 = 'teststring';

      var output1 = tclHashServiceMock.hash(string1);
      var output2 = tclHashServiceMock.hash(string2);

      expect(output1).toEqual(output2);
    });
  });
});
