"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_plugDat_waitList = [];

var plugDat = function () {
    function plugDat() {
        _classCallCheck(this, plugDat);

        this.settings = {};

        this.dat = {};

        this.initLoci = [];

        this.callBlock = {};
    }

    _createClass(plugDat, [{
        key: "init",
        value: function init() {
            var _this = this;

            var bang = new Event('letsroll');

            var pause = setInterval(function () {
                if (_plugDat_waitList.length === 0) {
                    document.dispatchEvent(bang);

                    _this.callBlock = _this.initLoci.map(function (loci) {
                        var priority = { "1": [], "2": [], "3": [], "4": [], "5": [] };
                        priority[loci.priority].push({ name: name, loci: loci });
                        return priority;
                    });

                    for (var i in _callBlock[0]) {
                        window[_callBlock[0].name] = _this.dat[name];
                    }

                    var _callBlock = _this.callBlock;
                    for (var i in _callBlock) {
                        for (var x in _callBlock[i]) {}
                    }

                    clearInterval(pause);
                }
            }, 500);
        }
    }, {
        key: "forge",
        value: function forge(name, plugin) {
            var waitIndex = _plugDat_waitList.indexOf(name);
            if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) !== 'object') {
                console.error('Plugin variable must be an object type.');
                return false;
            } else if (plugin.init !== 'function') {
                console.error('Plugin does not contain an "init" function, please define one.');
                return false;
            } else if (waitIndex === -1) {
                console.error(name + ' plugin was not listed in the waitlist. Please add it before you try to plug it in.');
                return false;
            } else {
                this.dat[name] = plugin;

                this.initLoci.push({ name: name, initLoci: 'global', priority: 1 });

                _plugDat_waitList.splice(waitIndex, 1);
                return true;
            }
        }
    }, {
        key: "plug",
        value: function plug(name, loci, priority, plugin) {
            var waitIndex = _plugDat_waitList.indexOf(name);

            if ((typeof plugin === "undefined" ? "undefined" : _typeof(plugin)) !== "object") {
                console.error('Plugin variable must be an object type.');
                return false;
            } else if (this.dat[loci] === undefined) {
                console.error(loci + ' plugin does not exist in plugDat. Either create it first or make sure you spelled it correctly.');
                return false;
            } else if (waitIndex === -1) {
                console.error(name + ' plugin was not listed in the waitlist. Please add it before you try to plug it in.');
                return false;
            } else {
                this.dat[loci][name] = plugin;

                this.initLoci.push({ name: name, initLoci: loci, priority: priority });

                _plugDat_waitList.splice(waitIndex, 1);
                return true;
            }
        }
    }, {
        key: "evangalize",
        value: function evangalize(name) {
            if (this.plugin[name] === undefined) {
                console.error(name + ' plugin does not exist, it cannot be globalized.');
                return false;
            } else {
                window[name] = this.plugin[name];
            }
        }
    }]);

    return plugDat;
}();