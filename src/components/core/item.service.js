(function () {
  'use strict';

  angular.module('tcl.core')
    .factory('tclItemService', [
      'tclStoreService',
      ItemService
    ]);

  function ItemService (tclStoreService) {
    var exports = {
      user: ''
    };

    function addItem (item) {
      return tclStoreService.getStoreValue('items')
        .then(function (itemsData) {
          return appendNewItem(item, itemsData);
        })
        .then(setItems);
    }

    function appendNewItem (item, items) {
      items = items || [];
      items.push(item);
      console.log(items);
      return items;
    }

    function getItems () {
      return tclStoreService.getStoreValue('items').then(updateItems);
    }

    function removeItems () {
      return tclStoreService.removeStoreValue('items').then(updateItems);
    }

    function setItems (items) {
      return tclStoreService.setStoreValue('items', items)
        .then(getItems);
    }

    function updateItems (itemsData) {
      exports.items = itemsData;
    }

    exports.addItem = addItem;
    exports.getItems = getItems;
    exports.removeItems = removeItems;
    exports.setItems = setItems;
    exports.updateItems = updateItems;

    return exports;

  }

}());
