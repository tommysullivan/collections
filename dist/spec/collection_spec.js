"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("../src/collections");
var expect_1 = __importDefault(require("expect"));
describe('Collection', function () {
    var collection, internalArray;
    beforeEach(function () {
        internalArray = [1, 2, 3];
        collection = new collections_1.Collection(internalArray);
    });
    it('should be instantiable', function () {
        expect_1.default(collection).not.toBeUndefined();
    });
    describe('toArray()', function () {
        var arrayRepresentationOfCollection;
        beforeEach(function () {
            arrayRepresentationOfCollection = collection.toArray();
        });
        it('should return a native javascript array representation of the collection', function () {
            expect_1.default(arrayRepresentationOfCollection).toEqual([1, 2, 3]);
        });
        describe('when the returned array is changed', function () {
            it('does not affect the collection', function () {
                arrayRepresentationOfCollection.push(4);
                var secondArrayRepresentationOfCollection = collection.toArray();
                expect_1.default(secondArrayRepresentationOfCollection).toEqual([1, 2, 3]);
            });
        });
        describe('when the collection is changed', function () {
            it('does not affect the previously returned array representation of the collection', function () {
                collection.add(4);
                expect_1.default(arrayRepresentationOfCollection).toEqual([1, 2, 3]);
            });
        });
    });
    describe('clone()', function () {
        it('should return a new instance of Collection which is an independent clone of the original collection', function () {
            var clone = collection.clone();
            collection.add(8);
            clone.add(9);
            expect_1.default(collection.toArray()).toEqual([1, 2, 3, 8]);
            expect_1.default(clone.toArray()).toEqual([1, 2, 3, 9]);
        });
    });
    describe('add(e)', function () {
        var result;
        beforeEach(function () {
            result = collection.add(4);
        });
        it('should add the passed element to the end of the collection', function () {
            expect_1.default(collection.toArray()).toEqual([1, 2, 3, 4]);
        });
        it('should not return anything', function () {
            expect_1.default(result).toBeUndefined();
        });
    });
    describe('get(i)', function () {
        describe('when the collection contains an element at the requested index i', function () {
            it('should return the element at index i', function () {
                expect_1.default(collection.get(1)).toBe(2);
            });
        });
        describe('when the collection does not contain an element at the requested index i', function () {
            it('should throw an exception whose message contains the index i', function () {
                function attemptToGetIndexThatIsOutOfRange() {
                    collection.get(7);
                }
                expect_1.default(attemptToGetIndexThatIsOutOfRange).toThrow(); //I don't see how to test for the exception message, just that an exception is thrown
            });
        });
    });
    describe('hasIndex(i)', function () {
        describe('when the collection has an element at the passed index i', function () {
            it('should return true', function () {
                expect_1.default(collection.hasIndex(2)).toBeTruthy();
            });
        });
        describe('when the collection does not have an element at the passed index i', function () {
            it('should return false', function () {
                expect_1.default(collection.hasIndex(9)).toBeFalsy();
            });
        });
    });
    describe('map(f)', function () {
        it('should return a new Collection instance containing elements equal to f(e, i, c) for each element e at index i in c, where c is this Collection instance', function () {
            var c = 0;
            var mockMapperFunction = function () { return c++; };
            var newCollection = collection.map(mockMapperFunction);
            expect_1.default(newCollection.toArray()).toEqual([0, 1, 2]);
        });
    });
    describe('remove(e)', function () {
        describe("when one or more of the collection's elements are equal to e according the == operator", function () {
            it('should remove those equivalent elements, shifting elements down to unused indices', function () {
                collection.add(2);
                collection.add(5);
                collection.remove(2);
                expect_1.default(collection.toArray()).toEqual([1, 3, 5]);
            });
        });
    });
    describe('firstIndexOf(e)', function () {
        describe("when one or more of the collection's elements are equal to e according to the == operator", function () {
            it('should return the index of the first equivalent element', function () {
                collection.add(3);
                var firstIndexOfElement = collection.firstIndexOf(3);
                expect_1.default(firstIndexOfElement).toBe(2);
            });
        });
        describe("when none of the collection's elements are equal to e according to the == operator", function () {
            it('should throw an error', function () {
                function attemptToGetFirstIndexOfItemThatIsNotInCollection() {
                    collection.firstIndexOf(8);
                }
                expect_1.default(attemptToGetFirstIndexOfItemThatIsNotInCollection).toThrow();
            });
        });
    });
    describe('addCollection(collectionOfItemsToAdd)', function () {
        it('should add all of the items in the passed collectionOfItemsToAdd to the current collection', function () {
            var collectionOfItemsToAdd = new collections_1.Collection([7, 8, 9]);
            collection.addCollection(collectionOfItemsToAdd);
            expect_1.default(collection.toArray()).toEqual([1, 2, 3, 7, 8, 9]);
        });
    });
    describe('removeCollection(collectionOfItemsToRemove)', function () {
        it('should remove all of the items in the passed collectionOfItemsToRemove from the current collection', function () {
            var collectionOfItemsToRemove = new collections_1.Collection([1, 3]);
            collection.removeCollection(collectionOfItemsToRemove);
            expect_1.default(collection.toArray()).toEqual([2]);
        });
    });
    describe('filter(f)', function () {
        it('should return a new Collection instance containing only those elements e from the original collection for which f(e) is true', function () {
            function isEven(potentiallyEvenNumber) {
                return potentiallyEvenNumber % 2 == 0;
            }
            var onlyEvenNumbersCollection = collection.filter(isEven);
            var arrayRepresentationOfCollectionContainingOnlyEvenNumbers = onlyEvenNumbersCollection.toArray();
            expect_1.default(arrayRepresentationOfCollectionContainingOnlyEvenNumbers).toEqual([2]);
            function isOdd(potentiallyOddNumber) {
                return potentiallyOddNumber % 2 == 1;
            }
            var onlyOddNumbersCollection = onlyEvenNumbersCollection.filter(isOdd);
            var arrayRepresentationOfCollectionContainingOnlyOddNumbers = onlyOddNumbersCollection.toArray();
            expect_1.default(arrayRepresentationOfCollectionContainingOnlyOddNumbers).toEqual([]);
        });
    });
    describe('contains(e)', function () {
        describe('when the collection contains the sought element e', function () {
            it('should return true', function () {
                expect_1.default(collection.contains(3)).toBeTruthy();
            });
        });
        describe('when the collection does not contain the sought element e', function () {
            it('should return false', function () {
                expect_1.default(collection.contains(8)).toBeFalsy();
            });
        });
    });
    describe('unique()', function () {
        collection = new collections_1.Collection([1, 2, 2, 3, 4, 2, 5, 3, 6]);
        expect_1.default(collection.unique().toArray()).toEqual([1, 2, 3, 4, 5, 6]);
    });
    describe('length()', function () {
        it('returns the number of elements in the collection', function () {
            expect_1.default(collection.length()).toBe(3);
            collection.add(7);
            expect_1.default(collection.length()).toBe(4);
        });
    });
    describe('regular for syntax example', function () {
        var items = [1, 5, 8, 2, 4];
        var sum = 0;
        for (var index = 0; index < items.length; index++) {
            var element = items[index];
            if (element == 2)
                break;
            if (element == 5)
                continue;
            sum = sum + element;
        }
        expect_1.default(sum).toBe(9);
    });
    describe('fold', function () {
        function add(a, b) { return a + b; }
        function multiply(a, b) { return a * b; }
        collection = new collections_1.Collection([1, 2, 3, 4, 5]);
        expect_1.default(collection.fold(add, 0)).toBe(15);
        expect_1.default(collection.fold(multiply, 1)).toBe(120);
        collection = new collections_1.Collection([]);
        expect_1.default(collection.fold(multiply, 1)).toBe(1);
    });
    describe('forEach(f, rN?)', function () {
        describe('where f is a function f(e, index, collection)', function () {
            var testArray, indexOnWhichToCallCauseBreak;
            beforeEach(function () {
                testArray = [];
            });
            function callThisForEachElementInCollection(currentElement, currentIndex, collectionBeingIteratedOver) {
                testArray[currentIndex] = currentElement;
                expect_1.default(collectionBeingIteratedOver).toBe(collection);
                if (indexOnWhichToCallCauseBreak == currentIndex)
                    return false;
            }
            describe('when an f is passed which does not return false for any items in collection', function () {
                it('should call f for each item, passing  items and return true', function () {
                    indexOnWhichToCallCauseBreak = 5;
                    var retVal = collection.forEach(callThisForEachElementInCollection);
                    expect_1.default(testArray[0]).toBe(1);
                    expect_1.default(testArray[1]).toBe(2);
                    expect_1.default(testArray[2]).toBe(3);
                    expect_1.default(testArray.length).toBe(3);
                    expect_1.default(retVal).toBe(true);
                });
            });
            describe('when an f is passed which returns false for a given item cF', function () {
                it('should call f for each element in the collection prior to cF and return false', function () {
                    indexOnWhichToCallCauseBreak = 1;
                    var retVal = collection.forEach(callThisForEachElementInCollection);
                    expect_1.default(testArray[0]).toBe(1);
                    expect_1.default(testArray[1]).toBe(2);
                    expect_1.default(testArray[2]).toBeUndefined();
                    expect_1.default(testArray.length).toBe(2);
                    expect_1.default(retVal).toBe(false);
                });
            });
        });
    });
    describe('containsAny(collectionOfSoughtItems)', function () {
        describe('when collectionOfSoughtItems contains one of the items in this collection', function () {
            it('returns true', function () {
                var collectionOfSoughtItems = new collections_1.Collection([9, 10, 11, 3, 14]);
                expect_1.default(collection.containsAny(collectionOfSoughtItems)).toBeTruthy();
            });
        });
        describe('when collectionOfSoughtItems does not contain any of the items in this collection', function () {
            it('returns true', function () {
                var collectionOfSoughtItems = new collections_1.Collection([9, 10, 11, 12, 14]);
                expect_1.default(collection.containsAny(collectionOfSoughtItems)).toBeFalsy();
            });
        });
    });
    describe('any(p)', function () {
        describe('where p returns false for all elements', function () {
            it('returns false', function () {
                expect_1.default(collection.any(function () { return false; })).toBeFalsy();
            });
        });
        describe('where p returns true for one or more elements', function () {
            it('returns true', function () {
                expect_1.default(collection.any(function (a) { return a == 3; })).toBeTruthy();
            });
        });
    });
    describe('all(p)', function () {
        describe('where p returns false for one or more elements', function () {
            it('returns false', function () {
                expect_1.default(collection.all(function (a) { return a != 1; })).toBeFalsy();
            });
        });
        describe('where p returns true for all elements', function () {
            it('returns true', function () {
                expect_1.default(collection.all(function () { return true; })).toBeTruthy();
            });
        });
    });
    describe('forEach(f)', function () {
        describe('where f is a function f(e, index, collection)', function () {
            var returnValue;
            describe('and f returns false for some element eF in the collection', function () {
                beforeEach(function () {
                    var aSpyBasedFunctionToCallForEachElement = function (e, i) { return i < 1; };
                    returnValue = collection.forEach(aSpyBasedFunctionToCallForEachElement);
                });
                it('returns false', function () {
                    expect_1.default(returnValue).toBeFalsy();
                });
            });
            describe('finally, if f does not return false for ANY elements in the collection', function () {
                it('the forEach function returns true, as in answering the question "Did you get through each?"', function () {
                    expect_1.default(collection.forEach(function () { return undefined; })).toBeTruthy();
                });
            });
        });
    });
});
