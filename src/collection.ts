export class Collection {
    constructor(private internalArray) {}
    
    toArray = () => {
        const copyOfArray = this.internalArray.slice(0);
        return copyOfArray;
    }

    add = (itemToAdd) => {
        this.internalArray.push(itemToAdd);
    }

    clone = () => {
        const independentInternalArray = this.toArray();
        const newIndependentInstance = new Collection(independentInternalArray); 
        return newIndependentInstance;
    }

    get = (indx) => {
        if (indx < this.internalArray.length && indx >= 0 && indx === (indx|0)) return this.internalArray[indx];
        throw "This subscript " + indx + " is out of range, sweetie!!";
    }

    hasIndex = (indx) => {
        return indx < this.internalArray.length && indx >= 0 && indx === (indx|0);
    }

    map = (mapperFunction) => {
        const internalArrayForNewCollection:any[] = [];
        this.forEach((currentItem, currentIndex, collection) => {
            internalArrayForNewCollection[currentIndex] = mapperFunction(currentItem, currentIndex, collection);    
        });
        return new Collection(internalArrayForNewCollection);
    }

    remove = (itemToRemove) => {
        for(const j in this.internalArray) { 
            if (this.internalArray[j]==itemToRemove) this.internalArray.splice(j,1);
        }
    }

    firstIndexOf =  (soughtItem) => {
        let indexToBeReturned=-1;  
        this.forEach((currentItem,currentIndex) => {
            if (currentItem==soughtItem) { 
                indexToBeReturned = currentIndex;
                return false;
            }
        });
        if (indexToBeReturned==-1) throw 'Error';
        return indexToBeReturned;
    }

    addCollection = (collection) => {
        this.internalArray = this.internalArray.concat(collection.toArray());
    }

    forEach = (functionToCallForEachItem) => {
        const arrayOfItemsToLoopOver = this.toArray();
        for (let currentIndex=0; currentIndex<arrayOfItemsToLoopOver.length; currentIndex++) {
            const value = arrayOfItemsToLoopOver[currentIndex];
            const shouldBreak = functionToCallForEachItem(value,currentIndex,this);
            if (shouldBreak===false) return false;
        }
        return true;
    }

    removeCollection = (collectionOfItemsToRemove) => {
        collectionOfItemsToRemove.forEach((itemToRemove) => {
            this.remove(itemToRemove);
        });
    }

    filter = (predicateFunction) => {
        const filteredArray:any[] = [];
        function doThisForEachItem(currentItem){
                if (predicateFunction(currentItem)) {filteredArray.push(currentItem)};
        }
        this.forEach(doThisForEachItem);
        return new Collection(filteredArray);
    }

    contains = (soughtElement) => {
        const doThisForEachItem = (currentItem) => {
            if(currentItem === soughtElement) return false;
        }
        return !this.forEach(doThisForEachItem);
    }

    containsAny = (collectionOfSoughtItems) => {
        return this.any(item => collectionOfSoughtItems.contains(item));
    }

    length = () => {
        return this.internalArray.length;
    }

    isEmpty = () =>  {
        return this.length() == 0;
    }

    first = () =>  {
        return this.get(0);
    }

    unique = () => {
        const uniqueCollection = new Collection([]);
        this.forEach((element) => {
            if(!uniqueCollection.contains(element)) uniqueCollection.add(element);
        })
        return uniqueCollection;
    }

    equals = (other) => {
        throw new Error("Not implemented")
    }

    join = (delimiter) => {
        return this.internalArray.join(delimiter);
    }

    toString = () =>  {
        return `[${this.internalArray.join(',')}]`;
    }

    fold = (operator, identityForOperation) => {
        let fold = identityForOperation;
        this.forEach((item) => {
            fold = operator(fold, item); 
        });
        return fold;
    }

    any = (predicate) => {
        return !this.forEach((...args) => !predicate.apply(null, args));
    }

    all = (predicate) => {
        return this.forEach(predicate);
    }
}