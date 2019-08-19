"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection = /** @class */ (function () {
    function Collection(internalArray) {
        var _this = this;
        this.internalArray = internalArray;
        this.toArray = function () {
            var copyOfArray = _this.internalArray.slice(0);
            return copyOfArray;
        };
        this.add = function (itemToAdd) {
            _this.internalArray.push(itemToAdd);
        };
        this.clone = function () {
            var independentInternalArray = _this.toArray();
            var newIndependentInstance = new Collection(independentInternalArray);
            return newIndependentInstance;
        };
        this.get = function (indx) {
            if (indx < _this.internalArray.length && indx >= 0 && indx === (indx | 0))
                return _this.internalArray[indx];
            throw "This subscript " + indx + " is out of range, sweetie!!";
        };
        this.hasIndex = function (indx) {
            return indx < _this.internalArray.length && indx >= 0 && indx === (indx | 0);
        };
        this.map = function (mapperFunction) {
            var internalArrayForNewCollection = [];
            _this.forEach(function (currentItem, currentIndex, collection) {
                internalArrayForNewCollection[currentIndex] = mapperFunction(currentItem, currentIndex, collection);
            });
            return new Collection(internalArrayForNewCollection);
        };
        this.remove = function (itemToRemove) {
            for (var j in _this.internalArray) {
                if (_this.internalArray[j] == itemToRemove)
                    _this.internalArray.splice(j, 1);
            }
        };
        this.firstIndexOf = function (soughtItem) {
            var indexToBeReturned = -1;
            _this.forEach(function (currentItem, currentIndex) {
                if (currentItem == soughtItem) {
                    indexToBeReturned = currentIndex;
                    return false;
                }
            });
            if (indexToBeReturned == -1)
                throw 'Error';
            return indexToBeReturned;
        };
        this.addCollection = function (collection) {
            _this.internalArray = _this.internalArray.concat(collection.toArray());
        };
        this.forEach = function (functionToCallForEachItem) {
            var arrayOfItemsToLoopOver = _this.toArray();
            for (var currentIndex = 0; currentIndex < arrayOfItemsToLoopOver.length; currentIndex++) {
                var value = arrayOfItemsToLoopOver[currentIndex];
                var shouldBreak = functionToCallForEachItem(value, currentIndex, _this);
                if (shouldBreak === false)
                    return false;
            }
            return true;
        };
        this.removeCollection = function (collectionOfItemsToRemove) {
            collectionOfItemsToRemove.forEach(function (itemToRemove) {
                _this.remove(itemToRemove);
            });
        };
        this.filter = function (predicateFunction) {
            var filteredArray = [];
            function doThisForEachItem(currentItem) {
                if (predicateFunction(currentItem)) {
                    filteredArray.push(currentItem);
                }
                ;
            }
            _this.forEach(doThisForEachItem);
            return new Collection(filteredArray);
        };
        this.contains = function (soughtElement) {
            var doThisForEachItem = function (currentItem) {
                if (currentItem === soughtElement)
                    return false;
            };
            return !_this.forEach(doThisForEachItem);
        };
        this.containsAny = function (collectionOfSoughtItems) {
            return _this.any(function (item) { return collectionOfSoughtItems.contains(item); });
        };
        this.length = function () {
            return _this.internalArray.length;
        };
        this.isEmpty = function () {
            return _this.length() == 0;
        };
        this.first = function () {
            return _this.get(0);
        };
        this.unique = function () {
            var uniqueCollection = new Collection([]);
            _this.forEach(function (element) {
                if (!uniqueCollection.contains(element))
                    uniqueCollection.add(element);
            });
            return uniqueCollection;
        };
        this.equals = function (other) {
            throw new Error("Not implemented");
        };
        this.join = function (delimiter) {
            return _this.internalArray.join(delimiter);
        };
        this.toString = function () {
            return "[" + _this.internalArray.join(',') + "]";
        };
        this.fold = function (operator, identityForOperation) {
            var fold = identityForOperation;
            _this.forEach(function (item) {
                fold = operator(fold, item);
            });
            return fold;
        };
        this.any = function (predicate) {
            return !_this.forEach(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return !predicate.apply(null, args);
            });
        };
        this.all = function (predicate) {
            return _this.forEach(predicate);
        };
    }
    return Collection;
}());
exports.Collection = Collection;
