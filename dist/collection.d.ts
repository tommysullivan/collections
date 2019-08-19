export declare class Collection {
    private internalArray;
    constructor(internalArray: any);
    toArray: () => any;
    add: (itemToAdd: any) => void;
    clone: () => Collection;
    get: (indx: any) => any;
    hasIndex: (indx: any) => boolean;
    map: (mapperFunction: any) => Collection;
    remove: (itemToRemove: any) => void;
    firstIndexOf: (soughtItem: any) => number;
    addCollection: (collection: any) => void;
    forEach: (functionToCallForEachItem: any) => boolean;
    removeCollection: (collectionOfItemsToRemove: any) => void;
    filter: (predicateFunction: any) => Collection;
    contains: (soughtElement: any) => boolean;
    containsAny: (collectionOfSoughtItems: any) => boolean;
    length: () => any;
    isEmpty: () => boolean;
    first: () => any;
    unique: () => Collection;
    equals: (other: any) => never;
    join: (delimiter: any) => any;
    toString: () => string;
    fold: (operator: any, identityForOperation: any) => any;
    any: (predicate: any) => boolean;
    all: (predicate: any) => boolean;
}
