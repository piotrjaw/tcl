(function () {
  'use strict';

  angular.module('tcl.core')
    .factory('tclHashService', [
      HashService
    ]);

  function HashService () {
    var exports = {};

    function hash (text) {
      var arr = _.assign(_.range('', 256, ''), text.split(''));
      var output = _.map(_.range(8), function (group) {
        var value = 0;
        var i = 0;
        var chr;
        var arrString = arr.join('');
        for (i; i < 32; i ++) {
          chr = arrString.charCodeAt(i * + group);
          value = ((value << 5) - value) % 16 + chr;
        }
        return (value % 16).toString(16);
      });
      return output.join('');
    }

    exports.hash = hash;

    return exports;

  }

}());
