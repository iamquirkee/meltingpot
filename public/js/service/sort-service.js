(function() {
  (function() {
    var sortService;
    sortService = function() {
      this.string = function(list, key) {
        return list.sort(function(a, b) {
          var aValue, bValue;
          aValue = a[key] ? a[key].toLowerCase() : "";
          bValue = b[key] ? b[key].toLowerCase() : "";
          if (aValue > bValue) {
            return 1;
          } else if (aValue < bValue) {
            return -1;
          } else {
            return 0;
          }
        });
      };
      this.int = function(list, key, isDescending) {
        if (!isDescending) {
          isDescending = false;
        }
        return list.sort(function(a, b) {
          var aValue, bValue;
          aValue = a[key] ? parseInt(a[key], 10) : 0;
          bValue = b[key] ? parseInt(b[key], 10) : 0;
          if (aValue > bValue) {
            if (isDescending) {
              return -1;
            } else {
              return 1;
            }
          } else if (aValue < bValue) {
            if (isDescending) {
              return 1;
            } else {
              return -1;
            }
          } else {
            return 0;
          }
        });
      };
      this.date = function(list, key, isDescending) {
        if (!isDescending) {
          isDescending = false;
        }
        return list.sort(function(a, b) {
          var aValue, bValue;
          aValue = a[key] ? new Date(a[key]).valueOf() : 0;
          bValue = b[key] ? new Date(b[key]).valueOf() : 0;
          console.log(a.full_name, aValue, " | ", b.full_name, bValue);
          if (aValue > bValue) {
            if (isDescending) {
              return -1;
            } else {
              return 1;
            }
          } else if (aValue < bValue) {
            if (isDescending) {
              return 1;
            } else {
              return -1;
            }
          } else {
            return 0;
          }
        });
      };
    };
    return angular.module('meltingpot').service('sortService', sortService);
  })();

}).call(this);
