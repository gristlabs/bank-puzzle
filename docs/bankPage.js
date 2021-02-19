/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./build/app/bank.js":
/*!***************************!*\
  !*** ./build/app/bank.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.moneyLaunderingCheck = exports.transfer = exports.getBalance = exports.initialize = void 0;
// This simple bank maintains account balances in this map.
const bankBalances = new Map();
// Initialize the bankBalances to 3 accounts, each starting out
// with an initial balankce of $1000.
async function initialize() {
    bankBalances.clear();
    bankBalances.set("A", 1000);
    bankBalances.set("B", 1000);
    bankBalances.set("C", 1000);
}
exports.initialize = initialize;
// Method to retrieve the balance for an account.
async function getBalance(accountId) {
    const balance = bankBalances.get(accountId);
    if (typeof balance !== 'number') {
        throw new Error(`Invalid accountID ${accountId}`);
    }
    return balance;
}
exports.getBalance = getBalance;
// Transfer a given amount from one account to another. The amount
// must be positive, and must not exceed the balance in accFrom.
async function transfer(accFrom, accTo, amount) {
    if (accFrom === accTo) {
        throw new Error(`Transfer accounts must be different`);
    }
    const balanceFrom = await getBalance(accFrom);
    const balanceTo = await getBalance(accTo);
    if (typeof amount !== 'number' || !(amount > 0)) {
        throw new Error(`Invalid amount ${amount}`);
    }
    if (amount > balanceFrom) {
        throw new Error(`Insufficient balance`);
    }
    await moneyLaunderingCheck(amount);
    bankBalances.set(accFrom, balanceFrom - amount);
    bankBalances.set(accTo, balanceTo + amount);
}
exports.transfer = transfer;
// Pretend to run some extra checks. These are quite fast, taking
// around 100ms, and happen to always pass.
async function moneyLaunderingCheck(amount) {
    return new Promise(resolve => setTimeout(resolve, 100));
}
exports.moneyLaunderingCheck = moneyLaunderingCheck;


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/index.js":
/*!************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subscribeBindable": () => (/* reexport safe */ _lib_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeBindable),
/* harmony export */   "subscribeElem": () => (/* reexport safe */ _lib_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem),
/* harmony export */   "Computed": () => (/* reexport safe */ _lib_computed__WEBPACK_IMPORTED_MODULE_1__.Computed),
/* harmony export */   "computed": () => (/* reexport safe */ _lib_computed__WEBPACK_IMPORTED_MODULE_1__.computed),
/* harmony export */   "Disposable": () => (/* reexport safe */ _lib_dispose__WEBPACK_IMPORTED_MODULE_2__.Disposable),
/* harmony export */   "Holder": () => (/* reexport safe */ _lib_dispose__WEBPACK_IMPORTED_MODULE_2__.Holder),
/* harmony export */   "MultiHolder": () => (/* reexport safe */ _lib_dispose__WEBPACK_IMPORTED_MODULE_2__.MultiHolder),
/* harmony export */   "setDisposeOwner": () => (/* reexport safe */ _lib_dispose__WEBPACK_IMPORTED_MODULE_2__.setDisposeOwner),
/* harmony export */   "_disposeNode": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__._disposeNode),
/* harmony export */   "attr": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.attr),
/* harmony export */   "attrElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.attrElem),
/* harmony export */   "attrs": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.attrs),
/* harmony export */   "attrsElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.attrsElem),
/* harmony export */   "autoDispose": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.autoDispose),
/* harmony export */   "autoDisposeElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.autoDisposeElem),
/* harmony export */   "boolAttr": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.boolAttr),
/* harmony export */   "boolAttrElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.boolAttrElem),
/* harmony export */   "cls": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.cls),
/* harmony export */   "clsElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.clsElem),
/* harmony export */   "clsPrefix": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.clsPrefix),
/* harmony export */   "create": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.create),
/* harmony export */   "data": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.data),
/* harmony export */   "dataElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.dataElem),
/* harmony export */   "dom": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.dom),
/* harmony export */   "domComputed": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.domComputed),
/* harmony export */   "domDispose": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.domDispose),
/* harmony export */   "domDisposeHooks": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.domDisposeHooks),
/* harmony export */   "find": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.find),
/* harmony export */   "findAll": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.findAll),
/* harmony export */   "forEach": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.forEach),
/* harmony export */   "frag": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.frag),
/* harmony export */   "getData": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.getData),
/* harmony export */   "hide": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.hide),
/* harmony export */   "hideElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.hideElem),
/* harmony export */   "makeTestId": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.makeTestId),
/* harmony export */   "maybe": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.maybe),
/* harmony export */   "noTestId": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.noTestId),
/* harmony export */   "on": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.on),
/* harmony export */   "onDispose": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onDispose),
/* harmony export */   "onDisposeElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onDisposeElem),
/* harmony export */   "onElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onElem),
/* harmony export */   "onKeyDown": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onKeyDown),
/* harmony export */   "onKeyElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onKeyElem),
/* harmony export */   "onKeyPress": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onKeyPress),
/* harmony export */   "onMatch": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onMatch),
/* harmony export */   "onMatchElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.onMatchElem),
/* harmony export */   "prop": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.prop),
/* harmony export */   "propElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.propElem),
/* harmony export */   "replaceContent": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.replaceContent),
/* harmony export */   "show": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.show),
/* harmony export */   "showElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.showElem),
/* harmony export */   "style": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.style),
/* harmony export */   "styleElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.styleElem),
/* harmony export */   "svg": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.svg),
/* harmony export */   "text": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.text),
/* harmony export */   "textElem": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.textElem),
/* harmony export */   "update": () => (/* reexport safe */ _lib_dom__WEBPACK_IMPORTED_MODULE_3__.update),
/* harmony export */   "Emitter": () => (/* reexport safe */ _lib_emit__WEBPACK_IMPORTED_MODULE_4__.Emitter),
/* harmony export */   "LLink": () => (/* reexport safe */ _lib_emit__WEBPACK_IMPORTED_MODULE_4__.LLink),
/* harmony export */   "Listener": () => (/* reexport safe */ _lib_emit__WEBPACK_IMPORTED_MODULE_4__.Listener),
/* harmony export */   "KoWrapObs": () => (/* reexport safe */ _lib_kowrap__WEBPACK_IMPORTED_MODULE_5__.KoWrapObs),
/* harmony export */   "fromKo": () => (/* reexport safe */ _lib_kowrap__WEBPACK_IMPORTED_MODULE_5__.fromKo),
/* harmony export */   "setupKoDisposal": () => (/* reexport safe */ _lib_kowrap__WEBPACK_IMPORTED_MODULE_5__.setupKoDisposal),
/* harmony export */   "toKo": () => (/* reexport safe */ _lib_kowrap__WEBPACK_IMPORTED_MODULE_5__.toKo),
/* harmony export */   "ComputedArray": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.ComputedArray),
/* harmony export */   "LiveIndex": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.LiveIndex),
/* harmony export */   "MutableObsArray": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.MutableObsArray),
/* harmony export */   "ObsArray": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.ObsArray),
/* harmony export */   "computedArray": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.computedArray),
/* harmony export */   "makeLiveIndex": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.makeLiveIndex),
/* harmony export */   "obsArray": () => (/* reexport safe */ _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__.obsArray),
/* harmony export */   "BaseObservable": () => (/* reexport safe */ _lib_observable__WEBPACK_IMPORTED_MODULE_7__.BaseObservable),
/* harmony export */   "Observable": () => (/* reexport safe */ _lib_observable__WEBPACK_IMPORTED_MODULE_7__.Observable),
/* harmony export */   "bundleChanges": () => (/* reexport safe */ _lib_observable__WEBPACK_IMPORTED_MODULE_7__.bundleChanges),
/* harmony export */   "obsHolder": () => (/* reexport safe */ _lib_observable__WEBPACK_IMPORTED_MODULE_7__.obsHolder),
/* harmony export */   "observable": () => (/* reexport safe */ _lib_observable__WEBPACK_IMPORTED_MODULE_7__.observable),
/* harmony export */   "PureComputed": () => (/* reexport safe */ _lib_pureComputed__WEBPACK_IMPORTED_MODULE_8__.PureComputed),
/* harmony export */   "pureComputed": () => (/* reexport safe */ _lib_pureComputed__WEBPACK_IMPORTED_MODULE_8__.pureComputed),
/* harmony export */   "keyframes": () => (/* reexport safe */ _lib_styled__WEBPACK_IMPORTED_MODULE_9__.keyframes),
/* harmony export */   "styled": () => (/* reexport safe */ _lib_styled__WEBPACK_IMPORTED_MODULE_9__.styled),
/* harmony export */   "Subscription": () => (/* reexport safe */ _lib_subscribe__WEBPACK_IMPORTED_MODULE_10__.Subscription),
/* harmony export */   "subscribe": () => (/* reexport safe */ _lib_subscribe__WEBPACK_IMPORTED_MODULE_10__.subscribe),
/* harmony export */   "bindB": () => (/* reexport safe */ _lib_util__WEBPACK_IMPORTED_MODULE_11__.bindB),
/* harmony export */   "bindBU": () => (/* reexport safe */ _lib_util__WEBPACK_IMPORTED_MODULE_11__.bindBU),
/* harmony export */   "bindUB": () => (/* reexport safe */ _lib_util__WEBPACK_IMPORTED_MODULE_11__.bindUB),
/* harmony export */   "input": () => (/* reexport safe */ _lib_widgets_input__WEBPACK_IMPORTED_MODULE_12__.input),
/* harmony export */   "select": () => (/* reexport safe */ _lib_widgets_select__WEBPACK_IMPORTED_MODULE_13__.select)
/* harmony export */ });
/* harmony import */ var _lib_binding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/binding */ "./node_modules/grainjs/dist/esm/lib/binding.js");
/* harmony import */ var _lib_computed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/computed */ "./node_modules/grainjs/dist/esm/lib/computed.js");
/* harmony import */ var _lib_dispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/dispose */ "./node_modules/grainjs/dist/esm/lib/dispose.js");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom */ "./node_modules/grainjs/dist/esm/lib/dom.js");
/* harmony import */ var _lib_emit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/emit */ "./node_modules/grainjs/dist/esm/lib/emit.js");
/* harmony import */ var _lib_kowrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/kowrap */ "./node_modules/grainjs/dist/esm/lib/kowrap.js");
/* harmony import */ var _lib_obsArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/obsArray */ "./node_modules/grainjs/dist/esm/lib/obsArray.js");
/* harmony import */ var _lib_observable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/* harmony import */ var _lib_pureComputed__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/pureComputed */ "./node_modules/grainjs/dist/esm/lib/pureComputed.js");
/* harmony import */ var _lib_styled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/styled */ "./node_modules/grainjs/dist/esm/lib/styled.js");
/* harmony import */ var _lib_subscribe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/subscribe */ "./node_modules/grainjs/dist/esm/lib/subscribe.js");
/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/util */ "./node_modules/grainjs/dist/esm/lib/util.js");
/* harmony import */ var _lib_widgets_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/widgets/input */ "./node_modules/grainjs/dist/esm/lib/widgets/input.js");
/* harmony import */ var _lib_widgets_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/widgets/select */ "./node_modules/grainjs/dist/esm/lib/widgets/select.js");
















/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/PriorityQueue.js":
/*!************************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/PriorityQueue.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PriorityQueue": () => (/* binding */ PriorityQueue)
/* harmony export */ });
/**
 * A simple and fast priority queue with a limited interface to push, pop, peek, and get size. It
 * is essentially equivalent to both npm modules 'fastpriorityqueue' and 'qheap', but is in
 * TypeScript and is a bit cleaner and simpler.
 *
 * It is constructed with a function that returns which of two items is "prior"; the pop() method
 * returns the most-prior element.
 */
class PriorityQueue {
    constructor(_isPrior) {
        this._isPrior = _isPrior;
        // Items form a binary tree packed into an array. Root is items[0]; children of items[i] are
        // items[2*i+1] and items[2*i+2]; parent of items[i] is items[(i - 1) >> 1]. For all children,
        // the invariant isPrior(parent, child) holds.
        this._items = [];
    }
    get size() { return this._items.length; }
    push(item) {
        const items = this._items;
        const isPrior = this._isPrior;
        let curIdx = this._items.length;
        while (curIdx > 0) {
            // While we have a parent that is not prior to us, bubble up the "hole" at items.length.
            const parIdx = (curIdx - 1) >> 1; // tslint:disable-line:no-bitwise
            const parItem = items[parIdx];
            if (isPrior(parItem, item)) {
                break;
            }
            items[curIdx] = parItem;
            curIdx = parIdx;
        }
        items[curIdx] = item;
    }
    peek() {
        return this._items[0];
    }
    pop() {
        if (this._items.length <= 1) {
            return this._items.pop();
        }
        const items = this._items;
        const isPrior = this._isPrior;
        const result = items[0];
        // Bubble the last item downwards from the root.
        const item = items.pop();
        const size = this._items.length;
        let curIdx = 0;
        let leftIdx = 1;
        while (leftIdx < size) {
            const rightIdx = leftIdx + 1;
            const bestIdx = (rightIdx < size && isPrior(items[rightIdx], items[leftIdx])) ?
                rightIdx : leftIdx;
            if (isPrior(item, items[bestIdx])) {
                break;
            }
            items[curIdx] = items[bestIdx];
            curIdx = bestIdx;
            leftIdx = curIdx + curIdx + 1;
        }
        items[curIdx] = item;
        return result;
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/_computed_queue.js":
/*!**************************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/_computed_queue.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DepItem": () => (/* binding */ DepItem),
/* harmony export */   "_getPriority": () => (/* binding */ _getPriority),
/* harmony export */   "compute": () => (/* binding */ compute),
/* harmony export */   "bundleChanges": () => (/* binding */ bundleChanges)
/* harmony export */ });
/* harmony import */ var _PriorityQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PriorityQueue */ "./node_modules/grainjs/dist/esm/lib/PriorityQueue.js");
/**
 * This module supports computed observables, organizing them into a priority queue, so that
 * computeds can be updated just once after multiple bundled changes.
 *
 * This module is for internal use only (hence the leading underscore in the name). The only
 * function useful outside is exposed via the `observable` module as `observable.bundleChanges()`.
 *
 * Changes may come together because multiple observables are changed synchronously, or because
 * multiple computeds depend on a single changed observable. In either case, if a computed depends
 * on multiple observables that are being changed, we want it to just get updated once when the
 * changes are complete.
 *
 * This is done by maintaining a _priority in each computed, where greater values get evaluated
 * later (computed with greater values depend on those with smaller values). When a computed needs
 * updating, it adds itself to the queue using enqueue() method. At the end of an observable.set()
 * call, or of bundleChanges() call, the queue gets processed in order of _priority.
 */

/**
 * DepItem is an item in a dependency relationship. It may depend on other DepItems. It is used
 * for subscriptions and computed observables.
 */
class DepItem {
    /**
     * Callback should call depItem.useDep(dep) for each DepInput it depends on.
     */
    constructor(callback, optContext) {
        this._priority = 0;
        this._enqueued = false;
        // Order of creation, used for ordering items at same priority.
        this._creation = ++_nextCreationNum;
        this._callback = callback;
        this._context = optContext;
    }
    static isPrioritySmaller(a, b) {
        return a._priority < b._priority || (a._priority === b._priority && a._creation < b._creation);
    }
    /**
     * Mark depItem as a dependency of this DepItem. The argument may be null to indicate a leaf (an
     * item such as a plain observable, which does not itself depend on anything else).
     */
    useDep(depItem) {
        const p = depItem ? depItem._priority : 0;
        if (p >= this._priority) {
            this._priority = p + 1;
        }
    }
    /**
     * Recompute this DepItem, calling the callback given in the constructor.
     */
    recompute() {
        this._priority = 0;
        this._callback.call(this._context);
    }
    /**
     * Add this DepItem to the queue, to be recomputed when the time is right.
     */
    enqueue() {
        if (!this._enqueued) {
            this._enqueued = true;
            queue.push(this);
        }
    }
}
// The main compute queue.
const queue = new _PriorityQueue__WEBPACK_IMPORTED_MODULE_0__.PriorityQueue(DepItem.isPrioritySmaller);
// Counter for creation order, used to create a stable ordering of DepItems at same priority.
let _nextCreationNum = 0;
// Array to keep track of items recomputed during this call to compute(). It could be a local
// variable in compute(), but is made global to minimize allocations.
const _seen = [];
// Counter used for bundling multiple calls to compute() into one.
let bundleDepth = 0;
/**
 * Exposed for unittests. Returns the internal priority value of an observable.
 */
function _getPriority(obs) {
    const depItem = obs._getDepItem();
    return depItem ? depItem._priority : 0;
}
/**
 * Update any computed observables that need updating. The update is deferred if we are currently
 * in the middle of a bundle. This is called automatically whenever you set an observable, and
 * there should be no need to ever call this by users of the library.
 */
function compute() {
    if (bundleDepth === 0 && queue.size > 0) {
        // Prevent nested compute() calls, which are unnecessary and can cause deep recursion stack.
        bundleDepth++;
        try {
            // We reuse _seen array to minimize allocations, but always leave it empty.
            do {
                const item = queue.pop();
                _seen.push(item);
                item.recompute();
            } while (queue.size > 0);
        }
        finally {
            // We delay the unsetting of _enqueued flag to here, to protect against infinite loops when
            // a change to a computed causes it to get enqueued again.
            for (const item of _seen) {
                item._enqueued = false;
            }
            _seen.length = 0;
            bundleDepth--;
        }
    }
}
/**
 * Defer recomputations of all computed observables and subscriptions until func() returns. This
 * is useful to avoid unnecessary recomputation if you are making several changes to observables
 * together. This function is exposed as `observable.bundleChanges()`.
 *
 * Note that this intentionally does not wait for promises to be resolved, since that would block
 * all updates to all computeds while waiting.
 */
function bundleChanges(func) {
    try {
        bundleDepth++;
        return func();
    }
    finally {
        bundleDepth--;
        compute();
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/binding.js":
/*!******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/binding.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "subscribeBindable": () => (/* binding */ subscribeBindable),
/* harmony export */   "subscribeElem": () => (/* binding */ subscribeElem)
/* harmony export */ });
/* harmony import */ var _computed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computed */ "./node_modules/grainjs/dist/esm/lib/computed.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/* harmony import */ var _subscribe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subscribe */ "./node_modules/grainjs/dist/esm/lib/subscribe.js");
/**
 * binding.ts offers a convenient subscribe() function that creates a binding to an observable, a
 * a plain value, or a function from which it builds a computed.
 */




function subscribeBindable(valueObs, callback) {
    // A plain function (to make a computed from), or a knockout observable.
    if (typeof valueObs === 'function') {
        // Knockout observable.
        const koValue = valueObs;
        if (typeof koValue.peek === 'function') {
            const sub = koValue.subscribe((val) => callback(val));
            callback(koValue.peek());
            return sub;
        }
        // Function from which to make a computed. Note that this is also reasonable:
        //    let sub = subscribe(use => callback(valueObs(use)));
        // The difference is that when valueObs() evaluates to unchanged value, callback would be
        // called in the version above, but not in the version below.
        const comp = (0,_computed__WEBPACK_IMPORTED_MODULE_0__.computed)(valueObs);
        comp.addListener((val) => callback(val));
        callback(comp.get());
        return comp; // Disposing this will dispose its one listener.
    }
    // An observable.
    if (valueObs instanceof _observable__WEBPACK_IMPORTED_MODULE_2__.BaseObservable) {
        // Use subscribe() rather than addListener(), so that bundling of changes (implicit and with
        // bundleChanges()) is respected. This matters when callback also uses observables.
        return (0,_subscribe__WEBPACK_IMPORTED_MODULE_3__.subscribe)(valueObs, (use, val) => callback(val));
    }
    callback(valueObs);
    return null;
}
/**
 * Subscribes a callback to valueObs (which may be a value, observable, or function) using
 * subscribe(), and disposes the subscription with the passed-in element.
 */
function subscribeElem(elem, valueObs, callback) {
    (0,_domDispose__WEBPACK_IMPORTED_MODULE_1__.autoDisposeElem)(elem, subscribeBindable(valueObs, callback));
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js":
/*!*************************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/browserGlobals.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ G),
/* harmony export */   "pushGlobals": () => (/* binding */ pushGlobals),
/* harmony export */   "popGlobals": () => (/* binding */ popGlobals)
/* harmony export */ });
/**
 * Module that allows client-side code to use browser globals (such as `document` or `Node`) in a
 * way that allows those globals to be replaced by mocks in browser-less tests.
 *
 *    import {G} from 'browserGlobals';
 *    ... use G.document
 *    ... use G.Node
 *
 * Initially, the global `window` object, is the source of the global values.
 *
 * To use a mock of globals in a test, use:
 *
 *    import {pushGlobals, popGlobals} as G from 'browserGlobals';
 *    before(function() {
 *      pushGlobals(mockWindow);    // e.g. jsdom.jsdom(...).defaultView
 *    });
 *    after(function() {
 *      popGlobals();
 *    });
 */
function _updateGlobals(dest, source) {
    dest.DocumentFragment = source.DocumentFragment;
    dest.Element = source.Element;
    dest.Node = source.Node;
    dest.document = source.document;
    dest.window = source.window;
}
// The initial IBrowserGlobals object.
const initial = {};
_updateGlobals(initial, (typeof window !== 'undefined' ? window : {}));
// The globals G object strats out with a copy of `initial`.
const G = Object.assign({}, initial);
// The stack of globals that always has the intial object, but which may be overridden.
const _globalsStack = [initial];
/**
 * Replace globals with those from the given object. Use popGlobals() to restore previous values.
 */
function pushGlobals(globals) {
    _globalsStack.push(globals);
    _updateGlobals(G, globals);
}
/**
 * Restore the values of globals to undo the preceding pushGlobals() call.
 */
function popGlobals() {
    if (_globalsStack.length > 1) {
        _globalsStack.pop();
    }
    _updateGlobals(G, _globalsStack[_globalsStack.length - 1]);
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/computed.js":
/*!*******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/computed.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Computed": () => (/* binding */ Computed),
/* harmony export */   "computed": () => (/* binding */ computed)
/* harmony export */ });
/* harmony import */ var _dispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispose */ "./node_modules/grainjs/dist/esm/lib/dispose.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/* harmony import */ var _subscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribe */ "./node_modules/grainjs/dist/esm/lib/subscribe.js");
/**
 * computed.js implements a computed observable, whose value depends on other observables and gets
 * recalculated automatically when they change.
 *
 * E.g. if we have some existing observables (which may themselves be instances of `computed`),
 * we can create a computed that subscribes to them explicitly:
 *  let obs1 = observable(5), obs2 = observable(12);
 *  let computed1 = computed(obs1, obs2, (use, v1, v2) => v1 + v2);
 *
 * or implicitly by using `use(obs)` function:
 *  let computed2 = computed(use => use(obs1) + use(obs2));
 *
 * In either case, computed1.get() and computed2.get() will have the value 17. If obs1 or obs2 is
 * changed, computed1 and computed2 will get recomputed automatically.
 *
 * Creating a computed allows any number of dependencies to be specified explicitly, and their
 * values will be passed to the read() callback. These may be combined with automatic dependencies
 * detected using use(). Note that constructor dependencies have less overhead.
 *
 *  let val = computed(...deps, ((use, ...depValues) => READ_CALLBACK));
 *
 * You may specify a `write` callback by calling `onWrite(WRITE_CALLBACK)`, which will be called
 * whenever set() is called on the computed by its user. If a `write` bacllback is not specified,
 * calling `set` on a computed observable will throw an exception.
 *
 * Note that pureComputed.js offers a variation of computed() with the same interface, but which
 * stays unsubscribed from dependencies while it itself has no subscribers.
 *
 * A computed may be used with a disposable value using `use.owner` as the value's owner. E.g.
 *    let val = computed((use) => Foo.create(use.owner, use(a), use(b)));
 *
 * When the computed() is re-evaluated, and when it itself is disposed, it disposes the previously
 * owned value. Note that only the pattern above works, i.e. use.owner may only be used to take
 * ownership of the same disposable that the callback returns.
 */



function _noWrite() {
    throw new Error("Can't write to non-writable computed");
}
class Computed extends _observable__WEBPACK_IMPORTED_MODULE_1__.Observable {
    /**
     * Internal constructor for a Computed observable. You should use computed() function instead.
     */
    constructor(callback, dependencies) {
        // At initialization we force an undefined value even though it's not of type T: it gets set
        // to a proper value during the creation of new Subscription, which calls this._read.
        super(undefined);
        this._callback = callback;
        this._write = _noWrite;
        this._sub = new _subscribe__WEBPACK_IMPORTED_MODULE_2__.Subscription(this._read.bind(this), dependencies, this);
    }
    /**
     * Creates a new Computed, owned by the given owner.
     * @param owner: Object to own this Computed, or null to handle disposal manually.
     * @param ...observables: Zero or more observables on which this computes depends. The callback
     *        will get called when any of these changes.
     * @param callback: Read callback that will be called with (use, ...values),
     *    i.e. the `use` function and values for all of the ...observables. The callback is called
     *    immediately and whenever any dependency changes.
     * @returns {Computed} The newly created computed observable.
     */
    static create(owner, ...args) {
        const readCb = args.pop();
        return (0,_dispose__WEBPACK_IMPORTED_MODULE_0__.setDisposeOwner)(owner, new Computed(readCb, args));
    }
    /**
     * Used by subscriptions to keep track of dependencies.
     */
    _getDepItem() {
        return this._sub._getDepItem();
    }
    /**
     * "Sets" the value of the computed by calling the write() callback if one was provided in the
     * constructor. Throws an error if there was no such callback (not a "writable" computed).
     * @param {Object} value: The value to pass to the write() callback.
     */
    set(value) { this._write(value); }
    /**
     * Set callback to call when this.set(value) is called, to make it a writable computed. If not
     * set, attempting to write to this computed will throw an exception.
     */
    onWrite(writeFunc) {
        this._write = writeFunc;
        return this;
    }
    /**
     * Disposes the computed, unsubscribing it from all observables it depends on.
     */
    dispose() {
        this._sub.dispose();
        super.dispose();
    }
    _read(use, ...args) {
        super.set(this._callback(use, ...args));
    }
}
/**
 * Creates a new Computed.
 * @param {Observable} ...observables: The initial params, of which there may be zero or more, are
 *    observables on which this computed depends. When any of them change, the read() callback
 *    will be called with the values of these observables as arguments.
 * @param {Function} readCallback: Read callback that will be called with (use, ...values),
 *    i.e. the `use` function and values for all of the ...observables. The callback is called
 *    immediately and whenever any dependency changes.
 * @returns {Computed} The newly created computed observable.
 */
function computed(...args) {
    const readCb = args.pop();
    return new Computed(readCb, args);
}
// TODO Consider implementing .singleUse() method.
// An open question is in how to pass e.g. kd.hide(computed(x, x => !x)) in such a way that
// the temporary computed can be disposed when temporary, but not otherwise. A function-only
// syntax is kd.hide(use => !use(x)), but prevents use of static subscriptions.
//
// (a) function-only use of computeds is fine and useful.
// (b) pureComputed is another option, and doesn't technically require getting disposed.
// (c) kd.hide(compObs), kd.autoDispose(compObs) is more general and
//     can be replaced more concisely by kd.hide(compObs.singleUse())
// .singleUse() automatically disposes a computed (or an observable?) once there are no
// subscriptions to it. If there are no subscriptions at the time of this call, waits for the next
// tick, and possibly disposes then.


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/dispose.js":
/*!******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/dispose.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disposable": () => (/* binding */ Disposable),
/* harmony export */   "Holder": () => (/* binding */ Holder),
/* harmony export */   "MultiHolder": () => (/* binding */ MultiHolder),
/* harmony export */   "setDisposeOwner": () => (/* binding */ setDisposeOwner)
/* harmony export */ });
/* harmony import */ var _emit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emit */ "./node_modules/grainjs/dist/esm/lib/emit.js");
/**
 * dispose.js provides tools to objects that needs to dispose resources, such as destroy DOM, and
 * unsubscribe from events. The motivation with examples is presented here:
 *
 *    https://phab.getgrist.com/w/disposal/
 *
 * Disposable is a class for components that need cleanup (e.g. maintain DOM, listen to events,
 * subscribe to anything). It provides a .dispose() method that should be called to destroy the
 * component, and .onDispose()/.autoDispose() methods that the component should use to take
 * responsibility for other pieces that require cleanup.
 *
 * To define a disposable class:
 *    class Foo extends Disposable { ... }
 *
 * To create Foo:
 *    const foo = Foo.create(owner, ...args);
 * This is better than `new Foo` for two reasons:
 *    1. If Foo's constructor throws an exception, any disposals registered in that constructor
 *       before the exception are honored.
 *    2. It ensures you specify the owner of the new instance (but you can use null to skip it).
 *
 * In Foo's constructor (or rarely methods), take ownership of other Disposable objects:
 *    this.bar = Bar.create(this, ...);
 *
 * For objects that are not instances of Disposable but have a .dispose() methods, use:
 *    this.bar = this.autoDispose(createSomethingDisposable());
 *
 * To call a function on disposal (e.g. to add custom disposal logic):
 *    this.onDispose(() => this.myUnsubscribeAllMethod());
 *    this.onDispose(this.myUnsubscribeAllMethod, this);    // slightly more efficient
 *
 * To mark this object to be wiped out on disposal (i.e. set all properties to null):
 *    this.wipeOnDispose();
 * See the documentation of that method for more info.
 *
 * To dispose Foo directly:
 *    foo.dispose();
 * To determine if an object has already been disposed:
 *    foo.isDisposed()
 *
 * If you need to replace an owned object, or release, or dispose it early, use a Holder:
 *    this._holder = Holder.create(this);
 *    Bar.create(this._holder, 1);      // creates new Bar(1)
 *    Bar.create(this._holder, 2);      // creates new Bar(2) and disposes previous object
 *    this._holder.clear();             // disposes contained object
 *    this._holder.release();           // releases contained object
 *
 * If you need a container for multiple objects and dispose them all together, use a MultiHolder:
 *    this._mholder = MultiHolder.create(null);
 *    Bar.create(this._mholder, 1);     // create new Bar(1)
 *    Bar.create(this._mholder, 2);     // create new Bar(2)
 *    this._mholder.dispose();          // disposes both objects
 *
 * If creating your own class with a dispose() method, do NOT throw exceptions from dispose().
 * These cannot be handled properly in all cases. Read here about the same issue in C++:
 *    http://bin-login.name/ftp/pub/docs/programming_languages/cpp/cffective_cpp/MAGAZINE/SU_FRAME.HTM#destruct
 *
 * Using a parametrized (generic) class as a Disposable is tricky. E.g.
 *    class Bar<T> extends Disposable { ... }
 *    // Bar<T>.create(...)   <-- doesn't work
 *    // Bar.create<T>(...)   <-- doesn't work
 *    // Bar.create(...)      <-- works, but with {} for Bar's type parameters
 *
 * The solution is to expose the constructor type using a helper method:
 *    class Bar<T> extends Disposable {
 *      // Note the tuple below which must match the constructor parameters of Bar<U>.
 *      public static ctor<U>(): IDisposableCtor<Bar<U>, [U, boolean]> { return this; }
 *      constructor(a: T, b: boolean) { ... }
 *    }
 *    Bar.ctor<T>().create(...)   // <-- works, creates Bar<T>, and does type-checking!
 */

// Internal "owner" of disposable objects which doesn't actually dispose or keep track of them. It
// is the effective owner when creating a Disposable with `new Foo()` rather than `Foo.create()`.
const _noopOwner = {
    autoDispose(obj) { },
};
// Newly-created Disposable instances will have this as their owner. This is not a constant, it
// is used by create() for the safe creation of Disposables.
let _defaultDisposableOwner = _noopOwner;
/**
 * Base class for disposable objects that can own other objects. See the module documentation.
 */
class Disposable {
    constructor() {
        this._disposalList = new DisposalList();
        // This registers with a temp Holder when using create(), and is a no-op when using `new Foo`.
        _defaultDisposableOwner.autoDispose(this);
        // Be sure to reset to no-op, so that a (non-recommended) direct call like 'new Bar()', from
        // inside Foo's constructor doesn't use the same Holder that's temporarily holding Foo.
        _defaultDisposableOwner = _noopOwner;
    }
    /**
     * Create Disposable instances using `Class.create(owner, ...)` rather than `new Class(...)`.
     *
     * This reminds you to provide an owner, and ensures that if the constructor throws an
     * exception, dispose() gets called to clean up the partially-constructed object.
     *
     * Owner may be null if intend to ensure disposal some other way.
     */
    static create(owner, ...args) {
        const origDefaultOwner = _defaultDisposableOwner;
        const holder = new Holder();
        try {
            // The newly-created object will have holder as its owner.
            _defaultDisposableOwner = holder;
            return setDisposeOwner(owner, new this(...args));
        }
        catch (e) {
            try {
                // This calls dispose on the partially-constructed object
                holder.clear();
            }
            catch (e2) {
                // tslint:disable-next-line:no-console
                console.error("Error disposing partially constructed %s:", this.name, e2);
            }
            throw e;
        }
        finally {
            // On success, the new object has a new owner, and we release it from holder.
            // On error, the holder has been cleared, and the release() is a no-op.
            holder.release();
            _defaultDisposableOwner = origDefaultOwner;
        }
    }
    /** Take ownership of obj, and dispose it when this.dispose() is called. */
    autoDispose(obj) {
        this.onDispose(obj.dispose, obj);
        return obj;
    }
    /** Call the given callback when this.dispose() is called. */
    onDispose(callback, context) {
        return this._disposalList.addListener(callback, context);
    }
    /**
     * Wipe out this object when it is disposed, i.e. set all its properties to null. It is
     * recommended to call this early in the constructor.
     *
     * This makes disposal more costly, but has certain benefits:
     * - If anything still refers to the object and uses it, we'll get an early error, rather than
     *   silently keep going, potentially doing useless work (or worse) and wasting resources.
     * - If anything still refers to the object (even without using it), the fields of the object
     *   can still be garbage-collected.
     * - If there are circular references involving this object, they get broken, making the job
     *   easier for the garbage collector.
     *
     * The recommendation is to use it for complex, longer-lived objects, but to skip for objects
     * which are numerous and short-lived (and less likely to be referenced from unexpected places).
     */
    wipeOnDispose() {
        this.onDispose(this._wipeOutObject, this);
    }
    /**
     * Returns whether this object has already been disposed.
     */
    isDisposed() {
        return this._disposalList === null;
    }
    /**
     * Clean up `this` by disposing all owned objects, and calling onDispose() callbacks, in reverse
     * order to that in which they were added.
     */
    dispose() {
        const disposalList = this._disposalList;
        if (!disposalList) {
            // tslint:disable-next-line:no-console
            console.error("Error disposing %s which is already disposed", _describe(this));
        }
        else {
            this._disposalList = null;
            disposalList.callAndDispose(this);
        }
    }
    /**
     * Wipe out this object by setting each property to null. This is helpful for objects that are
     * disposed and should be ready to be garbage-collected.
     */
    _wipeOutObject() {
        // The sentinel value doesn't have to be null, but some values cause more helpful errors than
        // others. E.g. if a.x = "disposed", then a.x.foo() throws "undefined is not a function", but
        // when a.x = null, a.x.foo() throws a more helpful "Cannot read property 'foo' of null".
        for (const k of Object.keys(this)) {
            this[k] = null;
        }
    }
}
/**
 * Holder keeps a single disposable object. If given responsibility for another object using
 * holder.autoDispose() or Foo.create(holder, ...), it automatically disposes the currently held
 * object. It also disposes it when the holder itself is disposed.
 *
 * If the object is an instance of Disposable, the holder will also notice when the object gets
 * disposed from outside of it, in which case the holder will become empty again.
 */
class Holder {
    constructor() {
        this._owned = null;
        this._disposalListener = undefined;
    }
    static create(owner) {
        return setDisposeOwner(owner, new Holder());
    }
    /** Take ownership of a new object, disposing the previously held one. */
    autoDispose(obj) {
        this.clear();
        this._owned = obj;
        if (obj instanceof Disposable) {
            this._disposalListener = obj.onDispose(this._onOutsideDispose, this);
        }
        return obj;
    }
    /** Releases the held object without disposing it, emptying the holder. */
    release() {
        this._unlisten();
        const ret = this._owned;
        this._owned = null;
        return ret;
    }
    /** Disposes the held object and empties the holder. */
    clear() {
        this._unlisten();
        const owned = this._owned;
        if (owned) {
            this._owned = null;
            owned.dispose();
        }
    }
    /** Returns the held object, or null if the Holder is empty. */
    get() { return this._owned; }
    /** Returns whether the Holder is empty. */
    isEmpty() { return !this._owned; }
    /** When the holder is disposed, it disposes the held object if any. */
    dispose() { this.clear(); }
    /** Stop listening for the disposal of this._owned. */
    _unlisten() {
        const disposalListener = this._disposalListener;
        if (disposalListener) {
            this._disposalListener = undefined;
            disposalListener.dispose();
        }
    }
    _onOutsideDispose() {
        this._disposalListener = undefined;
        this._owned = null;
    }
}
/**
 * MultiHolder keeps multiple disposable object. It disposes all held object when the holder
 * itself is disposed. It's actually nothing more than the Disposable base class itself, just
 * exposed with a clearer name that describes its purpose.
 */
class MultiHolder extends Disposable {
}
/**
 * Sets owner of obj (i.e. calls owner.autoDispose(obj)) unless owner is null. Returns obj.
 */
function setDisposeOwner(owner, obj) {
    if (owner) {
        owner.autoDispose(obj);
    }
    return obj;
}
/**
 * Helper for reporting errors during disposal. Try to report the type of the object.
 */
function _describe(obj) {
    return (obj && obj.constructor && obj.constructor.name ? obj.constructor.name : '' + obj);
}
/**
 * DisposalList is an internal class mimicking emit.Emitter. The difference is that callbacks are
 * called in reverse order, and exceptions in callbacks are reported and swallowed.
 */
class DisposalList extends _emit__WEBPACK_IMPORTED_MODULE_0__.LLink {
    constructor() { super(); }
    addListener(callback, optContext) {
        const lis = new DisposeListener(callback, optContext);
        this._insertBefore(this._next, lis);
        return lis;
    }
    /**
     * Call all callbacks and dispose this object. The owner is required for better reporting of
     * errors if any callback throws.
     */
    callAndDispose(owner) {
        try {
            DisposeListener.callAll(this._next, this, owner);
        }
        finally {
            this._disposeList();
        }
    }
}
/**
 * Internal class that keeps track of one item of the DisposalList. It mimicks emit.Listener, but
 * reports and swallows erros when it calls the callbacks in the list.
 */
class DisposeListener extends _emit__WEBPACK_IMPORTED_MODULE_0__.LLink {
    constructor(callback, context) {
        super();
        this.callback = callback;
        this.context = context;
    }
    static callAll(begin, end, owner) {
        while (begin !== end) {
            const lis = begin;
            try {
                lis.callback.call(lis.context);
            }
            catch (e) {
                // tslint:disable-next-line:no-console
                console.error("While disposing %s, error disposing %s: %s", _describe(owner), _describe(this), e);
            }
            begin = lis._next;
        }
    }
    dispose() {
        if (this.isDisposed()) {
            return;
        }
        this._removeNode(this);
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/dom.js":
/*!**************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/dom.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "find": () => (/* reexport safe */ _domImpl__WEBPACK_IMPORTED_MODULE_0__.find),
/* harmony export */   "findAll": () => (/* reexport safe */ _domImpl__WEBPACK_IMPORTED_MODULE_0__.findAll),
/* harmony export */   "frag": () => (/* reexport safe */ _domImpl__WEBPACK_IMPORTED_MODULE_0__.frag),
/* harmony export */   "svg": () => (/* reexport safe */ _domImpl__WEBPACK_IMPORTED_MODULE_0__.svg),
/* harmony export */   "update": () => (/* reexport safe */ _domImpl__WEBPACK_IMPORTED_MODULE_0__.update),
/* harmony export */   "create": () => (/* reexport safe */ _domComponent__WEBPACK_IMPORTED_MODULE_1__.create),
/* harmony export */   "domComputed": () => (/* reexport safe */ _domComputed__WEBPACK_IMPORTED_MODULE_2__.domComputed),
/* harmony export */   "maybe": () => (/* reexport safe */ _domComputed__WEBPACK_IMPORTED_MODULE_2__.maybe),
/* harmony export */   "replaceContent": () => (/* reexport safe */ _domComputed__WEBPACK_IMPORTED_MODULE_2__.replaceContent),
/* harmony export */   "_disposeNode": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__._disposeNode),
/* harmony export */   "autoDispose": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.autoDispose),
/* harmony export */   "autoDisposeElem": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.autoDisposeElem),
/* harmony export */   "domDispose": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.domDispose),
/* harmony export */   "domDisposeHooks": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.domDisposeHooks),
/* harmony export */   "onDispose": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.onDispose),
/* harmony export */   "onDisposeElem": () => (/* reexport safe */ _domDispose__WEBPACK_IMPORTED_MODULE_3__.onDisposeElem),
/* harmony export */   "forEach": () => (/* reexport safe */ _domForEach__WEBPACK_IMPORTED_MODULE_4__.forEach),
/* harmony export */   "attr": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.attr),
/* harmony export */   "attrElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrElem),
/* harmony export */   "attrs": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrs),
/* harmony export */   "attrsElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrsElem),
/* harmony export */   "boolAttr": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.boolAttr),
/* harmony export */   "boolAttrElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.boolAttrElem),
/* harmony export */   "cls": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.cls),
/* harmony export */   "clsElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.clsElem),
/* harmony export */   "clsPrefix": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.clsPrefix),
/* harmony export */   "data": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.data),
/* harmony export */   "dataElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.dataElem),
/* harmony export */   "getData": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.getData),
/* harmony export */   "hide": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.hide),
/* harmony export */   "hideElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.hideElem),
/* harmony export */   "makeTestId": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.makeTestId),
/* harmony export */   "noTestId": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.noTestId),
/* harmony export */   "prop": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.prop),
/* harmony export */   "propElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.propElem),
/* harmony export */   "show": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.show),
/* harmony export */   "showElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.showElem),
/* harmony export */   "style": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.style),
/* harmony export */   "styleElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.styleElem),
/* harmony export */   "text": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.text),
/* harmony export */   "textElem": () => (/* reexport safe */ _domMethods__WEBPACK_IMPORTED_MODULE_5__.textElem),
/* harmony export */   "on": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.on),
/* harmony export */   "onElem": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onElem),
/* harmony export */   "onKeyDown": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyDown),
/* harmony export */   "onKeyElem": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyElem),
/* harmony export */   "onKeyPress": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyPress),
/* harmony export */   "onMatch": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onMatch),
/* harmony export */   "onMatchElem": () => (/* reexport safe */ _domevent__WEBPACK_IMPORTED_MODULE_6__.onMatchElem),
/* harmony export */   "dom": () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _domImpl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domImpl */ "./node_modules/grainjs/dist/esm/lib/domImpl.js");
/* harmony import */ var _domComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domComponent */ "./node_modules/grainjs/dist/esm/lib/domComponent.js");
/* harmony import */ var _domComputed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domComputed */ "./node_modules/grainjs/dist/esm/lib/domComputed.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _domForEach__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./domForEach */ "./node_modules/grainjs/dist/esm/lib/domForEach.js");
/* harmony import */ var _domMethods__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./domMethods */ "./node_modules/grainjs/dist/esm/lib/domMethods.js");
/* harmony import */ var _domevent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./domevent */ "./node_modules/grainjs/dist/esm/lib/domevent.js");
/**
 * dom.js provides a way to build a DOM tree easily.
 *
 * E.g.
 *  import {dom} from 'grainjs';
 *  dom('a#link.c1.c2', {'href': url}, 'Hello ', dom('span', 'world'));
 *    creates Node <a id="link" class="c1 c2" href={{url}}Hello <span>world</span></a>.
 *
 *  dom.frag(dom('span', 'Hello'), ['blah', dom('div', 'world')])
 *    creates document fragment with <span>Hello</span>blah<div>world</div>.
 *
 * DOM can also be created and modified inline during creation:
 *  dom('a#id.c1',
 *      dom.cls('c2'), dom.attr('href', url),
 *      dom.text('Hello '), dom('span', dom.text('world')))
 *    creates Node <a id="link" class="c1 c2" href={{url}}Hello <span>world</span></a>,
 *    identical to the first example above.
 */
// We keep various dom-related functions organized in private modules, but they are exposed here.















// We just want to re-export _domImpl.dom, but to allow adding methods to it in a typesafe way,
// TypeScript wants us to declare a real function in the same file.
function dom(tagString, ...args) {
    return (0,_domImpl__WEBPACK_IMPORTED_MODULE_0__.dom)(tagString, ...args);
}
// Additionally export all methods as properties of dom() function.
(function (dom) {
    dom.svg = _domImpl__WEBPACK_IMPORTED_MODULE_0__.svg;
    dom.frag = _domImpl__WEBPACK_IMPORTED_MODULE_0__.frag;
    dom.update = _domImpl__WEBPACK_IMPORTED_MODULE_0__.update;
    dom.find = _domImpl__WEBPACK_IMPORTED_MODULE_0__.find;
    dom.findAll = _domImpl__WEBPACK_IMPORTED_MODULE_0__.findAll;
    dom.domDispose = _domDispose__WEBPACK_IMPORTED_MODULE_3__.domDispose;
    dom.onDisposeElem = _domDispose__WEBPACK_IMPORTED_MODULE_3__.onDisposeElem;
    dom.onDispose = _domDispose__WEBPACK_IMPORTED_MODULE_3__.onDispose;
    dom.autoDisposeElem = _domDispose__WEBPACK_IMPORTED_MODULE_3__.autoDisposeElem;
    dom.autoDispose = _domDispose__WEBPACK_IMPORTED_MODULE_3__.autoDispose;
    dom.attrsElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrsElem;
    dom.attrs = _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrs;
    dom.attrElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.attrElem;
    dom.attr = _domMethods__WEBPACK_IMPORTED_MODULE_5__.attr;
    dom.boolAttrElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.boolAttrElem;
    dom.boolAttr = _domMethods__WEBPACK_IMPORTED_MODULE_5__.boolAttr;
    dom.textElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.textElem;
    dom.text = _domMethods__WEBPACK_IMPORTED_MODULE_5__.text;
    dom.styleElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.styleElem;
    dom.style = _domMethods__WEBPACK_IMPORTED_MODULE_5__.style;
    dom.propElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.propElem;
    dom.prop = _domMethods__WEBPACK_IMPORTED_MODULE_5__.prop;
    dom.showElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.showElem;
    dom.show = _domMethods__WEBPACK_IMPORTED_MODULE_5__.show;
    dom.hideElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.hideElem;
    dom.hide = _domMethods__WEBPACK_IMPORTED_MODULE_5__.hide;
    dom.clsElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.clsElem;
    dom.cls = _domMethods__WEBPACK_IMPORTED_MODULE_5__.cls;
    dom.clsPrefix = _domMethods__WEBPACK_IMPORTED_MODULE_5__.clsPrefix;
    dom.dataElem = _domMethods__WEBPACK_IMPORTED_MODULE_5__.dataElem;
    dom.data = _domMethods__WEBPACK_IMPORTED_MODULE_5__.data;
    dom.getData = _domMethods__WEBPACK_IMPORTED_MODULE_5__.getData;
    dom.replaceContent = _domComputed__WEBPACK_IMPORTED_MODULE_2__.replaceContent;
    dom.domComputed = _domComputed__WEBPACK_IMPORTED_MODULE_2__.domComputed;
    dom.maybe = _domComputed__WEBPACK_IMPORTED_MODULE_2__.maybe;
    dom.forEach = _domForEach__WEBPACK_IMPORTED_MODULE_4__.forEach;
    dom.create = _domComponent__WEBPACK_IMPORTED_MODULE_1__.create;
    dom.onElem = _domevent__WEBPACK_IMPORTED_MODULE_6__.onElem;
    dom.on = _domevent__WEBPACK_IMPORTED_MODULE_6__.on;
    dom.onMatchElem = _domevent__WEBPACK_IMPORTED_MODULE_6__.onMatchElem;
    dom.onMatch = _domevent__WEBPACK_IMPORTED_MODULE_6__.onMatch;
    dom.onKeyElem = _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyElem;
    dom.onKeyPress = _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyPress;
    dom.onKeyDown = _domevent__WEBPACK_IMPORTED_MODULE_6__.onKeyDown;
})(dom || (dom = {}));


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domComponent.js":
/*!***********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domComponent.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create)
/* harmony export */ });
/* harmony import */ var _dispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispose */ "./node_modules/grainjs/dist/esm/lib/dispose.js");
/* harmony import */ var _domComputed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domComputed */ "./node_modules/grainjs/dist/esm/lib/domComputed.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/**
 * UI components that can be inserted into dom().
 *
 * Components are created and inserted using dom.create():
 *
 *    dom('div',
 *      dom.create(MyWidget, ...myArgs),        // Calls MyWidget.create(owner, ...myArgs)
 *      dom.create(createMyWidget, ...myArgs),  // Calls createMyWidget(owner, ...myArgs)
 *    )
 *
 * The first argument may be a function, which is called directly, or a class with a .create()
 * static method, in which case that's what gets called.
 *
 * In both cases, the call gets a first argument of `owner` followed by the rest of the arguments
 * to dom.create(). The `owner` is a MultiHolder that will own this component. This works
 * naturally with any class that derives from Disposable, since it then has a suitable static
 * create() method.
 *
 * Function-based components may use owner to easily handle disposal. For example:
 *
 *    dom.create(createMyWidget)
 *    function createMyWidget(owner) {
 *      const foo = Foo.create(owner);
 *      return dom('div', foo.getTitle());
 *    }
 *
 * The `owner` argument is the main benefit of dom.create(). Logically, the owner is the DOM where
 * the component is attached. When the parent DOM element is disposed, so is the component.
 *
 *    [Explanation] To understand why the syntax is such, consider a potential alternative such as:
 *
 *       dom('div', _insert_(new Comp1()), _insert_(new Comp2(...args)))
 *
 *    In both cases, the constructor for Comp1 runs before the constructor for Comp2. What happens
 *    when Comp2's constructor throws an exception? In the second case, nothing yet owns the
 *    created Comp1 component, and it will never get cleaned up. With dom.create(), the DOM
 *    gets ownership of Comp1 early enough and will dispose it.
 *
 * A function component may return DOM directly. A class component returns the class instance,
 * which must have a .buildDom() method which will be called right after the constructor to get
 * the DOM. Note that buildDom is only called once.
 *
 * A function component may also return an object with .buildDom(). So these are equivalent:
 *
 *    dom.create(MyWidget)
 *    dom.create((owner) => MyWidget.create(owner))
 *
 * Note that ownership should be handled using the `owner` argument. Don't do this:
 *
 *    // NON-EXAMPLE: Nothing will dispose the created object:
 *    // dom.create(() => new MyWidget());
 *
 * The returned DOM may includes Nodes, strings, and domComputed() values, as well as arrays of
 * any of these. In other words, any DomArg goes except DomMethods. All the DOM returned will be
 * disposed when the containing element is disposed, followed by the `owner` itself.
 */



function create(fn, ...args) {
    const [markerPre, markerPost, func] = (0,_domComputed__WEBPACK_IMPORTED_MODULE_1__.domComputed)(null, () => {
        // Note that the callback to domComputed() is not called until the markers have been attached
        // to the parent element. We attach the MultiHolder's disposal to markerPost the way
        // domComputed() normally attaches its own bindings.
        const owner = _dispose__WEBPACK_IMPORTED_MODULE_0__.MultiHolder.create(null);
        (0,_domDispose__WEBPACK_IMPORTED_MODULE_2__.autoDisposeElem)(markerPost, owner);
        const value = ('create' in fn) ?
            fn.create(owner, ...args) :
            fn(owner, ...args);
        return (value && typeof value === 'object' && 'buildDom' in value) ?
            value.buildDom() : value;
    });
    return [markerPre, markerPost, func];
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domComputed.js":
/*!**********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domComputed.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "replaceContent": () => (/* binding */ replaceContent),
/* harmony export */   "domComputed": () => (/* binding */ domComputed),
/* harmony export */   "maybe": () => (/* binding */ maybe)
/* harmony export */ });
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding */ "./node_modules/grainjs/dist/esm/lib/binding.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _domImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domImpl */ "./node_modules/grainjs/dist/esm/lib/domImpl.js");
/* harmony import */ var _browserGlobals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./browserGlobals */ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js");



// Use the browser globals in a way that allows replacing them with mocks in tests.

/**
 * Replaces the content between nodeBefore and nodeAfter, which should be two siblings within the
 * same parent node. New content may be anything allowed as an argument to dom(), including null
 * to insert nothing. Runs disposers, if any, on all removed content.
 */
function replaceContent(nodeBefore, nodeAfter, content) {
    const elem = nodeBefore.parentNode;
    if (elem) {
        let next;
        for (let n = nodeBefore.nextSibling; n && n !== nodeAfter; n = next) {
            next = n.nextSibling;
            (0,_domDispose__WEBPACK_IMPORTED_MODULE_1__.domDispose)(n);
            elem.removeChild(n);
        }
        if (content) {
            elem.insertBefore(content instanceof _browserGlobals__WEBPACK_IMPORTED_MODULE_3__.G.Node ? content : (0,_domImpl__WEBPACK_IMPORTED_MODULE_2__.frag)(content), nodeAfter);
        }
    }
}
function domComputed(valueObs, contentFunc = identity) {
    const markerPre = _browserGlobals__WEBPACK_IMPORTED_MODULE_3__.G.document.createComment('a');
    const markerPost = _browserGlobals__WEBPACK_IMPORTED_MODULE_3__.G.document.createComment('b');
    // Function is added after markerPre and markerPost, so that it runs once they have already been
    // attached to elem (the parent element).
    return [markerPre, markerPost, (elem) => {
            (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(markerPost, valueObs, (value) => replaceContent(markerPre, markerPost, contentFunc(value)));
        }];
}
function identity(arg) { return arg; }
/**
 * Conditionally appends DOM to an element. The value may be an observable or function (from which
 * a computed is created), whose value -- if truthy -- will be passed to `contentFunc` which
 * should return DOM content. If the value is falsy, DOM content is removed.
 *
 * Note that if the observable changes between different truthy values, contentFunc gets called
 * for each value, and previous content gets destroyed. To consider all truthy values the same,
 * use an observable that returns a proper boolean, e.g.
 *
 *    dom.maybe(use => Boolean(use(fooObs)), () => dom(...));
 *
 * As with domComputed(), dom.maybe() may but should not be used when the argument is not an
 * observable or function. The following are equivalent:
 *
 *    dom(..., dom.maybe(myValue, () => dom(...)));
 *    dom(..., myValue ? dom(...) : null);
 *
 * The latter is preferred for being simpler.
 *
 * @param boolValueObs: Observable or function for a computed.
 * @param contentFunc: Called with the result of boolValueObs when it is truthy. Should return DOM.
 */
function maybe(boolValueObs, contentFunc) {
    return domComputed(boolValueObs, (value) => value ? contentFunc(value) : null);
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domDispose.js":
/*!*********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domDispose.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_disposeNode": () => (/* binding */ _disposeNode),
/* harmony export */   "domDisposeHooks": () => (/* binding */ domDisposeHooks),
/* harmony export */   "domDispose": () => (/* binding */ domDispose),
/* harmony export */   "onDisposeElem": () => (/* binding */ onDisposeElem),
/* harmony export */   "onDispose": () => (/* binding */ onDispose),
/* harmony export */   "autoDisposeElem": () => (/* binding */ autoDisposeElem),
/* harmony export */   "autoDispose": () => (/* binding */ autoDispose)
/* harmony export */ });
/**
 * Private global disposal map. It maintains the association between DOM nodes and cleanup
 * functions added with dom.onDispose(). To support multiple disposers on one element, we use a
 * WeakMap-based linked list:
 *
 *    _disposeMap[elem] = disposer2;
 *    _disposeMap[disposer2] = disposer1;
 *    etc.
 *
 * This avoids allocating arrays or using undeclared properties for a different linked list.
 */
const _disposeMap = new WeakMap();
// Internal helper to walk the DOM tree, calling visitFunc(elem) on all descendants of elem.
// Descendants are processed first.
function _walkDom(elem, visitFunc) {
    let c = elem.firstChild;
    while (c) {
        // Note: this might be better done using an explicit stack, but in practice DOM trees aren't
        // so deep as to cause problems.
        _walkDom(c, visitFunc);
        c = c.nextSibling;
    }
    visitFunc(elem);
}
// Internal helper to run all disposers for a single element.
function _disposeNode(node) {
    let disposer = _disposeMap.get(node);
    if (disposer) {
        let key = node;
        do {
            _disposeMap.delete(key);
            disposer(node);
            // Find the next disposer; these are chained when there are multiple.
            key = disposer;
            disposer = _disposeMap.get(key);
        } while (disposer);
    }
}
function _disposeNodeRecursive(node) {
    _walkDom(node, domDisposeHooks.disposeNode);
}
/**
 * Support for extending dom disposal. This is very low-level, and needs utmost care. Any
 * disposers set should take care of calling the original versions of the disposers.
 */
const domDisposeHooks = {
    disposeNode: _disposeNode,
    disposeRecursive: _disposeNodeRecursive,
};
/**
 * Run disposers associated with any descendant of elem or with elem itself. Disposers get
 * associated with elements using dom.onDispose(). Descendants are processed first.
 *
 * It is automatically called if one of the function arguments to dom() throws an exception during
 * element creation. This way any onDispose() handlers set on the unfinished element get called.
 *
 * @param {Node} node: The element to run disposers on.
 */
function domDispose(node) {
    domDisposeHooks.disposeRecursive(node);
}
/**
 * Associate a disposerFunc with a DOM element. It will be called when the element is disposed
 * using domDispose() on it or any of its parents. If onDispose is called multiple times, all
 * disposerFuncs will be called in reverse order.
 * @param {Element} elem: The element to associate the disposer with.
 * @param {Function} disposerFunc(elem): Will be called when domDispose() is called on the
 *    element or its ancestor.
 * Note that it is not necessary usually to dispose event listeners attached to an element (e.g.
 * with dom.on()) since their lifetime is naturally limited to the lifetime of the element.
 */
function onDisposeElem(elem, disposerFunc) {
    const prevDisposer = _disposeMap.get(elem);
    _disposeMap.set(elem, disposerFunc);
    if (prevDisposer) {
        _disposeMap.set(disposerFunc, prevDisposer);
    }
}
function onDispose(disposerFunc) {
    return (elem) => onDisposeElem(elem, disposerFunc);
}
/**
 * Make the given element own the disposable, and call its dispose method when domDispose() is
 * called on the element or any of its parents.
 * @param {Element} elem: The element to own the disposable.
 * @param {Disposable} disposable: Anything with a .dispose() method.
 */
function autoDisposeElem(elem, disposable) {
    if (disposable) {
        onDisposeElem(elem, () => disposable.dispose());
    }
}
function autoDispose(disposable) {
    if (disposable) {
        return (elem) => autoDisposeElem(elem, disposable);
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domForEach.js":
/*!*********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domForEach.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _domComputed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domComputed */ "./node_modules/grainjs/dist/esm/lib/domComputed.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _domImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domImpl */ "./node_modules/grainjs/dist/esm/lib/domImpl.js");
/* harmony import */ var _obsArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./obsArray */ "./node_modules/grainjs/dist/esm/lib/obsArray.js");
/* harmony import */ var _browserGlobals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./browserGlobals */ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js");




// Use the browser globals in a way that allows replacing them with mocks in tests.

/**
 * Creates DOM elements for each element of an observable array. As the array is changed, children
 * are added or removed. This works for any array-valued observable, and for obsArray() and
 * computedArray() it works more efficiently for simple changes.
 *
 * The given itemCreateFunc() should return a single DOM node for each item, or null to skip that
 * item. It is called for new items whenever they are spliced in, or the array replaced. The
 * forEach() owns the created nodes, and runs domDispose() on them when they are spliced out.
 *
 * If the created nodes are removed from their parent externally, forEach() will cope with it, but
 * will consider these elements as no longer owned, and will not run domDispose() on them.
 *
 * Note that itemCreateFunc() does not receive an index: an index would only be correct at the
 * time the item is created, and would not reflect further changes to the array.
 *
 * If you'd like to map the DOM node back to its source item, use dom.data() and dom.getData() in
 * itemCreateFunc().
 */
function forEach(obsArray, itemCreateFunc) {
    return (elem) => {
        const markerPre = _browserGlobals__WEBPACK_IMPORTED_MODULE_4__.G.document.createComment('a');
        const markerPost = _browserGlobals__WEBPACK_IMPORTED_MODULE_4__.G.document.createComment('b');
        elem.appendChild(markerPre);
        elem.appendChild(markerPost);
        if (Array.isArray(obsArray)) {
            (0,_domComputed__WEBPACK_IMPORTED_MODULE_0__.replaceContent)(markerPre, markerPost, obsArray.map(itemCreateFunc));
            return;
        }
        const nodes = (0,_obsArray__WEBPACK_IMPORTED_MODULE_3__.computedArray)(obsArray, itemCreateFunc);
        // Be sure to dispose the newly-created array when the DOM it's associated with is gone.
        (0,_domDispose__WEBPACK_IMPORTED_MODULE_1__.autoDisposeElem)(markerPost, nodes);
        nodes.addListener((newArr, oldArr, splice) => {
            if (splice) {
                // Remove the elements that are gone.
                for (const node of splice.deleted) {
                    if (node && node.parentNode === elem) {
                        (0,_domDispose__WEBPACK_IMPORTED_MODULE_1__.domDispose)(node);
                        elem.removeChild(node);
                    }
                }
                if (splice.numAdded > 0) {
                    // Find a valid child immediately following the spliced out portion, for DOM insertion.
                    const endIndex = splice.start + splice.numAdded;
                    let nextElem = markerPost;
                    for (let i = endIndex; i < newArr.length; i++) {
                        const node = newArr[i];
                        if (node && node.parentNode === elem) {
                            nextElem = node;
                            break;
                        }
                    }
                    // Insert the new elements.
                    const content = (0,_domImpl__WEBPACK_IMPORTED_MODULE_2__.frag)(newArr.slice(splice.start, endIndex));
                    elem.insertBefore(content, nextElem);
                }
            }
            else {
                (0,_domComputed__WEBPACK_IMPORTED_MODULE_0__.replaceContent)(markerPre, markerPost, newArr);
            }
        });
        (0,_domComputed__WEBPACK_IMPORTED_MODULE_0__.replaceContent)(markerPre, markerPost, nodes.get());
    };
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domImpl.js":
/*!******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domImpl.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dom": () => (/* binding */ dom),
/* harmony export */   "svg": () => (/* binding */ svg),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "frag": () => (/* binding */ frag),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findAll": () => (/* binding */ findAll)
/* harmony export */ });
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _domMethods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domMethods */ "./node_modules/grainjs/dist/esm/lib/domMethods.js");
/* harmony import */ var _browserGlobals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browserGlobals */ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js");


// Use the browser globals in a way that allows replacing them with mocks in tests.

// The goal of the above declarations is to get help from TypeScript in detecting incorrect usage:
// (See test/types/dom.ts for a test of this.)
//  import {text, hide} from './domMethods';
//  dom('div', text('hello'));        // OK
//  dom('div', hide(true));           // OK
//  dom('div', {title: 'hello'});     // OK
//  frag(text('hello'));              // OK
//  frag(hide(true));                 // Bad: DocumentFragment is not an Element
//  frag({title: 'hello'});           // Bad: DocumentFragment is not an Element
/**
 * dom('tag#id.class1.class2', ...args)
 *   The first argument is a string consisting of a tag name, with optional #foo suffix
 *   to add the ID 'foo', and zero or more .bar suffixes to add a CSS class 'bar'.
 *
 *   NOTE that better typings are available when a tag is used directly, e.g.
 *      dom('input', {id: 'foo'}, (elem) => ...) --> elem has type HTMLInputElement
 *      dom('input#foo',          (elem) => ...) --> elem has type HTMLElement
 *
 * The rest of the arguments are optional and may be:
 *
 *   Nodes - which become children of the created element;
 *   strings - which become text node children;
 *   objects - of the form {attr: val} to set additional attributes on the element;
 *   Arrays - which are flattened with each item processed recursively;
 *   functions - which are called with elem as the argument, for a chance to modify the
 *       element as it's being created. Return values are processed recursively.
 *   "dom methods" - expressions such as `dom.attr('href', url)` or `dom.hide(obs)`, which
 *       are actually special cases of the "functions" category.
 */
function dom(tagString, ...args) {
    return _updateWithArgsOrDispose(_createFromTagString(_createElementHtml, tagString), args);
}
/**
 * svg('tag#id.class1.class2', ...args)
 *  Same as dom(...), but creates an SVG element.
 */
function svg(tagString, ...args) {
    return _updateWithArgsOrDispose(_createFromTagString(_createElementSvg, tagString), args);
}
// Internal helper used to create HTML elements.
function _createElementHtml(tag) {
    return _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createElement(tag);
}
// Internal helper used to create SVG elements.
function _createElementSvg(tag) {
    return _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createElementNS("http://www.w3.org/2000/svg", tag);
}
/**
 * Internal helper to parse tagString, create an element using createFunc with the given tag, and
 * set its id and classes from the tagString.
 * @param {Funtion} createFunc(tag): Function that should create an element given a tag name.
 *    It is passed in to allow creating elements in different namespaces (e.g. plain HTML vs SVG).
 * @param {String} tagString: String of the form "tag#id.class1.class2" where id and classes are
 *    optional.
 * @return {Element} The result of createFunc(), possibly with id and class attributes also set.
 */
function _createFromTagString(createFunc, tagString) {
    // We do careful hand-written parsing rather than use a regexp for speed. Using a regexp is
    // significantly more expensive.
    let tag;
    let id;
    let classes;
    let dotPos = tagString.indexOf(".");
    const hashPos = tagString.indexOf('#');
    if (dotPos === -1) {
        dotPos = tagString.length;
    }
    else {
        classes = tagString.substring(dotPos + 1).replace(/\./g, ' ');
    }
    if (hashPos === -1) {
        tag = tagString.substring(0, dotPos);
    }
    else if (hashPos > dotPos) {
        throw new Error(`ID must come before classes in dom("${tagString}")`);
    }
    else {
        tag = tagString.substring(0, hashPos);
        id = tagString.substring(hashPos + 1, dotPos);
    }
    const elem = createFunc(tag);
    if (id) {
        elem.setAttribute('id', id);
    }
    if (classes) {
        elem.setAttribute('class', classes);
    }
    return elem;
}
/**
 * Update an element with any number of arguments, as documented in dom().
 */
function update(elem, ...args) {
    return _updateWithArgs(elem, args);
}
/**
 * Update an element with an array of arguments.
 */
function _updateWithArgs(elem, args) {
    for (const arg of args) {
        _updateWithArg(elem, arg);
    }
    return elem;
}
/**
 * Update an element with an array of arguments, calling disposers in case of an exception. It is
 * an internal helper to be used whenever elem is a newly-created element. If elem is an existing
 * element which the user already knows about, then _updateWithArgs should be called.
 */
function _updateWithArgsOrDispose(elem, args) {
    try {
        return _updateWithArgs(elem, args);
    }
    catch (e) {
        (0,_domDispose__WEBPACK_IMPORTED_MODULE_0__.domDispose)(elem);
        throw e;
    }
}
function _updateWithArg(elem, arg) {
    if (typeof arg === 'function') {
        const value = arg(elem);
        // Skip the recursive call in the common case when the function returns nothing.
        if (value !== undefined && value !== null) {
            _updateWithArg(elem, value);
        }
    }
    else if (Array.isArray(arg)) {
        _updateWithArgs(elem, arg);
    }
    else if (arg === undefined || arg === null) {
        // Nothing to do.
    }
    else if (arg instanceof _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.Node) {
        elem.appendChild(arg);
    }
    else if (typeof arg === 'object') {
        (0,_domMethods__WEBPACK_IMPORTED_MODULE_1__.attrsElem)(elem, arg);
    }
    else {
        elem.appendChild(_browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createTextNode(arg));
    }
}
/**
 * Creates a DocumentFragment processing arguments the same way as the dom() function.
 */
function frag(...args) {
    const elem = _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createDocumentFragment();
    return _updateWithArgsOrDispose(elem, args);
}
/**
 * Find the first element matching a selector; just an abbreviation for document.querySelector().
 */
function find(selector) { return _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.querySelector(selector); }
/**
 * Find all elements matching a selector; just an abbreviation for document.querySelectorAll().
 */
function findAll(selector) { return _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.querySelectorAll(selector); }


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domMethods.js":
/*!*********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domMethods.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attrsElem": () => (/* binding */ attrsElem),
/* harmony export */   "attrs": () => (/* binding */ attrs),
/* harmony export */   "attrElem": () => (/* binding */ attrElem),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "boolAttrElem": () => (/* binding */ boolAttrElem),
/* harmony export */   "boolAttr": () => (/* binding */ boolAttr),
/* harmony export */   "textElem": () => (/* binding */ textElem),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "styleElem": () => (/* binding */ styleElem),
/* harmony export */   "style": () => (/* binding */ style),
/* harmony export */   "propElem": () => (/* binding */ propElem),
/* harmony export */   "prop": () => (/* binding */ prop),
/* harmony export */   "showElem": () => (/* binding */ showElem),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "hideElem": () => (/* binding */ hideElem),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "clsElem": () => (/* binding */ clsElem),
/* harmony export */   "cls": () => (/* binding */ cls),
/* harmony export */   "clsPrefix": () => (/* binding */ clsPrefix),
/* harmony export */   "dataElem": () => (/* binding */ dataElem),
/* harmony export */   "data": () => (/* binding */ data),
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "makeTestId": () => (/* binding */ makeTestId),
/* harmony export */   "noTestId": () => (/* binding */ noTestId)
/* harmony export */ });
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binding */ "./node_modules/grainjs/dist/esm/lib/binding.js");
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _browserGlobals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./browserGlobals */ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js");


// Use the browser globals in a way that allows replacing them with mocks in tests.

/**
 * Private global map for associating arbitrary data with DOM. It's a WeakMap, so does not prevent
 * values from being garbage collected when the owning DOM elements are no longer used.
 */
const _dataMap = new WeakMap();
/**
 * Sets multiple attributes of a DOM element. The `attrs()` variant takes no `elem` argument.
 * Null and undefined values are omitted, and booleans are either omitted or set to empty string.
 * @param {Object} attrsObj: Object mapping attribute names to attribute values.
 */
function attrsElem(elem, attrsObj) {
    for (const key of Object.keys(attrsObj)) {
        const val = attrsObj[key];
        if (val != null && val !== false) {
            elem.setAttribute(key, val === true ? '' : val);
        }
    }
}
function attrs(attrsObj) {
    return (elem) => attrsElem(elem, attrsObj);
}
/**
 * Sets an attribute of a DOM element to the given value. Removes the attribute when the value is
 * null or undefined. The `attr()` variant takes no `elem` argument, and `attrValue` may be an
 * observable or function.
 * @param {Element} elem: The element to update.
 * @param {String} attrName: The name of the attribute to bind, e.g. 'href'.
 * @param {String|null} attrValue: The string value or null to remove the attribute.
 */
function attrElem(elem, attrName, attrValue) {
    if (attrValue === null || attrValue === undefined) {
        elem.removeAttribute(attrName);
    }
    else {
        elem.setAttribute(attrName, attrValue);
    }
}
function attr(attrName, attrValueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, attrValueObs, (val) => attrElem(elem, attrName, val));
}
/**
 * Sets or removes a boolean attribute of a DOM element. According to the spec, empty string is a
 * valid true value for the attribute, and the false value is indicated by the attribute's absence.
 * The `boolAttr()` variant takes no `elem`, and `boolValue` may be an observable or function.
 * @param {Element} elem: The element to update.
 * @param {String} attrName: The name of the attribute to bind, e.g. 'checked'.
 * @param {Boolean} boolValue: Boolean value whether to set or unset the attribute.
 */
function boolAttrElem(elem, attrName, boolValue) {
    attrElem(elem, attrName, boolValue ? '' : null);
}
function boolAttr(attrName, boolValueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, boolValueObs, (val) => boolAttrElem(elem, attrName, val));
}
/**
 * Adds a text node to the element. The `text()` variant takes no `elem`, and `value` may be an
 * observable or function.
 * @param {Element} elem: The element to update.
 * @param {String} value: The text value to add.
 */
function textElem(elem, value) {
    elem.appendChild(_browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createTextNode(value));
}
function text(valueObs) {
    return (elem) => {
        const textNode = _browserGlobals__WEBPACK_IMPORTED_MODULE_2__.G.document.createTextNode('');
        (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, valueObs, (val) => { textNode.nodeValue = val; });
        elem.appendChild(textNode);
    };
}
/**
 * Sets a style property of a DOM element to the given value. The `style()` variant takes no
 * `elem`, and `value` may be an observable or function.
 * @param {Element} elem: The element to update.
 * @param {String} property: The name of the style property to update, e.g. 'fontWeight'.
 * @param {String} value: The value for the property.
 */
function styleElem(elem, property, value) {
    elem.style[property] = value;
}
function style(property, valueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, valueObs, (val) => styleElem(elem, property, val));
}
/**
 * Sets the property of a DOM element to the given value.
 * The `prop()` variant takes no `elem`, and `value` may be an observable or function.
 * @param {Element} elem: The element to update.
 * @param {String} property: The name of the property to update, e.g. 'disabled'.
 * @param {Object} value: The value for the property.
 */
function propElem(elem, property, value) {
    elem[property] = value;
}
function prop(property, valueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, valueObs, (val) => propElem(elem, property, val));
}
/**
 * Shows or hides the element depending on a boolean value. Note that the element must be visible
 * initially (i.e. unsetting style.display should show it).
 * The `show()` variant takes no `elem`, and `boolValue` may be an observable or function.
 * @param {Element} elem: The element to update.
 * @param {Boolean} boolValue: True to show the element, false to hide it.
 */
function showElem(elem, boolValue) {
    elem.style.display = boolValue ? '' : 'none';
}
function show(boolValueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, boolValueObs, (val) => showElem(elem, val));
}
/**
 * The opposite of show, hiding the element when boolValue is true.
 * The `hide()` variant takes no `elem`, and `boolValue` may be an observable or function.
 * @param {Element} elem: The element to update.
 * @param {Boolean} boolValue: True to hide the element, false to show it.
 */
function hideElem(elem, boolValue) {
    elem.style.display = boolValue ? 'none' : '';
}
function hide(boolValueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, boolValueObs, (val) => hideElem(elem, val));
}
/**
 * Sets or toggles the given css class className.
 */
function clsElem(elem, className, boolValue = true) {
    elem.classList.toggle(className, Boolean(boolValue));
}
function cls(className, boolValue) {
    if (typeof className !== 'string') {
        return _clsDynamicPrefix('', className);
    }
    else if (!boolValue || typeof boolValue === 'boolean') {
        return (elem) => clsElem(elem, className, boolValue);
    }
    else {
        return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, boolValue, (val) => clsElem(elem, className, val));
    }
}
function clsPrefix(prefix, className, boolValue) {
    if (typeof className !== 'string') {
        return _clsDynamicPrefix(prefix, className);
    }
    else {
        return cls(prefix + className, boolValue);
    }
}
function _clsDynamicPrefix(prefix, className) {
    return (elem) => {
        let prevClass = null;
        (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, className, (name) => {
            if (prevClass) {
                elem.classList.remove(prevClass);
            }
            prevClass = name ? prefix + name : null;
            if (prevClass) {
                elem.classList.add(prevClass);
            }
        });
    };
}
/**
 * Associate arbitrary data with a DOM element. The `data()` variant takes no `elem`, and `value`
 * may be an observable or function.
 * @param {Element} elem: The element with which to associate data.
 * @param {String} key: Key to identify this piece of data among others attached to elem.
 * @param {Object} value: Arbitrary value to associate with elem.
 */
function dataElem(elem, key, value) {
    const obj = _dataMap.get(elem);
    if (obj) {
        obj[key] = value;
    }
    else {
        (0,_domDispose__WEBPACK_IMPORTED_MODULE_1__.onDisposeElem)(elem, () => _dataMap.delete(elem));
        _dataMap.set(elem, { [key]: value });
    }
}
function data(key, valueObs) {
    return (elem) => (0,_binding__WEBPACK_IMPORTED_MODULE_0__.subscribeElem)(elem, valueObs, (val) => dataElem(elem, key, val));
}
function getData(elem, key) {
    const obj = _dataMap.get(elem);
    return obj && obj[key];
}
/**
 * See documentation for TestId above.
 */
function makeTestId(prefix) {
    return clsPrefix.bind(null, prefix);
}
/**
 * See documentation for TestId above.
 */
const noTestId = (name) => null;


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/domevent.js":
/*!*******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/domevent.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onElem": () => (/* binding */ onElem),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "onMatchElem": () => (/* binding */ onMatchElem),
/* harmony export */   "onMatch": () => (/* binding */ onMatch),
/* harmony export */   "onKeyElem": () => (/* binding */ onKeyElem),
/* harmony export */   "onKeyPress": () => (/* binding */ onKeyPress),
/* harmony export */   "onKeyDown": () => (/* binding */ onKeyDown)
/* harmony export */ });
/**
 * domevent provides a way to listen to DOM events, similar to JQuery's `on()` function. Its
 * methods are also exposed via the dom.js module, as `dom.on()`, etc.
 *
 * It is typically used as an argument to the dom() function:
 *
 *    dom('div', dom.on('click', (event, elem) => { ... }));
 *
 * When the div is disposed, the listener is automatically removed.
 *
 * The underlying interface to listen to an event is this:
 *
 *    let listener = dom.onElem(elem, 'click', (event, elem) => { ... });
 *
 * The callback is called with the event and the element to which it was attached. Unlike in
 * JQuery, the callback's return value is ignored. Use event.stopPropagation() and
 * event.preventDefault() explicitly if needed.
 *
 * To stop listening:
 *
 *    listener.dispose();
 *
 * Disposing the listener returned by .onElem() is the only way to stop listening to an event. You
 * can use autoDispose to stop listening automatically when subscribing in a Disposable object:
 *
 *    this.autoDispose(domevent.onElem(document, 'mouseup', callback));
 *
 * To listen to descendants of an element matching the given selector (what JQuery calls
 * "delegated events", see http://api.jquery.com/on/):
 *
 *    dom('div', dom.onMatch('.selector', 'click', (event, elem) => { ... }));
 * or
 *    let lis = domevent.onMatchElem(elem, '.selector', 'click', (event, el) => { ... });
 *
 * In this usage, the element passed to the callback will be a DOM element matching the given
 * selector. If there are multiple matches, the callback is only called for the innermost one.
 *
 * If you need to remove the callback on first call, here's a useful pattern:
 *    let lis = domevent.onElem(elem, 'mouseup', e => { lis.dispose(); other_work(); });
 */
function _findMatch(inner, outer, selector) {
    for (let el = inner; el && el !== outer; el = el.parentElement) {
        if (el.matches(selector)) {
            return el;
        }
    }
    return null;
}
class DomEventListener {
    constructor(elem, eventType, callback, useCapture, selector) {
        this.elem = elem;
        this.eventType = eventType;
        this.callback = callback;
        this.useCapture = useCapture;
        this.selector = selector;
        this.elem.addEventListener(this.eventType, this, this.useCapture);
    }
    handleEvent(event) {
        const cb = this.callback;
        cb(event, this.elem);
    }
    dispose() {
        this.elem.removeEventListener(this.eventType, this, this.useCapture);
    }
}
class DomEventMatchListener extends DomEventListener {
    handleEvent(event) {
        const elem = _findMatch(event.target, this.elem, this.selector);
        if (elem) {
            const cb = this.callback;
            cb(event, elem);
        }
    }
}
/**
 * Listen to a DOM event. The `on()` variant takes no `elem` argument, and may be used as an
 * argument to dom() function.
 * @param {DOMElement} elem: DOM Element to listen to.
 * @param {String} eventType: Event type to listen for (e.g. 'click').
 * @param {Function} callback: Callback to call as `callback(event, elem)`, where elem is `elem`.
 * @param [Boolean] options.useCapture: Add the listener in the capture phase. This should very
 *    rarely be useful (e.g. JQuery doesn't even offer it as an option).
 * @returns {Object} Listener object whose .dispose() method will remove the event listener.
 */
function onElem(elem, eventType, callback, { useCapture = false } = {}) {
    return new DomEventListener(elem, eventType, callback, useCapture);
}
function on(eventType, callback, { useCapture = false } = {}) {
    // tslint:disable-next-line:no-unused-expression
    return (elem) => { new DomEventListener(elem, eventType, callback, useCapture); };
}
/**
 * Listen to a DOM event on descendants of the given elem matching the given selector. The
 * `onMatch()` variant takes no `elem` argument, and may be used as an argument to dom().
 * @param {DOMElement} elem: DOM Element to whose descendants to listen.
 * @param {String} selector: CSS selector string to filter elements that trigger this event.
 *    JQuery calls it "delegated events" (http://api.jquery.com/on/). The callback will only be
 *    called when the event occurs for an element matching the given selector. If there are
 *    multiple elements matching the selector, the callback is only called for the innermost one.
 * @param {String} eventType: Event type to listen for (e.g. 'click').
 * @param {Function} callback: Callback to call as `callback(event, elem)`, where elem is a
 *    descendent of `elem` which matches `selector`.
 * @param [Boolean] options.useCapture: Add the listener in the capture phase. This should very
 *    rarely be useful (e.g. JQuery doesn't even offer it as an option).
 * @returns {Object} Listener object whose .dispose() method will remove the event listener.
 */
function onMatchElem(elem, selector, eventType, callback, { useCapture = false } = {}) {
    return new DomEventMatchListener(elem, eventType, callback, useCapture, selector);
}
function onMatch(selector, eventType, callback, { useCapture = false } = {}) {
    // tslint:disable-next-line:no-unused-expression
    return (elem) => { new DomEventMatchListener(elem, eventType, callback, useCapture, selector); };
}
/**
 * Listen to key events (typically 'keydown' or 'keypress'), with specified per-key callbacks.
 * Key names are listed at https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 *
 * Methods onKeyPress() and onKeyDown() are intended to be used as arguments to dom().
 *
 * By default, handled events are stopped from bubbling with stopPropagation() and
 * preventDefault(). If, however, you register a key with a "$" suffix (i.e. "Enter$" instead of
 * "Enter"), then the event is allowed to bubble normally.
 *
 * When this handler is set on an element, we automatically ensure that tabindex attribute is set,
 * to allow this element to receive keyboard events.
 *
 * For example:
 *
 *    dom('input', ...
 *      dom.onKeyDown({
 *        Enter: (e, elem) => console.log("Enter pressed"),
 *        Escape: (e, elem) => console.log("Escape pressed"),
 *        Delete$: (e, elem) => console.log("Delete pressed, will bubble"),
 *      })
 *    )
 */
function onKeyElem(elem, evType, keyHandlers) {
    if (!(elem.tabIndex >= 0)) { // If tabIndex property is undefined or -1,
        elem.setAttribute('tabindex', '-1'); // Set tabIndex attribute to make the element focusable.
    }
    return onElem(elem, evType, (ev, _elem) => {
        const plainHandler = keyHandlers[ev.key];
        const handler = plainHandler || keyHandlers[ev.key + '$'];
        if (handler) {
            if (plainHandler) {
                ev.stopPropagation();
                ev.preventDefault();
            }
            handler(ev, _elem);
        }
    });
}
function onKeyPress(keyHandlers) {
    return (elem) => { onKeyElem(elem, 'keypress', keyHandlers); };
}
function onKeyDown(keyHandlers) {
    return (elem) => { onKeyElem(elem, 'keydown', keyHandlers); };
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/emit.js":
/*!***************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/emit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LLink": () => (/* binding */ LLink),
/* harmony export */   "Emitter": () => (/* binding */ Emitter),
/* harmony export */   "Listener": () => (/* binding */ Listener)
/* harmony export */ });
/**
 * emit.js implements an Emitter class which emits events to a list of listeners. Listeners are
 * simply functions to call, and "emitting an event" just calls those functions.
 *
 * This is similar to Backbone events, with more focus on efficiency. Both inserting and removing
 * listeners is constant time.
 *
 * To create an emitter:
 *    let emitter = new Emitter();
 *
 * To add a listener:
 *    let listener = fooEmitter.addListener(callback);
 * To remove a listener:
 *    listener.dispose();
 *
 * The only way to remove a listener is to dispose the Listener object returned by addListener().
 * You can often use autoDispose to do this automatically when subscribing in a constructor:
 *    this.autoDispose(fooEmitter.addListener(this.onFoo, this));
 *
 * To emit an event, call emit() with any number of arguments:
 *    emitter.emit("hello", "world");
 */
// Note about a possible alternative implementation.
//
// We could implement the same interface using an array of listeners. Certain issues apply, in
// particular with removing listeners from inside emit(), and in ensuring that removals are
// constant time on average. Such an implementation was attempted and timed. The result is that
// compared to the linked-list implementation here, add/remove combination could be made nearly
// twice faster (on average), while emit and add/remove/emit are consistently slightly slower.
//
// The implementation here was chosen based on those timings, and as the simpler one. For example,
// on one setup (macbook, node4, 5-listener queue), add+remove take 0.1us, while add+remove+emit
// take 3.82us. (In array-based implementation with same set up, add+remove is 0.06us, while
// add+remove+emit is 4.80us.)
// The private property name to hold next/prev pointers.
function _noop() { }
/**
 * This is an implementation of a doubly-linked list, with just the minimal functionality we need.
 */
class LLink {
    constructor() {
        this._next = null;
        this._prev = null;
        // This immediate circular reference might be undesirable for GC, but might not matter, and
        // makes the linked list implementation simpler and faster.
        this._next = this;
        this._prev = this;
    }
    isDisposed() {
        return !this._next;
    }
    _insertBefore(next, node) {
        const last = next._prev;
        last._next = node;
        next._prev = node;
        node._prev = last;
        node._next = next;
    }
    _removeNode(node) {
        if (node._prev) {
            node._prev._next = node._next;
            node._next._prev = node._prev;
        }
        node._prev = node._next = null;
    }
    _disposeList() {
        let node = this;
        let next = node._next;
        while (next !== null) {
            node._next = node._prev = null;
            node = next;
            next = node._next;
        }
    }
}
class Emitter extends LLink {
    /**
     * Constructs an Emitter object.
     */
    constructor() {
        super();
        this._changeCB = _noop;
        this._changeCBContext = undefined;
    }
    /**
     * Adds a listening callback to the list of functions to call on emit().
     * @param {Function} callback: Function to call.
     * @param {Object} optContext: Context for the function.
     * @returns {Listener} Listener object. Its dispose() method removes the callback from the list.
     */
    addListener(callback, optContext) {
        return new Listener(this, callback, optContext);
    }
    /**
     * Calls all listener callbacks, passing all arguments to each of them.
     */
    emit(...args) {
        Listener.callAll(this._next, this, args);
    }
    /**
     * Sets the single callback that would get called when a listener is added or removed.
     * @param {Function} changeCB(hasListeners): Function to call after a listener is added or
     *    removed. It's called with a boolean indicating whether this Emitter has any listeners.
     *    Pass in `null` to unset the callback. Note that it can be called multiple times in a row
     *    with hasListeners `true`.
     */
    setChangeCB(changeCB, optContext) {
        this._changeCB = changeCB || _noop;
        this._changeCBContext = optContext;
    }
    /**
     * Helper used by Listener class, but not intended for public usage.
     */
    _triggerChangeCB() {
        this._changeCB.call(this._changeCBContext, this.hasListeners());
    }
    /**
     * Returns whether this Emitter has any listeners.
     */
    hasListeners() {
        return this._next !== this;
    }
    /**
     * Disposes the Emitter. It breaks references between the emitter and all the items, allowing
     * for better garbage collection. It effectively disposes all current listeners.
     */
    dispose() {
        this._disposeList();
        this._changeCB = _noop;
        this._changeCBContext = undefined;
    }
}
/**
 * Listener object wraps a callback added to an Emitter, allowing for O(1) removal when the
 * listener is disposed.
 */
class Listener extends LLink {
    constructor(emitter, callback, context) {
        super();
        this.emitter = emitter;
        this.callback = callback;
        this.context = context;
        this._insertBefore(emitter, this);
        emitter._triggerChangeCB();
    }
    static callAll(begin, end, args) {
        while (begin !== end) {
            const lis = begin;
            lis.callback.call(lis.context, ...args);
            begin = lis._next;
        }
    }
    dispose() {
        if (this.isDisposed()) {
            return;
        }
        this._removeNode(this);
        this.emitter._triggerChangeCB();
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/kowrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/kowrap.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromKo": () => (/* binding */ fromKo),
/* harmony export */   "KoWrapObs": () => (/* binding */ KoWrapObs),
/* harmony export */   "toKo": () => (/* binding */ toKo),
/* harmony export */   "setupKoDisposal": () => (/* binding */ setupKoDisposal)
/* harmony export */ });
/* harmony import */ var _domDispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domDispose */ "./node_modules/grainjs/dist/esm/lib/domDispose.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/**
 * Grain.js observables and computeds are similar to (and mostly inspired by) those in
 * Knockout.js. In fact, they can work together.
 *
 *  import {fromKo} from 'kowrap'
 *
 *  fromKo(koObservable)
 *
 * returns a Grain.js observable that mirrors the passed-in Knockout observable (which may be a
 * computed as well). Similarly,
 *
 *  import {toKo} from 'kowrap';
 *  import * as ko from 'knockout';
 *
 *  toKo(ko, observable)
 *
 * returns a Knockout.js observable that mirrows the passed-in Grain observable or computed. Note
 * that toKo() mus tbe called with the knockout module as an argument. This is to avoid adding
 * knockout as a dependency of grainjs.
 *
 * In both cases, calling fromKo/toKo twice on the same observable will return the same wrapper,
 * and subscriptions and disposal are appropriately set up to make usage seamless. In particular,
 * the returned wrapper should not be disposed; it's tied to the lifetime of the wrapped object.
 */


const fromKoWrappers = new WeakMap();
const toKoWrappers = new WeakMap();
/**
 * Returns a Grain.js observable which mirrors a Knockout observable.
 *
 * Do not dispose this wrapper, as it is shared by all code using koObs, and its lifetime is tied
 * to the lifetime of koObs. If unused, it consumes minimal resources, and should get garbage
 * collected along with koObs.
 */
function fromKo(koObs) {
    return fromKoWrappers.get(koObs) || fromKoWrappers.set(koObs, new KoWrapObs(koObs)).get(koObs);
}
/**
 * An Observable that wraps a Knockout observable, created via fromKo(). It keeps minimal overhead
 * when unused by only subscribing to the wrapped observable while it itself has subscriptions.
 *
 * This way, when unused, the only reference is from the wrapper to the wrapped object. KoWrapObs
 * should not be disposed; its lifetime is tied to that of the wrapped object.
 */
class KoWrapObs extends _observable__WEBPACK_IMPORTED_MODULE_1__.Observable {
    constructor(_koObs) {
        super(_koObs.peek());
        this._koObs = _koObs;
        this._koSub = null;
        this.setListenerChangeCB((hasListeners) => {
            if (!hasListeners) {
                this._koSub.dispose();
                this._koSub = null;
            }
            else if (!this._koSub) {
                // TODO this is a little hack, really, BaseObservable should expose a way to set the value
                // directly by derived classes, i.e. a protected setter.
                this._value = this._koObs.peek();
                this._koSub = this._koObs.subscribe((val) => this.setAndTrigger(val));
            }
        });
    }
    get() { return this._koObs.peek(); }
    set(value) { (0,_observable__WEBPACK_IMPORTED_MODULE_1__.bundleChanges)(() => this._koObs(value)); }
    dispose() { throw new Error("KoWrapObs should not be disposed"); }
}
/**
 * Returns a Knockout observable which mirrors a Grain.js observable.
 */
function toKo(knockout, grainObs) {
    const prevKoObs = toKoWrappers.get(grainObs);
    if (prevKoObs) {
        return prevKoObs;
    }
    const newKoObs = knockout.observable(grainObs.get());
    toKoWrappers.set(grainObs, newKoObs);
    grainObs.addListener((val) => newKoObs(val));
    return newKoObs;
}
// Marker for when knockout-disposal integration has already been setup.
let koDisposalIsSetup = false;
/**
 * Set up integration between grainjs and knockout disposal. Knockout does cleanup using
 * ko.removeNode / ko.cleanNode (it also takes care of JQuery cleanup if needed). GrainJS does
 * cleanup using dom.domDispose(). By default these don't know about each other.
 *
 * If you mix the two libraries, however, disposing an element may need to trigger disposers
 * registered by either library.
 *
 * This method ensures that this happens.
 *
 * Note: grainjs disposes text nodes too, but nothing relies on it. When disposal is triggered via
 * knockout, we are forced to rely on knockout's node traversal which ignores text nodes.
 */
function setupKoDisposal(ko) {
    // Ensure we don't do the setup more than once, or things will get called multiple times.
    if (koDisposalIsSetup) {
        return;
    }
    koDisposalIsSetup = true;
    const koDomNodeDisposal = ko.utils.domNodeDisposal;
    // Knockout by default has an external-data-cleanup func set to cleanup JQuery. Whatever it is
    // set to, we will continue calling it, and also will call grainjs domDisposeNode.
    const origKoCleanExternalData = koDomNodeDisposal.cleanExternalData;
    // The original function called by grainjs to clean nodes recursively. We'll override it.
    const origGrainDisposeRecursive = _domDispose__WEBPACK_IMPORTED_MODULE_0__.domDisposeHooks.disposeRecursive;
    // New function called by knockout to do extra cleanup. Now calls grainjs single-node cleanup.
    // (In knockout, we can only override single-node cleanup.)
    function newKoCleanExternalData(node) {
        origKoCleanExternalData(node);
        _domDispose__WEBPACK_IMPORTED_MODULE_0__.domDisposeHooks.disposeNode(node);
    }
    // Function called by grainjs to clean nodes recursively. We override the recursive cleanup
    // function to call the recursive knockout cleanup (letting knockout do the dom traversal it
    // normally does).
    function newGrainDisposeRecursive(node) {
        origGrainDisposeRecursive(node);
        // While doing knockout cleanup, do NOT have it call grainjs cleanup too, as that would cause
        // multiple unnecessary traversals of DOM.
        koDomNodeDisposal.cleanExternalData = origKoCleanExternalData;
        try {
            ko.cleanNode(node);
        }
        finally {
            koDomNodeDisposal.cleanExternalData = newKoCleanExternalData;
        }
    }
    // Use knockout and grainjs hooks to actually set the new cleanup functions.
    koDomNodeDisposal.cleanExternalData = newKoCleanExternalData;
    _domDispose__WEBPACK_IMPORTED_MODULE_0__.domDisposeHooks.disposeRecursive = newGrainDisposeRecursive;
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/obsArray.js":
/*!*******************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/obsArray.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsArray": () => (/* binding */ ObsArray),
/* harmony export */   "MutableObsArray": () => (/* binding */ MutableObsArray),
/* harmony export */   "obsArray": () => (/* binding */ obsArray),
/* harmony export */   "ComputedArray": () => (/* binding */ ComputedArray),
/* harmony export */   "computedArray": () => (/* binding */ computedArray),
/* harmony export */   "makeLiveIndex": () => (/* binding */ makeLiveIndex),
/* harmony export */   "LiveIndex": () => (/* binding */ LiveIndex)
/* harmony export */ });
/* harmony import */ var _dispose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dispose */ "./node_modules/grainjs/dist/esm/lib/dispose.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/* harmony import */ var _subscribe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscribe */ "./node_modules/grainjs/dist/esm/lib/subscribe.js");
/**
 * ObsArray extends a plain Observable to allow for more efficient observation of array changes.
 *
 * As for any array-valued Observable, when the contents of the observed array changes, the
 * listeners get called with new and previous values which are the same array. For simple changes,
 * such as those made with .push() and .splice() methods, ObsArray allows for more efficient
 * handling of the change by calling listeners with splice info in the third argument.
 *
 * This module also provides computedArray(), which allows mapping each item of an ObsArray
 * through a function, passing through splice info for efficient handling of small changes. It
 * also allows mapping an observable or a computed whose value is an ObsArray.
 *
 * There is no need or benefit in using computedArray() if you have a computed() that returns a
 * plain array. It is specifically for the case when you want to preserve the efficiency of
 * ObsArray when you map its values.
 *
 * Both ObsArray and ComputedArray may be used with disposable elements as their owners. E.g.
 *
 *    const arr = obsArray<D>();
 *    arr.push(D.create(arr, "x"), D.create(arr, "y"));
 *    arr.pop();      // Element "y" gets disposed.
 *    arr.dispose();  // Element "x" gets disposed.
 *
 *    const values = obsArray<string>();
 *    const compArr = computedArray<D>(values, (val, i, compArr) => D.create(compArr, val));
 *    values.push("foo", "bar");      // D("foo") and D("bar") get created
 *    values.pop();                   // D("bar") gets disposed.
 *    compArr.dispose();              // D("foo") gets disposed.
 *
 * Note that only the pattern above works: obsArray (or compArray) may only be used to take
 * ownership of those disposables that are added to it as array elements.
 */



/**
 * ObsArray<T> is essentially an array-valued observable. The main difference is that it may be
 * used as an owner for disposable array elements.
 */
class ObsArray extends _observable__WEBPACK_IMPORTED_MODULE_1__.BaseObservable {
    constructor() {
        super(...arguments);
        this._ownedItems = undefined;
    }
    addListener(callback, optContext) {
        return super.addListener(callback, optContext);
    }
    autoDispose(value) {
        if (!this._ownedItems) {
            this._ownedItems = new Set();
        }
        this._ownedItems.add(value);
        return value;
    }
    dispose() {
        if (this._ownedItems) {
            for (const item of this.get()) {
                if (this._ownedItems.delete(item)) {
                    item.dispose();
                }
            }
            this._ownedItems = undefined;
        }
        super.dispose();
    }
    _setWithSplice(value, splice) {
        return this._setWithArg(value, splice);
    }
    _disposeOwned(splice) {
        if (!this._ownedItems) {
            return;
        }
        if (splice) {
            for (const item of splice.deleted) {
                if (this._ownedItems.delete(item)) {
                    item.dispose();
                }
            }
        }
        else {
            const oldOwnedItems = this._ownedItems;
            // Rebuild the _ownedItems array to have only the current items that were owned from before.
            this._ownedItems = new Set();
            for (const item of this.get()) {
                if (oldOwnedItems.delete(item)) {
                    this._ownedItems.add(item);
                }
            }
            // After removing current items, dispose any remaining owned items.
            for (const item of oldOwnedItems) {
                item.dispose();
            }
        }
    }
}
/**
 * MutableObsArray<T> adds array-like mutation methods which emit events with splice info, to
 * allow more efficient processing of such changes. It is created with obsArray<T>().
 */
class MutableObsArray extends ObsArray {
    push(...args) {
        const value = this.get();
        const start = value.length;
        const newLen = value.push(...args);
        this._setWithSplice(value, { start, numAdded: args.length, deleted: [] });
        return newLen;
    }
    pop() {
        const value = this.get();
        if (value.length === 0) {
            return undefined;
        }
        const ret = value.pop();
        this._setWithSplice(value, { start: value.length, numAdded: 0, deleted: [ret] });
        return ret;
    }
    unshift(...args) {
        const value = this.get();
        const newLen = value.unshift(...args);
        this._setWithSplice(value, { start: 0, numAdded: args.length, deleted: [] });
        return newLen;
    }
    shift() {
        const value = this.get();
        if (value.length === 0) {
            return undefined;
        }
        const ret = value.shift();
        this._setWithSplice(value, { start: 0, numAdded: 0, deleted: [ret] });
        return ret;
    }
    splice(start, deleteCount = Infinity, ...newValues) {
        const value = this.get();
        const len = value.length;
        start = Math.min(len, Math.max(0, start < 0 ? len + start : start));
        const deleted = value.splice(start, deleteCount, ...newValues);
        this._setWithSplice(value, { start, numAdded: newValues.length, deleted });
        return deleted;
    }
}
/**
 * Creates a new MutableObsArray with an optional initial value, defaulting to the empty array.
 * It is essentially the same as observable<T[]>, but with array-like mutation methods.
 */
function obsArray(value = []) {
    return new MutableObsArray(value);
}
/**
 * Returns true if val is an array-valued observable.
 */
function isObsArray(val) {
    return Array.isArray(val.get());
}
/**
 * See computedArray() below for documentation.
 */
class ComputedArray extends ObsArray {
    constructor(obsArr, _mapper) {
        super([]);
        this._mapper = _mapper;
        this._sub = isObsArray(obsArr) ?
            (0,_subscribe__WEBPACK_IMPORTED_MODULE_2__.subscribe)(obsArr, (use) => this._syncMap(obsArr)) :
            (0,_subscribe__WEBPACK_IMPORTED_MODULE_2__.subscribe)(obsArr, (use, obsArrayValue) => { use(obsArrayValue); return this._syncMap(obsArrayValue); });
    }
    dispose() {
        this._unsync();
        this._sub.dispose();
        super.dispose();
    }
    _syncMap(obsArr) {
        if (this._source !== obsArr) {
            this._unsync();
            this._listener = obsArr.addListener(this._recordChange, this);
            this._source = obsArr;
            this._rebuild(obsArr);
        }
        else if (this._lastSplice) {
            // If we are syncing to the same array as before and recorded a single splice, apply it now.
            this._applySplice(obsArr, this._lastSplice);
        }
        else {
            // If the full array changed or we had multiple splices, give up and rebuild.
            this._rebuild(obsArr);
        }
        this._lastSplice = undefined;
    }
    _unsync() {
        if (this._listener) {
            this._listener.dispose();
            this._listener = undefined;
            this._source = undefined;
        }
    }
    _rebuild(obsArr) {
        this.set(obsArr.get().map((item, i) => this._mapper.call(undefined, item, i, this)));
    }
    _applySplice(obsArr, change) {
        const sourceArray = obsArr.get();
        const newItems = [];
        for (let i = change.start, n = 0; n < change.numAdded; i++, n++) {
            newItems.push(this._mapper.call(undefined, sourceArray[i], i, this));
        }
        const items = this.get();
        const deleted = items.splice(change.start, change.deleted.length, ...newItems);
        this._setWithSplice(items, { start: change.start, numAdded: newItems.length, deleted });
    }
    _recordChange(newItems, oldItems, change) {
        // We don't attempt to handle efficiency multiple splices (it's quite hard in general, and
        // even harder to know that it's more efficient than rebuilding), so if _lastSplice is set, we
        // set it to a marker to mark the array for rebuilding.
        if (change && this._lastSplice === undefined) {
            this._lastSplice = change;
        }
        else {
            this._lastSplice = false; // This is a marker that a full rebuild is needed.
        }
    }
}
/**
 * Returns an ObsArray that maps all elements of the passed-in ObsArray through a mapper function.
 * Also accepts an observable (e.g. a computed) whose value is an ObsArray. Usage:
 *
 *    computedArray(obsArray, mapper)
 *
 * The result is entirely analogous to:
 *
 *     computed((use) => use(obsArray).map(mapper))       // for ObsArray
 *     computed((use) => use(use(obsArray)).map(mapper))  // for Observable<ObsArray>
 *
 * The benefit of computedArray() is that a small change to the source array (e.g. one item
 * added or removed), causes a small change to the mapped array, rather than a full rebuild.
 *
 * This is useful with an ObsArray or with an observable whose value is an ObsArray, and also
 * when the computed array owns its disposable items.
 *
 * Note that the mapper function is called with (item, index, array) as for a standard
 * array.map(), but that the index is only accurate at the time of the call, and will stop
 * reflecting the true index if more items are inserted into the array later.
 */
function computedArray(obsArr, mapper) {
    return new ComputedArray(obsArr, mapper);
}
/**
 * Returns a new observable representing an index into this array. It can be read and written, and
 * its value is clamped to be a valid index. The index is only null if the array is empty.
 *
 * As the array changes, the index is adjusted to continue pointing to the same element. If the
 * pointed element is deleted, the index is adjusted to after the deletion point.
 *
 * The returned observable has an additional .setLive(bool) method. While set to false, the
 * observable will not be adjusted as the array changes, except to keep it valid.
 */
function makeLiveIndex(owner, obsArr, initialIndex = 0) {
    return (0,_dispose__WEBPACK_IMPORTED_MODULE_0__.setDisposeOwner)(owner, new LiveIndex(obsArr, initialIndex));
}
class LiveIndex extends _observable__WEBPACK_IMPORTED_MODULE_1__.Observable {
    constructor(_obsArray, initialIndex = 0) {
        super(null);
        this._obsArray = _obsArray;
        this._isLive = true;
        this.set(initialIndex);
        this._listener = _obsArray.addListener(this._onArrayChange, this);
    }
    set(index) {
        // Clamp to [0, len) range of the observable array.
        const len = this._obsArray.get().length;
        super.set(len === 0 ? null : Math.max(0, Math.min(len - 1, index || 0)));
    }
    // Note that this feature comes from a rather obscure need, and it would be better if something
    // similar were possible without making it an explicit feature.
    setLive(value) {
        this._isLive = value;
    }
    dispose() {
        this._listener.dispose();
        super.dispose();
    }
    _onArrayChange(newItems, oldItems, change) {
        const idx = this.get();
        this.set(idx === null || !change ? 0 :
            // Adjust the index if it was beyond the deleted region.
            this._isLive && idx >= change.start + change.deleted.length ? idx + change.numAdded - change.deleted.length :
                // Adjust the index if it was inside the deleted region (and not replaced).
                this._isLive && idx >= change.start + change.numAdded ? change.start + change.numAdded :
                    idx);
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/observable.js":
/*!*********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/observable.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bundleChanges": () => (/* reexport safe */ _computed_queue__WEBPACK_IMPORTED_MODULE_0__.bundleChanges),
/* harmony export */   "BaseObservable": () => (/* binding */ BaseObservable),
/* harmony export */   "Observable": () => (/* binding */ Observable),
/* harmony export */   "observable": () => (/* binding */ observable),
/* harmony export */   "obsHolder": () => (/* binding */ obsHolder)
/* harmony export */ });
/* harmony import */ var _computed_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_computed_queue */ "./node_modules/grainjs/dist/esm/lib/_computed_queue.js");
/* harmony import */ var _dispose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dispose */ "./node_modules/grainjs/dist/esm/lib/dispose.js");
/* harmony import */ var _emit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emit */ "./node_modules/grainjs/dist/esm/lib/emit.js");
/**
 * observable.js implements an observable value, which lets other code subscribe to changes.
 *
 * E.g.
 *  let o = observable(17);
 *  o.get();          // 17
 *  o.addListener(foo);
 *  o.set("asdf");    // foo("asdf", 17) gets called.
 *  o.get();          // "asdf"
 *
 * To subscribe to changes, use obs.addListener(callback, context). The callback will get called
 * with (newValue, oldValue) as arguments.
 *
 * When you use observables within the body of a computed(), you can automatically create
 * subscriptions to them with the use(obs) function. E.g.
 *    let obs3 = computed(use => use(obs1) + use(obs2));
 * creates a computed observable `obs3` which is subscribed to changes to `obs1` and `obs2`.
 *
 * Note that unlike with knockout, use(obs) method requires an explicit `use` function, which is
 * always passed to a computed's read() callback for this purpose. This makes it explicit when a
 * dependency is created, and which observables the dependency connects.
 */




class BaseObservable {
    /**
     * Internal constructor for an Observable. You should use observable() function instead.
     */
    constructor(value) {
        this._onChange = new _emit__WEBPACK_IMPORTED_MODULE_2__.Emitter();
        this._value = value;
    }
    /**
     * Returns the value of the observable. It is fast and does not create a subscription.
     * (It is similar to knockout's peek()).
     * @returns {Object} The current value of the observable.
     */
    get() { return this._value; }
    /**
     * Sets the value of the observable. If the value differs from the previously set one, then
     * listeners to this observable will get called with (newValue, oldValue) as arguments.
     * @param {Object} value: The new value to set.
     */
    set(value) {
        if (value !== this._value) {
            this.setAndTrigger(value);
        }
    }
    /**
     * Sets the value of the observable AND calls listeners even if the value is unchanged.
     */
    setAndTrigger(value) {
        const prev = this._value;
        this._value = value;
        this._onChange.emit(value, prev);
        this._disposeOwned();
        (0,_computed_queue__WEBPACK_IMPORTED_MODULE_0__.compute)();
    }
    /**
     * Adds a callback to listen to changes in the observable.
     * @param {Function} callback: Function, called on changes with (newValue, oldValue) arguments.
     * @param {Object} optContext: Context for the function.
     * @returns {Listener} Listener object. Its dispose() method removes the callback.
     */
    addListener(callback, optContext) {
        return this._onChange.addListener(callback, optContext);
    }
    /**
     * Returns whether this observable has any listeners.
     */
    hasListeners() {
        return this._onChange.hasListeners();
    }
    /**
     * Sets a single callback to be called when a listener is added or removed. It overwrites any
     * previously-set such callback.
     * @param {Function} changeCB(hasListeners): Function to call after a listener is added or
     *    removed. It's called with a boolean indicating whether this observable has any listeners.
     *    Pass in `null` to unset the callback. Note that it can be called multiple times in a row
     *    with hasListeners `true`.
     */
    setListenerChangeCB(changeCB, optContext) {
        this._onChange.setChangeCB(changeCB, optContext);
    }
    /**
     * Used by subscriptions to keep track of dependencies. An observable that has dependnecies,
     * such as a computed observable, would override this method.
     */
    _getDepItem() {
        return null;
    }
    /**
     * Disposes the observable.
     */
    dispose() {
        this._disposeOwned();
        this._onChange.dispose();
        this._value = undefined;
    }
    /**
     * Returns whether this observable is disposed.
     */
    isDisposed() {
        return this._onChange.isDisposed();
    }
    _disposeOwned(arg) { }
    /**
     * Allow derived classes to emit change events with an additional third argument describing the
     * change. It always emits the event without checking for value equality.
     */
    _setWithArg(value, arg) {
        const prev = this._value;
        this._value = value;
        this._onChange.emit(value, prev, arg);
        this._disposeOwned(arg);
        (0,_computed_queue__WEBPACK_IMPORTED_MODULE_0__.compute)();
    }
}
class Observable extends BaseObservable {
    constructor() {
        super(...arguments);
        this._owned = undefined;
    }
    // See module-level holder() function below for documentation.
    static holder(value) {
        const obs = new Observable(value);
        obs._owned = value;
        return obs;
    }
    /**
     * Creates a new Observable with the given initial value, and owned by owner.
     */
    static create(owner, value) {
        return (0,_dispose__WEBPACK_IMPORTED_MODULE_1__.setDisposeOwner)(owner, new Observable(value));
    }
    /**
     * The use an observable for a disposable object, use it a DisposableOwner:
     *
     *    D.create(obs, ...args)                      // Preferred
     *    obs.autoDispose(D.create(null, ...args))    // Equivalent
     *
     * Either of these usages will set the observable to the newly created value. The observable
     * will dispose the owned value when it's set to another value, or when it itself is disposed.
     */
    autoDispose(value) {
        this.setAndTrigger(value);
        this._owned = value;
        return value;
    }
    _disposeOwned() {
        if (this._owned) {
            this._owned.dispose();
            this._owned = undefined;
        }
    }
}
/**
 * Creates a new Observable with the initial value of optValue if given or undefined if omitted.
 * @param {Object} optValue: The initial value to set.
 * @returns {Observable} The newly created observable.
 */
function observable(value) {
    return new Observable(value);
}
/**
 * Creates a new Observable with an initial disposable value owned by this observable, e.g.
 *
 *    const obs = obsHolder<D>(D.create(null, ...args));
 *
 * This is needed because using simply observable<D>(value) would not cause the observable to take
 * ownership of value (i.e. to dispose it later). This function is a less hacky equivalent to:
 *
 *    const obs = observable<D>(null as any);
 *    D.create(obs, ...args);
 *
 * To allow nulls, use observable<D|null>(null); then the obsHolder() constructor is not needed.
 */
function obsHolder(value) {
    return Observable.holder(value);
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/pureComputed.js":
/*!***********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/pureComputed.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PureComputed": () => (/* binding */ PureComputed),
/* harmony export */   "pureComputed": () => (/* binding */ pureComputed)
/* harmony export */ });
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable */ "./node_modules/grainjs/dist/esm/lib/observable.js");
/* harmony import */ var _subscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./subscribe */ "./node_modules/grainjs/dist/esm/lib/subscribe.js");
/**
 * pureComputed.js implements a variant of computed() suitable for use with a pure read function
 * (free of side-effects). A pureComputed is only subscribed to its dependencies when something is
 * subscribed to it. At other times, it is not subscribed to anything, and calls to `get()` will
 * recompute its value each time by calling its read() function.
 *
 * Its syntax and usage are otherwise exactly as for a computed.
 *
 * In addition to being cheaper when unused, a pureComputed() also avoids leaking memory when
 * unused (since it's not registered with dependencies), so it is not necessary to dispose it.
 */


function _noWrite() {
    throw new Error("Can't write to non-writable pureComputed");
}
function _useFunc(obs) {
    return ('get' in obs) ? obs.get() : obs.peek();
}
// Constant empty array, which we use to avoid allocating new read-only empty arrays.
const emptyArray = [];
class PureComputed extends _observable__WEBPACK_IMPORTED_MODULE_0__.Observable {
    /**
     * Internal constructor for a PureComputed. You should use pureComputed() function instead.
     */
    constructor(callback, dependencies) {
        // At initialization we force an undefined value even though it's not of type T: it's not
        // actually used as get() is overridden.
        super(undefined);
        this._callback = callback;
        this._write = _noWrite;
        this._dependencies = dependencies.length > 0 ? dependencies : emptyArray;
        this._sub = null;
        this._inCall = false;
        this.setListenerChangeCB(this._onListenerChange, this);
    }
    _getDepItem() {
        this._activate();
        return this._sub._getDepItem();
    }
    get() {
        if (!this._sub && !this._inCall) {
            // _inCall member prevents infinite recursion.
            this._inCall = true;
            try {
                const readArgs = [_useFunc];
                // Note that this attempts to optimize for speed.
                for (let i = 0, len = this._dependencies.length; i < len; i++) {
                    readArgs[i + 1] = this._dependencies[i].get();
                }
                super.set(this._callback.apply(undefined, readArgs));
            }
            finally {
                this._inCall = false;
            }
        }
        return super.get();
    }
    /**
     * "Sets" the value of the pure computed by calling the write() callback if one was provided in
     * the constructor. Throws an error if there was no such callback (not a "writable" computed).
     * @param {Object} value: The value to pass to the write() callback.
     */
    set(value) { this._write(value); }
    /**
     * Set callback to call when this.set(value) is called, to make it a writable computed. If not
     * set, attempting to write to this computed will throw an exception.
     */
    onWrite(writeFunc) {
        this._write = writeFunc;
        return this;
    }
    /**
     * Disposes the pureComputed, unsubscribing it from all observables it depends on.
     */
    dispose() {
        if (this._sub) {
            this._sub.dispose();
        }
        // Truthy value for _sub prevents some errors after disposal, by avoiding activation or
        // _directRead calls.
        this._sub = true;
        super.dispose();
    }
    _activate() {
        if (!this._sub) {
            this._sub = new _subscribe__WEBPACK_IMPORTED_MODULE_1__.Subscription(this._read.bind(this), this._dependencies);
        }
    }
    _onListenerChange(hasListeners) {
        if (hasListeners) {
            this._activate();
        }
        else if (this._sub) {
            this._sub.dispose();
            this._sub = null;
        }
    }
    _read(use, ...args) {
        super.set(this._callback(use, ...args));
    }
}
/**
 * Creates and returns a new PureComputed. The interface is identical to that of a Computed.
 */
function pureComputed(...args) {
    const readCb = args.pop();
    // The cast helps ensure that Observable is compatible with ISubscribable abstraction that we use.
    return new PureComputed(readCb, args);
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/styled.js":
/*!*****************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/styled.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "styled": () => (/* binding */ styled),
/* harmony export */   "keyframes": () => (/* binding */ keyframes)
/* harmony export */ });
/* harmony import */ var _browserGlobals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browserGlobals */ "./node_modules/grainjs/dist/esm/lib/browserGlobals.js");
/* harmony import */ var _domImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domImpl */ "./node_modules/grainjs/dist/esm/lib/domImpl.js");
/* harmony import */ var _domMethods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domMethods */ "./node_modules/grainjs/dist/esm/lib/domMethods.js");
/**
 * In-code styling for DOM components, inspired by Reacts Styled Components.
 *
 * Usage:
 *    const title = styled('h1', `
 *      font-size: 1.5em;
 *      text-align: center;
 *      color: palevioletred;
 *    `);
 *
 *    const wrapper = styled('section', `
 *      padding: 4em;
 *      background: papayawhip;
 *    `);
 *
 *    wrapper(title('Hello world'))
 *
 * This generates class names for title and wrapper, adds the styles to the document on first use,
 * and the result is equivalent to:
 *
 *    dom(`section.${wrapper.className}`, dom(`h1.${title.className}`, 'Hello world'));
 *
 * Calls to styled() should happen at the top level, at import time, in order to register all
 * styles upfront. Actual work happens the first time a style is needed to create an element.
 * Calling styled() elsewhere than at top level is wasteful and bad for performance.
 *
 * You may create a style that modifies an existing styled() or other component, e.g.
 *
 *    const title2 = styled(title, `font-size: 1rem; color: red;`);
 *
 * Calling title2('Foo') becomes equivalent to dom(`h1.${title.className}.${title2.className}`).
 *
 * Styles may incorporate other related styles by nesting them under the main one as follows:
 *
 *     const myButton = styled('button', `
 *       border-radius: 0.5rem;
 *       border: 1px solid grey;
 *       font-size: 1rem;
 *
 *       &:active {
 *         background: lightblue;
 *       }
 *       &-small {
 *         font-size: 0.6rem;
 *       }
 *     `);
 *
 * In nested styles, ampersand (&) gets replaced with the generated .className of the main element.
 *
 * The resulting styled component provides a .cls() helper to simplify using prefixed classes. It
 * behaves as dom.cls(), but prefixes the class names with the generated className of the main
 * element. E.g. for the example above,
 *
 *      myButton(myButton.cls('-small'), 'Test')
 *
 * creates a button with both the myButton style above, and the style specified under "&-small".
 *
 * Animations with @keyframes may be created with a unique name by using the keyframes() helper:
 *
 *    const rotate360 = keyframes(`
 *      from { transform: rotate(0deg); }
 *      to { transform: rotate(360deg); }
 *    `);
 *
 *    const Rotate = styled('div', `
 *      display: inline-block;
 *      animation: ${rotate360} 2s linear infinite;
 *    `);
 */
// Use the browser globals in a way that allows replacing them with mocks in tests.



function styled(creator, styles) {
    // Note that we intentionally minimize the work done when styled() is called; it's better to do
    // any needed work on first use. That's when we will actually build the css rules.
    const style = new StylePiece(styles);
    // Creator function reflects the input, with only the addition of style.use() at the end. Note
    // that it needs to be at the end because creator() might take special initial arguments.
    const newCreator = (typeof creator === 'string') ?
        (...args) => style.addToElem((0,_domImpl__WEBPACK_IMPORTED_MODULE_1__.dom)(creator, ...args)) :
        (...args) => style.addToElem(creator(...args));
    return Object.assign(newCreator, {
        className: style.className,
        cls: _domMethods__WEBPACK_IMPORTED_MODULE_2__.clsPrefix.bind(null, style.className),
    });
}
// Keyframes produces simply a string with the generated name. Note that these does not support
// nesting or ampersand (&) handling, since these would be difficult and are entirely unneeded.
function keyframes(styles) {
    return (new KeyframePiece(styles)).className;
}
function createCssRules(className, styles) {
    // The first time we encounter a nested section, we know which are the "main" rules, and can
    // wrap them appropriately.
    const nestedStart = styles.search(/[^;]*\{/);
    const mainRules = nestedStart < 0 ? styles : styles.slice(0, nestedStart);
    const nestedRules = nestedStart < 0 ? "" : styles.slice(nestedStart);
    // At the end, replace all occurrences of & with ".className".
    return `& {${mainRules}\n}\n${nestedRules}`.replace(/&/g, className);
}
// Used by getNextStyleNum when running without a global window object (e.g. in tests).
const _global = {};
// Keep the counter for next class attached to the global window object rather than be a library
// global. This way if by some chance multiple instance of grainjs are loaded into the page, it
// still works without overwriting class names (which would be extremely confusing).
function getNextStyleNum() {
    const g = _browserGlobals__WEBPACK_IMPORTED_MODULE_0__.G.window || _global;
    return g._grainNextStyleNum = (g._grainNextStyleNum || 0) + 1;
}
class StylePiece {
    constructor(_styles) {
        this._styles = _styles;
        this._mounted = false;
        this.className = StylePiece._nextClassName();
        StylePiece._unmounted.add(this);
    }
    // Generate a new css class name. The suffix ensures that names like "&2" can't cause a conflict.
    static _nextClassName() { return `_grain${getNextStyleNum()}_`; }
    // Mount all unmounted StylePieces, and clear the _unmounted map.
    static _mountAll() {
        const sheet = Array.from(this._unmounted, (p) => p._createRules()).join("\n\n");
        _browserGlobals__WEBPACK_IMPORTED_MODULE_0__.G.document.head.appendChild((0,_domImpl__WEBPACK_IMPORTED_MODULE_1__.dom)('style', sheet));
        for (const piece of this._unmounted) {
            piece._mounted = true;
        }
        this._unmounted.clear();
    }
    addToElem(elem) {
        if (!this._mounted) {
            StylePiece._mountAll();
        }
        elem.classList.add(this.className);
        return elem;
    }
    _createRules() {
        return createCssRules('.' + this.className, this._styles);
    }
}
// Set of all StylePieces created but not yet mounted.
StylePiece._unmounted = new Set();
class KeyframePiece extends StylePiece {
    _createRules() {
        return `@keyframes ${this.className} {${this._styles}}`;
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/subscribe.js":
/*!********************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/subscribe.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscription": () => (/* binding */ Subscription),
/* harmony export */   "subscribe": () => (/* binding */ subscribe)
/* harmony export */ });
/* harmony import */ var _computed_queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_computed_queue */ "./node_modules/grainjs/dist/esm/lib/_computed_queue.js");
/* harmony import */ var _kowrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kowrap */ "./node_modules/grainjs/dist/esm/lib/kowrap.js");
/**
 * subscribe.js implements subscriptions to several observables at once.
 *
 * E.g. if we have some existing observables (which may be instances of `computed`),
 * we can subscribe to them explicitly:
 *    let obs1 = observable(5), obs2 = observable(12);
 *    subscribe(obs1, obs2, (use, v1, v2) => console.log(v1, v2));
 *
 * or implicitly by using `use(obs)` function, which allows dynamic subscriptions:
 *    subscribe(use => console.log(use(obs1), use(obs2)));
 *
 * In either case, if obs1 or obs2 is changed, the callbacks will get called automatically.
 *
 * Creating a subscription allows any number of dependencies to be specified explicitly, and their
 * values will be passed to the callback(). These may be combined with automatic dependencies
 * detected using use(). Note that constructor dependencies have less overhead.
 *
 *    subscribe(...deps, ((use, ...depValues) => READ_CALLBACK));
 */


// Constant empty array, which we use to avoid allocating new read-only empty arrays.
const emptyArray = [];
class Subscription {
    /**
     * Internal constructor for a Subscription. You should use subscribe() function instead.
     * The last owner argument is used by computed() to make itself available as the .owner property
     * of the 'use' function that gets passed to the callback.
     */
    constructor(callback, dependencies, owner) {
        this._depItem = new _computed_queue__WEBPACK_IMPORTED_MODULE_0__.DepItem(this._evaluate, this);
        this._dependencies = dependencies.length > 0 ? dependencies : emptyArray;
        this._depListeners = dependencies.length > 0 ? dependencies.map((obs) => this._subscribeTo(obs)) : emptyArray;
        this._dynDeps = new Map(); // Maps dependent observable to its Listener object.
        this._callback = callback;
        this._useFunc = this._useDependency.bind(this);
        if (owner) {
            this._useFunc.owner = owner;
        }
        this._evaluate();
    }
    /**
     * Disposes the computed, unsubscribing it from all observables it depends on.
     */
    dispose() {
        this._callback = null;
        for (const lis of this._depListeners) {
            lis.dispose();
        }
        for (const lis of this._dynDeps.values()) {
            lis.dispose();
        }
    }
    /**
     * For use by computed(): returns this subscription's hook into the _computed_queue.
     */
    _getDepItem() { return this._depItem; }
    /**
     * @private
     * Gets called when the callback calls `use(obs)` for an observable. It creates a
     * subscription to `obs` if one doesn't yet exist.
     * @param {Observable} obs: The observable being used as a dependency.
     */
    _useDependency(_obs) {
        const obs = ('_getDepItem' in _obs) ? _obs : (0,_kowrap__WEBPACK_IMPORTED_MODULE_1__.fromKo)(_obs);
        let listener = this._dynDeps.get(obs);
        if (!listener) {
            listener = this._subscribeTo(obs);
            this._dynDeps.set(obs, listener);
        }
        listener._inUse = true;
        this._depItem.useDep(obs._getDepItem());
        return obs.get();
    }
    /**
     * @private
     * Calls the callback() with appropriate args, and updates subscriptions when it is done.
     * I.e. adds dynamic subscriptions created via `use(obs)`, and disposes those no longer used.
     */
    _evaluate() {
        if (this._callback === null) {
            return;
        } // Means this Subscription has been disposed.
        try {
            // Note that this is faster than using .map().
            const readArgs = [this._useFunc];
            for (let i = 0, len = this._dependencies.length; i < len; i++) {
                readArgs[i + 1] = this._dependencies[i].get();
                this._depItem.useDep(this._dependencies[i]._getDepItem());
            }
            return this._callback.apply(undefined, readArgs);
        }
        finally {
            this._dynDeps.forEach((listener, obs) => {
                if (listener._inUse) {
                    listener._inUse = false;
                }
                else {
                    this._dynDeps.delete(obs);
                    listener.dispose();
                }
            });
        }
    }
    /**
     * @private
     * Subscribes this computed to another observable that it depends on.
     * @param {Observable} obs: The observable to subscribe to.
     * @returns {Listener} Listener object.
     */
    _subscribeTo(_obs) {
        const obs = ('_getDepItem' in _obs) ? _obs : (0,_kowrap__WEBPACK_IMPORTED_MODULE_1__.fromKo)(_obs);
        return obs.addListener(this._enqueue, this);
    }
    /**
     * @private
     * Adds this item to the recompute queue.
     */
    _enqueue() {
        this._depItem.enqueue();
    }
}
/**
 * Creates a new Subscription.
 * @param {Observable} ...observables: The initial params, of which there may be zero or more, are
 *    observables on which this computed depends. When any of them change, the callback()
 *    will be called with the values of these observables as arguments.
 * @param {Function} callback: will be called with arguments (use, ...values), i.e. the
 *    `use` function and values for all of the ...observables that precede this argument.
 *    This callback is called immediately, and whenever any dependency changes.
 * @returns {Subscription} The new subscription which may be disposed to unsubscribe.
 */
function subscribe(...args) {
    const cb = args.pop();
    // The cast helps ensure that Observable is compatible with ISubscribable abstraction that we use.
    return new Subscription(cb, args);
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/util.js":
/*!***************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/util.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bindB": () => (/* binding */ bindB),
/* harmony export */   "bindUB": () => (/* binding */ bindUB),
/* harmony export */   "bindBU": () => (/* binding */ bindBU)
/* harmony export */ });
/**
 * Returns f such that f() calls func(...boundArgs), i.e. optimizes `() => func(...boundArgs)`.
 * It is faster on node6 by 57-92%.
 */
function bindB(func, b) {
    switch (b.length) {
        case 0: return () => func();
        case 1: return () => func(b[0]);
        case 2: return () => func(b[0], b[1]);
        case 3: return () => func(b[0], b[1], b[2]);
        case 4: return () => func(b[0], b[1], b[2], b[3]);
        case 5: return () => func(b[0], b[1], b[2], b[3], b[4]);
        case 6: return () => func(b[0], b[1], b[2], b[3], b[4], b[5]);
        case 7: return () => func(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
        case 8: return () => func(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
        default: return () => func.apply(undefined, b);
    }
}
/**
 * Returns f such that f(unboundArg) calls func(unboundArg, ...boundArgs).
 * I.e. optimizes `(arg) => func(arg, ...boundArgs)`.
 * It is faster on node6 by 0-92%.
 */
function bindUB(func, b) {
    switch (b.length) {
        case 0: return (arg) => func(arg);
        case 1: return (arg) => func(arg, b[0]);
        case 2: return (arg) => func(arg, b[0], b[1]);
        case 3: return (arg) => func(arg, b[0], b[1], b[2]);
        case 4: return (arg) => func(arg, b[0], b[1], b[2], b[3]);
        case 5: return (arg) => func(arg, b[0], b[1], b[2], b[3], b[4]);
        case 6: return (arg) => func(arg, b[0], b[1], b[2], b[3], b[4], b[5]);
        case 7: return (arg) => func(arg, b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
        case 8: return (arg) => func(arg, b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
        default: return (arg) => func(arg, ...b);
    }
}
/**
 * Returns f such that f(unboundArg) calls func(...boundArgs, unboundArg).
 * I.e. optimizes `(arg) => func(...boundArgs, arg)`.
 * It is faster on node6 by 0-92%.
 */
function bindBU(func, b) {
    switch (b.length) {
        case 0: return (arg) => func(arg);
        case 1: return (arg) => func(b[0], arg);
        case 2: return (arg) => func(b[0], b[1], arg);
        case 3: return (arg) => func(b[0], b[1], b[2], arg);
        case 4: return (arg) => func(b[0], b[1], b[2], b[3], arg);
        case 5: return (arg) => func(b[0], b[1], b[2], b[3], b[4], arg);
        case 6: return (arg) => func(b[0], b[1], b[2], b[3], b[4], b[5], arg);
        case 7: return (arg) => func(b[0], b[1], b[2], b[3], b[4], b[5], b[6], arg);
        case 8: return (arg) => func(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], arg);
        default: return (arg) => func(...b, arg);
    }
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/widgets/input.js":
/*!************************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/widgets/input.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "input": () => (/* binding */ input)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index */ "./node_modules/grainjs/dist/esm/index.js");
/**
 * General INPUT widget.
 */

/**
 * Creates a input element tied to the given observable. The required options argument allows
 * controlling the behavior, see IInputOptions for details.
 *
 * This is intended for string input elements, with "type" such as text, email, url, password,
 * number, tel.
 *
 * Note that every change to the observable will affect the input element, but not every change to
 * the input element will affect the observable. Specifically, unless {onInput: true} is set, the
 * visible content may differ from the observable until the element loses focus or Enter is hit.
 *
 * Example usage:
 *    input(obs, {}, {type: 'text', placeholder: 'Your name...'});
 *    input(obs, {isValid: isValidObs}, {type: 'email', placeholder: 'Your email...'});
 *    input(obs, {onInput: true}, {type: 'text'});
 */
function input(obs, options, ...args) {
    const isValid = options.isValid;
    function setValue(elem) {
        (0,_index__WEBPACK_IMPORTED_MODULE_0__.bundleChanges)(() => {
            obs.set(elem.value);
            if (isValid) {
                isValid.set(elem.validity.valid);
            }
        });
    }
    return (0,_index__WEBPACK_IMPORTED_MODULE_0__.dom)('input', ...args, _index__WEBPACK_IMPORTED_MODULE_0__.dom.prop('value', obs), (isValid ?
        (elem) => _index__WEBPACK_IMPORTED_MODULE_0__.dom.autoDisposeElem(elem, (0,_index__WEBPACK_IMPORTED_MODULE_0__.subscribe)(obs, (use) => isValid.set(elem.checkValidity()))) :
        null), options.onInput ? _index__WEBPACK_IMPORTED_MODULE_0__.dom.on('input', (e, elem) => setValue(elem)) : null, _index__WEBPACK_IMPORTED_MODULE_0__.dom.on('change', (e, elem) => setValue(elem)), _index__WEBPACK_IMPORTED_MODULE_0__.dom.onKeyPress({ Enter: (e, elem) => setValue(elem) }));
}


/***/ }),

/***/ "./node_modules/grainjs/dist/esm/lib/widgets/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/grainjs/dist/esm/lib/widgets/select.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "select": () => (/* binding */ select)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index */ "./node_modules/grainjs/dist/esm/index.js");
/**
 * Select dropdown widget.
 */

function unwrapMaybeObsArray(array) {
    return Array.isArray(array) ? array : array.get();
}
function getOptionValue(option) {
    return (typeof option === "string") ?
        option : option.value;
}
/**
 * Creates a select dropdown widget. The observable `obs` reflects the value of the selected
 * option, and `optionArray` is an array (regular or observable) of option values and labels.
 * These may be either strings, or {label, value, disabled} objects.
 *
 * The type of value may be any type at all; it is opaque to this widget.
 *
 * If obs is set to an invalid or disabled value, then defLabel option is used to determine the
 * label that the select box will show, blank by default.
 *
 * Usage:
 *    const fruit = observable("apple");
 *    select(fruit, ["apple", "banana", "mango"]);
 *
 *    const employee = observable(17);
 *    const employees = obsArray<IOption<number>>([
 *      {value: 12, label: "Bob", disabled: true},
 *      {value: 17, label: "Alice"},
 *      {value: 21, label: "Eve"},
 *    ]);
 *    select(employee, employees, {defLabel: "Select employee:"});
 */
function select(obs, optionArray, options = {}) {
    const { defLabel = "" } = options;
    return (0,_index__WEBPACK_IMPORTED_MODULE_0__.dom)('select', 
    // Include a hidden option to represent a default value. This one gets shown when none of the
    // options are selected. This is more consistent when showing the first valid option.
    (0,_index__WEBPACK_IMPORTED_MODULE_0__.dom)('option', _index__WEBPACK_IMPORTED_MODULE_0__.dom.hide(true), defLabel), 
    // Create all the option elements.
    _index__WEBPACK_IMPORTED_MODULE_0__.dom.forEach(optionArray, (option) => {
        const obj = (typeof option === "string") ?
            { value: option, label: option } : option;
        // Note we only set 'selected' when an <option> is created; we are not subscribing to obs.
        // This is to reduce the amount of subscriptions, esp. when number of options is large.
        return (0,_index__WEBPACK_IMPORTED_MODULE_0__.dom)('option', {
            disabled: obj.disabled,
            selected: obj.value === obs.get(),
        }, obj.label);
    }), 
    // When obs changes, update select's value; we do it after <options> have been created.
    // Note that autoDisposeElem ensures the subscription is disposed with the 'select' element.
    (elem) => _index__WEBPACK_IMPORTED_MODULE_0__.dom.autoDisposeElem(elem, (0,_index__WEBPACK_IMPORTED_MODULE_0__.subscribe)(obs, (use, obsValue) => {
        const arr = unwrapMaybeObsArray(optionArray);
        const index = arr.findIndex((item) => getOptionValue(item) === obsValue);
        elem.selectedIndex = index + 1; // +1 for default option
    })), 
    // When user picks a new item, use its value to update the observable.
    _index__WEBPACK_IMPORTED_MODULE_0__.dom.on('change', (e, elem) => {
        const index = elem.selectedIndex;
        const item = unwrapMaybeObsArray(optionArray)[index - 1]; // -1 for default option
        // It should be impossible for the user to select an invalid option, but check just in case.
        if (item !== undefined) {
            obs.set(getOptionValue(item));
        }
    }));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./build/app/bankPage.js ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const grainjs_1 = __webpack_require__(/*! grainjs */ "./node_modules/grainjs/dist/esm/index.js");
const bank = __webpack_require__(/*! ./bank */ "./build/app/bank.js");
const accountIds = ['A', 'B', 'C'];
const balanceObs = grainjs_1.Observable.create(null, [0, 0, 0]);
async function updateBalanceObs() {
    balanceObs.set(await Promise.all(accountIds.map(bank.getBalance)));
}
async function initialize() {
    try {
        return await bank.initialize();
    }
    finally {
        await updateBalanceObs();
    }
}
async function transfer(accFrom, accTo, amount) {
    try {
        return await bank.transfer(accFrom, accTo, amount);
    }
    finally {
        await updateBalanceObs();
    }
}
function buildPageDom() {
    initialize();
    const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return [
        cssBody.cls(''),
        'Balances:',
        accountIds.map((accId, i) => cssBalance(cssAccountId(accId), cssAccountBalance(grainjs_1.dom.text((use) => fmt.format(use(balanceObs)[i])))))
    ];
}
const cssBody = grainjs_1.styled('div', `
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 14px;

  display: flex;
  align-items: center;
  gap: 20px;
`);
const cssBalance = grainjs_1.styled('div', `
  margin: 0 10px;
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  align-items: center;
`);
const cssAccountId = grainjs_1.styled('div', `
  padding: 6px 10px;
  background-color: grey;
  color: white;
`);
const cssAccountBalance = grainjs_1.styled('div', `
  padding: 4px 8px;
`);
grainjs_1.dom.update(document.body, buildPageDom());
window.bank = { initialize, transfer, getBalance: bank.getBalance };

})();

/******/ })()
;
//# sourceMappingURL=bankPage.js.map