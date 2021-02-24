/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/grain-rpc/dist/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/grain-rpc/dist/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
__export(__webpack_require__(/*! ./message */ "./node_modules/grain-rpc/dist/lib/message.js"));
__export(__webpack_require__(/*! ./rpc */ "./node_modules/grain-rpc/dist/lib/rpc.js"));


/***/ }),

/***/ "./node_modules/grain-rpc/dist/lib/message.js":
/*!****************************************************!*\
  !*** ./node_modules/grain-rpc/dist/lib/message.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * This defines the message types sent over an RpcChannel.
 *
 * WARNING: Any changes to these must be backward-compatible, since Rpc may be used across
 * different versions of this library. Specifically, enums must not be renumbered, fields renamed,
 * or their types changed. Really, the only reasonable enhancement is adding a new optional field.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MsgType;
(function (MsgType) {
    // Warning: Do NOT renumber enums (see warning above).
    MsgType[MsgType["RpcCall"] = 1] = "RpcCall";
    MsgType[MsgType["RpcRespData"] = 2] = "RpcRespData";
    MsgType[MsgType["RpcRespErr"] = 3] = "RpcRespErr";
    MsgType[MsgType["Custom"] = 4] = "Custom";
    MsgType[MsgType["Ready"] = 5] = "Ready";
})(MsgType = exports.MsgType || (exports.MsgType = {}));


/***/ }),

/***/ "./node_modules/grain-rpc/dist/lib/rpc.js":
/*!************************************************!*\
  !*** ./node_modules/grain-rpc/dist/lib/rpc.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Rpc implements an remote-procedure-call interface on top of a simple messaging interface.
 *
 * The user must provide the messaging between two endpoints, and in return gets the ability to
 * register interfaces or functions at either endpoint, and call them from the other side. For
 * messaging, the user must supply a sendMessage() function to send messages to the other side,
 * and must call rpc.receiveMessage(msg) whenever a message is received.
 *
 * E.g.
 *    rpc.registerImpl<MyInterface>("some-name", new MyInterfaceImpl(), descMyInterfaceImpl);
 *    rpc.getStub<MyInterface>("some-name", descMyInterfaceImpl)
 *          => returns a stub implemeting MyInterface
 *
 * Calls to the generated stub get turned into messages across the channel, and then call to the
 * implementation object registered on the other side. Both return values and exceptions get
 * passed back over the channel, and cause the promise from the stub to be resolved or rejected.
 *
 * Note that the stub interface returns Promises for all methods.
 *
 * Rpc library supports ts-interface-checker descriptors for the interfaces, to allow validation.
 * You may skip it by passing in `rpc.unchecked` where a descriptor is expected; it will skip
 * checks and you will not get descriptive errors.
 *
 * The string name used to register and use an implementation allows for the same Rpc object to be
 * used to expose multiple interfaces, or different implementations of the same interface.
 *
 * Messaging
 * ---------
 * Rpc also supports a messaging interface, with postMessage() to send arbitrary messages, and an
 * EventEmitter interface for "message" events to receive them, e.g. on("message", ...). So if you
 * need to multiplex non-Rpc messages over the same channel, Rpc class does it for you.
 *
 * Cleanup
 * -------
 * If the channel is closed or had an error, and will no longer be used, the user of Rpc must
 * call rpc.close() to reject any calls waiting for an answer.
 *
 * If a particular stub for a remote API is no longer needed, user may call rpc.discardStub(stub)
 * to reject any pending calls made to that stub.
 *
 * Timeouts
 * --------
 * TODO (Not yet implementd.)
 * You may call rpc.setTimeout(ms) or rpc.setStubTimeout(stub, ms) to set a call timeout for all
 * stubs or for a particular one. If a response to a call does not arrive within the timeout, the
 * call gets rejected, and the rejection Error will have a "code" property set to "TIMEOUT".
 *
 * Forwarding
 * ----------
 * Rpc.registerForwarder() along with methods with "-Forward" suffix allow one Rpc object to forward
 * calls and messages to another Rpc object. The intended usage is when Rpc connects A to B, and B
 * to C. Then B can use registerForwarder to expose A's interfaces to C (or C's to A) without having
 * to know what exactly they are. A default forwarder can be registered using the '*' name.
 *
 *
 * Instead of using getStubForward and callRemoteFuncForward, the forwarder name can be
 * appended to the interface name as "interfaceName@forwarderName" and the regular
 * getStub and callRemoteFunc methods can be used.  For example:
 *   getStub("iface@forwarder")
 * is the same as:
 *   getStubForward("forwarder", "iface")
 *
 *
 * E.g. with A.registerImpl("A-name", ...) and B.registerForwarder("b2a", A), we may now call
 * C.getStubForward("b2a", "A-name") to get a stub that will forward calls to A, as well as
 * C.postMessageForward("b2a", msg) to have the message received by A.
 *
 * TODO We may want to support progress callbacks, perhaps by supporting arbitrary callbacks as
 * parameters. (Could be implemented by allowing "meth" to be [reqId, paramPath]) It would be nice
 * to allow the channel to report progress too, e.g. to report progress of uploading large files.
 *
 * TODO Sending of large files should probably be a separate feature, to allow for channel
 * implementations to stream them.
 */
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const tic = __webpack_require__(/*! ts-interface-checker */ "./node_modules/ts-interface-checker/dist/index.js");
const message_1 = __webpack_require__(/*! ./message */ "./node_modules/grain-rpc/dist/lib/message.js");
const plainCall = (callFunc) => callFunc();
class Rpc extends events_1.EventEmitter {
    /**
     * To use Rpc, you must provide a sendMessage function that sends a message to the other side;
     * it may be given in the constructor, or later with setSendMessage. You must also call
     * receiveMessage() for every message received from the other side.
     */
    constructor(options = {}) {
        super();
        // Note the invariant: _inactiveSendQueue == null iff (_sendMessageCB != null && !_waitForReadyMessage)
        this._sendMessageCB = null;
        this._inactiveRecvQueue = null; // queue of received message
        this._inactiveSendQueue = null; // queue of messages to be sent
        this._waitForReadyMessage = false;
        this._implMap = new Map();
        this._forwarders = new Map();
        this._pendingCalls = new Map();
        this._nextRequestId = 1;
        const { logger = console, sendMessage = null, callWrapper = plainCall } = options;
        this._logger = logger;
        this._callWrapper = callWrapper;
        this.setSendMessage(sendMessage);
    }
    /**
     * To use Rpc, call this for every message received from the other side of the channel.
     */
    receiveMessage(msg) {
        if (this._inactiveRecvQueue) {
            this._inactiveRecvQueue.push(msg);
        }
        else {
            this._dispatch(msg);
        }
    }
    /**
     * If you've set up calls to receiveMessage(), but need time to call registerImpl() before
     * processing new messages, you may use queueIncoming(), make the registerImpl() calls,
     * and then call processIncoming() to handle queued messages and resume normal processing.
     */
    queueIncoming() {
        if (!this._inactiveRecvQueue) {
            this._inactiveRecvQueue = [];
        }
    }
    /**
     * Process received messages queued since queueIncoming, and resume normal processing of
     * received messages.
     */
    processIncoming() {
        if (this._inactiveRecvQueue) {
            processQueue(this._inactiveRecvQueue, this._dispatch.bind(this));
            this._inactiveRecvQueue = null;
        }
    }
    /**
     * Set the callback to send messages. If set to null, sent messages will be queued. If you
     * disconnect and want for sent messages to throw, set a callback that throws.
     */
    setSendMessage(sendMessage) {
        this._sendMessageCB = sendMessage;
        if (this._sendMessageCB) {
            this._processOutgoing();
        }
        else {
            this._queueOutgoing();
        }
    }
    /**
     * If your peer may not be listening yet to your messages, you may call this to queue outgoing
     * messages until receiving a "ready" message from the peer. I.e. one peer may call
     * queueOutgoingUntilReadyMessage() while the other calls sendReadyMessage().
     */
    queueOutgoingUntilReadyMessage() {
        this._waitForReadyMessage = true;
        this._queueOutgoing();
    }
    /**
     * If your peer is using queueOutgoingUntilReadyMessage(), you should let it know that you are
     * ready using sendReadyMessage() as soon as you've set up the processing of received messages.
     * Note that at most one peer may use queueOutgoingUntilReadyMessage(), or they will deadlock.
     */
    sendReadyMessage() {
        return this._sendMessage({ mtype: message_1.MsgType.Ready });
    }
    /**
     * Messaging interface: send data to the other side, to be emitted there as a "message" event.
     */
    postMessage(data) { return this.postMessageForward("", data); }
    postMessageForward(fwdDest, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = { mtype: message_1.MsgType.Custom, data };
            if (fwdDest) {
                msg.mdest = fwdDest;
            }
            yield this._sendMessage(msg);
        });
    }
    registerImpl(name, impl, checker) {
        if (this._implMap.has(name)) {
            throw new Error(`Rpc.registerImpl has already been called for ${name}`);
        }
        const invokeImpl = (call) => impl[call.meth](...call.args);
        if (!checker) {
            this._implMap.set(name, { name, invokeImpl, argsCheckers: null });
        }
        else {
            const ttype = checker.getType();
            if (!(ttype instanceof tic.TIface)) {
                throw new Error("Rpc.registerImpl requires a Checker for an interface");
            }
            const argsCheckers = {};
            for (const prop of ttype.props) {
                if (prop.ttype instanceof tic.TFunc) {
                    argsCheckers[prop.name] = checker.methodArgs(prop.name);
                }
            }
            this._implMap.set(name, { name, invokeImpl, argsCheckers });
        }
    }
    registerForwarder(fwdName, dest, fwdDest = (fwdName === "*" ? "*" : "")) {
        const passThru = fwdDest === "*";
        this._forwarders.set(fwdName, {
            name: "[FWD]" + fwdName,
            argsCheckers: null,
            invokeImpl: (c) => dest.forwardCall(Object.assign({}, c, { mdest: passThru ? c.mdest : fwdDest })),
            forwardMessage: (msg) => dest.forwardMessage(Object.assign({}, msg, { mdest: passThru ? msg.mdest : fwdDest })),
        });
    }
    unregisterForwarder(fwdName) {
        this._forwarders.delete(fwdName);
    }
    /**
     * Unregister an implementation, if one was registered with this name.
     */
    unregisterImpl(name) {
        this._implMap.delete(name);
    }
    getStub(name, checker) {
        const parts = this._parseName(name);
        return this.getStubForward(parts.forwarder, parts.name, checker);
    }
    getStubForward(fwdDest, name, checker) {
        if (!checker) {
            // TODO Test, then explain how this works.
            return new Proxy({}, {
                get: (target, property, receiver) => {
                    if (property === "then") {
                        // By default, take care not to look "thenable", so that the stub can be returned
                        // as a value of a Promise:
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
                        // If user really wants to proxy "then", they can write a checker.
                        return undefined;
                    }
                    return (...args) => this._makeCall(name, property, args, anyChecker, fwdDest);
                },
            });
        }
        else {
            const ttype = checker.getType();
            if (!(ttype instanceof tic.TIface)) {
                throw new Error("Rpc.getStub requires a Checker for an interface");
            }
            const api = {};
            for (const prop of ttype.props) {
                if (prop.ttype instanceof tic.TFunc) {
                    const resultChecker = checker.methodResult(prop.name);
                    api[prop.name] = (...args) => this._makeCall(name, prop.name, args, resultChecker, fwdDest);
                }
            }
            return api;
        }
    }
    /**
     * Simple way to registers a function under a given name, with no argument checking.
     */
    registerFunc(name, impl) {
        return this.registerImpl(name, { invoke: impl }, checkerAnyFunc);
    }
    /**
     * Unregister a function, if one was registered with this name.
     */
    unregisterFunc(name) {
        return this.unregisterImpl(name);
    }
    /**
     * Call a remote function registered with registerFunc. Does no type checking.
     */
    callRemoteFunc(name, ...args) {
        const parts = this._parseName(name);
        return this.callRemoteFuncForward(parts.forwarder, parts.name, ...args);
    }
    callRemoteFuncForward(fwdDest, name, ...args) {
        return this._makeCall(name, "invoke", args, anyChecker, fwdDest);
    }
    forwardCall(c) {
        return this._makeCall(c.iface, c.meth, c.args, anyChecker, c.mdest || "");
    }
    forwardMessage(msg) {
        return this.postMessageForward(msg.mdest || "", msg.data);
    }
    // Mark outgoing messages for queueing.
    _queueOutgoing() {
        if (!this._inactiveSendQueue) {
            this._inactiveSendQueue = [];
        }
    }
    // If sendMessageCB is set and we are no longer waiting for a ready message, send out any
    // queued outgoing messages and resume normal sending.
    _processOutgoing() {
        if (this._inactiveSendQueue && this._sendMessageCB && !this._waitForReadyMessage) {
            processQueue(this._inactiveSendQueue, this._sendMessageOrReject.bind(this, this._sendMessageCB));
            this._inactiveSendQueue = null;
        }
    }
    _sendMessage(msg) {
        if (this._inactiveSendQueue) {
            this._inactiveSendQueue.push(msg);
        }
        else {
            return this._sendMessageOrReject(this._sendMessageCB, msg);
        }
    }
    // This helper calls calls sendMessage(msg), and if that call fails, rejects the call
    // represented by msg (when it's of type RpcCall).
    _sendMessageOrReject(sendMessage, msg) {
        if (this._logger.info) {
            const desc = (msg.mtype === message_1.MsgType.RpcCall) ? ": " + this._callDesc(msg) : "";
            this._logger.info(`Rpc sending ${message_1.MsgType[msg.mtype]}${desc}`);
        }
        return catchMaybePromise(() => sendMessage(msg), (err) => this._sendReject(msg, err));
    }
    // Rejects a RpcCall due to the given send error; this helper always re-throws.
    _sendReject(msg, err) {
        const newErr = new ErrorWithCode("RPC_SEND_FAILED", `Send failed: ${err.message}`);
        if (msg.mtype === message_1.MsgType.RpcCall && msg.reqId !== undefined) {
            const callObj = this._pendingCalls.get(msg.reqId);
            if (callObj) {
                this._pendingCalls.delete(msg.reqId);
                callObj.reject(newErr);
            }
        }
        this.emit("error", newErr);
        throw newErr;
    }
    _makeCallRaw(iface, meth, args, resultChecker, fwdDest) {
        return new Promise((resolve, reject) => {
            const reqId = this._nextRequestId++;
            const callObj = { reqId, iface, meth, resolve, reject, resultChecker };
            this._pendingCalls.set(reqId, callObj);
            // Send the Call message. If the sending fails, reject the _makeCall promise. If it
            // succeeds, we save {resolve,reject} to resolve _makeCall when we get back a response.
            this._info(callObj, "RPC_CALLING");
            const msg = { mtype: message_1.MsgType.RpcCall, reqId, iface, meth, args };
            if (fwdDest) {
                msg.mdest = fwdDest;
            }
            // If _sendMessage fails, reject, allowing it to throw synchronously or not.
            catchMaybePromise(() => this._sendMessage(msg), reject);
        });
    }
    _makeCall(iface, meth, args, resultChecker, fwdDest) {
        return this._callWrapper(() => this._makeCallRaw(iface, meth, args, resultChecker, fwdDest));
    }
    _dispatch(msg) {
        switch (msg.mtype) {
            case message_1.MsgType.RpcCall: {
                this._onMessageCall(msg);
                return;
            }
            case message_1.MsgType.RpcRespData:
            case message_1.MsgType.RpcRespErr: {
                this._onMessageResp(msg);
                return;
            }
            case message_1.MsgType.Custom: {
                this._onCustomMessage(msg);
                return;
            }
            case message_1.MsgType.Ready: {
                this._waitForReadyMessage = false;
                try {
                    this._processOutgoing();
                }
                catch (e) { /* swallowing error, an event 'error' was already emitted */ }
                return;
            }
        }
    }
    _onCustomMessage(msg) {
        if (msg.mdest) {
            const impl = this._forwarders.get(msg.mdest) || this._forwarders.get("*");
            if (!impl) {
                this._warn(null, "RPC_UNKNOWN_FORWARD_DEST", "Unknown forward destination");
            }
            else {
                impl.forwardMessage(msg);
            }
        }
        else {
            this.emit("message", msg.data);
        }
    }
    _onMessageCall(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let impl;
            if (call.mdest) {
                impl = this._forwarders.get(call.mdest) || this._forwarders.get("*");
                if (!impl) {
                    return this._failCall(call, "RPC_UNKNOWN_FORWARD_DEST", "Unknown forward destination");
                }
            }
            else {
                impl = this._implMap.get(call.iface);
                if (!impl) {
                    return this._failCall(call, "RPC_UNKNOWN_INTERFACE", "Unknown interface");
                }
            }
            if (!impl.argsCheckers) {
                // No call or argument checking.
            }
            else {
                // Check the method name and argument types.
                if (!impl.argsCheckers.hasOwnProperty(call.meth)) {
                    return this._failCall(call, "RPC_UNKNOWN_METHOD", "Unknown method");
                }
                const argsChecker = impl.argsCheckers[call.meth];
                try {
                    argsChecker.check(call.args);
                }
                catch (e) {
                    return this._failCall(call, "RPC_INVALID_ARGS", `Invalid args: ${e.message}`);
                }
            }
            if (call.reqId === undefined) {
                return this._failCall(call, "RPC_MISSING_REQID", "Missing request id");
            }
            this._info(call, "RPC_ONCALL");
            let result;
            try {
                result = yield impl.invokeImpl(call);
            }
            catch (e) {
                return this._failCall(call, e.code, e.message, "RPC_ONCALL_ERROR");
            }
            this._info(call, "RPC_ONCALL_OK");
            return this._sendResponse(call.reqId, result);
        });
    }
    _failCall(call, code, mesg, reportCode) {
        return __awaiter(this, void 0, void 0, function* () {
            this._warn(call, reportCode || code, mesg);
            if (call.reqId !== undefined) {
                const msg = { mtype: message_1.MsgType.RpcRespErr, reqId: call.reqId, mesg, code };
                yield this._sendMessage(msg);
            }
        });
    }
    _sendResponse(reqId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = { mtype: message_1.MsgType.RpcRespData, reqId, data };
            yield this._sendMessage(msg);
        });
    }
    _onMessageResp(resp) {
        const callObj = this._pendingCalls.get(resp.reqId);
        this._pendingCalls.delete(resp.reqId);
        if (!callObj) {
            this._warn(null, "RPC_UNKNOWN_REQID", `Response to unknown reqId ${resp.reqId}`);
            return;
        }
        if (resp.mtype === message_1.MsgType.RpcRespErr) {
            this._info(callObj, "RPC_RESULT_ERROR", resp.mesg);
            return callObj.reject(new ErrorWithCode(resp.code, resp.mesg));
        }
        try {
            callObj.resultChecker.check(resp.data);
        }
        catch (e) {
            this._warn(callObj, "RPC_RESULT_INVALID", e.message);
            return callObj.reject(new ErrorWithCode("RPC_INVALID_RESULT", `Implementation produced invalid result: ${e.message}`));
        }
        this._info(callObj, "RPC_RESULT_OK");
        callObj.resolve(resp.data);
    }
    _info(call, code, message) {
        if (this._logger.info) {
            const msg = message ? " " + message : "";
            this._logger.info(`Rpc for ${this._callDesc(call)}: ${code}${msg}`);
        }
    }
    _warn(call, code, message) {
        if (this._logger.warn) {
            const msg = message ? " " + message : "";
            this._logger.warn(`Rpc for ${this._callDesc(call)}: ${code}${msg}`);
        }
    }
    _callDesc(call) {
        if (!call) {
            return "?";
        }
        return `${call.iface}.${call.meth}#${call.reqId || "-"}`;
    }
    _parseName(name) {
        const idx = name.lastIndexOf("@");
        if (idx === -1) {
            return {
                forwarder: "",
                name,
            };
        }
        return {
            name: name.substr(0, idx),
            forwarder: name.substr(idx + 1),
        };
    }
}
exports.Rpc = Rpc;
/**
 * Interfaces may throw errors that include .code field, and it gets propagated to callers (e.g.
 * "NOT_AUTHORIZED"). Its purpose is to be a stable way to distinguish different types of errors.
 * This way the human-friendly error message can be changed without affecting behavior.
 */
class ErrorWithCode extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.ErrorWithCode = ErrorWithCode;
const IAnyFunc = tic.iface([], {
    invoke: tic.func("any"),
});
const { IAnyFunc: checkerAnyFunc } = tic.createCheckers({ IAnyFunc });
const checkerAnyResult = checkerAnyFunc.methodResult("invoke");
const anyChecker = checkerAnyResult;
/**
 * A little helper that processes message queues when starting an rpc instance.
 */
function processQueue(queue, processFunc) {
    let i = 0;
    try {
        while (i < queue.length) {
            // i gets read and then incremented before the call, so that if processFunc throws, the
            // message still gets removed from the queue (to avoid processing it twice).
            processFunc(queue[i++]);
        }
    }
    finally {
        queue.splice(0, i);
    }
}
/**
 * Calls callback(), handling the exception both synchronously and not. If callback and handler
 * both return or throw synchronously, then so does this method.
 */
function catchMaybePromise(callback, handler) {
    try {
        const p = callback();
        if (p) {
            return p.catch(handler);
        }
    }
    catch (err) {
        return handler(err);
    }
}


/***/ }),

/***/ "./node_modules/ts-interface-checker/dist/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-interface-checker/dist/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Checker = exports.createCheckers = void 0;
var types_1 = __webpack_require__(/*! ./types */ "./node_modules/ts-interface-checker/dist/types.js");
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/ts-interface-checker/dist/util.js");
/**
 * Export functions used to define interfaces.
 */
var types_2 = __webpack_require__(/*! ./types */ "./node_modules/ts-interface-checker/dist/types.js");
Object.defineProperty(exports, "TArray", ({ enumerable: true, get: function () { return types_2.TArray; } }));
Object.defineProperty(exports, "TEnumType", ({ enumerable: true, get: function () { return types_2.TEnumType; } }));
Object.defineProperty(exports, "TEnumLiteral", ({ enumerable: true, get: function () { return types_2.TEnumLiteral; } }));
Object.defineProperty(exports, "TFunc", ({ enumerable: true, get: function () { return types_2.TFunc; } }));
Object.defineProperty(exports, "TIface", ({ enumerable: true, get: function () { return types_2.TIface; } }));
Object.defineProperty(exports, "TLiteral", ({ enumerable: true, get: function () { return types_2.TLiteral; } }));
Object.defineProperty(exports, "TName", ({ enumerable: true, get: function () { return types_2.TName; } }));
Object.defineProperty(exports, "TOptional", ({ enumerable: true, get: function () { return types_2.TOptional; } }));
Object.defineProperty(exports, "TParam", ({ enumerable: true, get: function () { return types_2.TParam; } }));
Object.defineProperty(exports, "TParamList", ({ enumerable: true, get: function () { return types_2.TParamList; } }));
Object.defineProperty(exports, "TProp", ({ enumerable: true, get: function () { return types_2.TProp; } }));
Object.defineProperty(exports, "TTuple", ({ enumerable: true, get: function () { return types_2.TTuple; } }));
Object.defineProperty(exports, "TType", ({ enumerable: true, get: function () { return types_2.TType; } }));
Object.defineProperty(exports, "TUnion", ({ enumerable: true, get: function () { return types_2.TUnion; } }));
Object.defineProperty(exports, "TIntersection", ({ enumerable: true, get: function () { return types_2.TIntersection; } }));
Object.defineProperty(exports, "array", ({ enumerable: true, get: function () { return types_2.array; } }));
Object.defineProperty(exports, "enumlit", ({ enumerable: true, get: function () { return types_2.enumlit; } }));
Object.defineProperty(exports, "enumtype", ({ enumerable: true, get: function () { return types_2.enumtype; } }));
Object.defineProperty(exports, "func", ({ enumerable: true, get: function () { return types_2.func; } }));
Object.defineProperty(exports, "iface", ({ enumerable: true, get: function () { return types_2.iface; } }));
Object.defineProperty(exports, "lit", ({ enumerable: true, get: function () { return types_2.lit; } }));
Object.defineProperty(exports, "name", ({ enumerable: true, get: function () { return types_2.name; } }));
Object.defineProperty(exports, "opt", ({ enumerable: true, get: function () { return types_2.opt; } }));
Object.defineProperty(exports, "param", ({ enumerable: true, get: function () { return types_2.param; } }));
Object.defineProperty(exports, "tuple", ({ enumerable: true, get: function () { return types_2.tuple; } }));
Object.defineProperty(exports, "union", ({ enumerable: true, get: function () { return types_2.union; } }));
Object.defineProperty(exports, "intersection", ({ enumerable: true, get: function () { return types_2.intersection; } }));
Object.defineProperty(exports, "BasicType", ({ enumerable: true, get: function () { return types_2.BasicType; } }));
var util_2 = __webpack_require__(/*! ./util */ "./node_modules/ts-interface-checker/dist/util.js");
Object.defineProperty(exports, "VError", ({ enumerable: true, get: function () { return util_2.VError; } }));
/**
 * Takes one of more type suites (e.g. a module generated by `ts-interface-builder`), and combines
 * them into a suite of interface checkers. If a type is used by name, that name should be present
 * among the passed-in type suites.
 *
 * The returned object maps type names to Checker objects.
 */
function createCheckers() {
    var typeSuite = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeSuite[_i] = arguments[_i];
    }
    var fullSuite = Object.assign.apply(Object, __spreadArrays([{}, types_1.basicTypes], typeSuite));
    var checkers = {};
    for (var _a = 0, typeSuite_1 = typeSuite; _a < typeSuite_1.length; _a++) {
        var suite_1 = typeSuite_1[_a];
        for (var _b = 0, _c = Object.keys(suite_1); _b < _c.length; _b++) {
            var name = _c[_b];
            checkers[name] = new Checker(fullSuite, suite_1[name]);
        }
    }
    return checkers;
}
exports.createCheckers = createCheckers;
/**
 * Checker implements validation of objects, and also includes accessors to validate method calls.
 * Checkers should be created using `createCheckers()`.
 */
var Checker = /** @class */ (function () {
    // Create checkers by using `createCheckers()` function.
    function Checker(suite, ttype, _path) {
        if (_path === void 0) { _path = 'value'; }
        this.suite = suite;
        this.ttype = ttype;
        this._path = _path;
        this.props = new Map();
        if (ttype instanceof types_1.TIface) {
            for (var _i = 0, _a = ttype.props; _i < _a.length; _i++) {
                var p = _a[_i];
                this.props.set(p.name, p.ttype);
            }
        }
        this.checkerPlain = this.ttype.getChecker(suite, false);
        this.checkerStrict = this.ttype.getChecker(suite, true);
    }
    /**
     * Set the path to report in errors, instead of the default "value". (E.g. if the Checker is for
     * a "person" interface, set path to "person" to report e.g. "person.name is not a string".)
     */
    Checker.prototype.setReportedPath = function (path) {
        this._path = path;
    };
    /**
     * Check that the given value satisfies this checker's type, or throw Error.
     */
    Checker.prototype.check = function (value) { return this._doCheck(this.checkerPlain, value); };
    /**
     * A fast check for whether or not the given value satisfies this Checker's type. This returns
     * true or false, does not produce an error message, and is fast both on success and on failure.
     */
    Checker.prototype.test = function (value) {
        return this.checkerPlain(value, new util_1.NoopContext());
    };
    /**
     * Returns an error object describing the errors if the given value does not satisfy this
     * Checker's type, or null if it does.
     */
    Checker.prototype.validate = function (value) {
        return this._doValidate(this.checkerPlain, value);
    };
    /**
     * Check that the given value satisfies this checker's type strictly. This checks that objects
     * and tuples have no extra members. Note that this prevents backward compatibility, so usually
     * a plain check() is more appropriate.
     */
    Checker.prototype.strictCheck = function (value) { return this._doCheck(this.checkerStrict, value); };
    /**
     * A fast strict check for whether or not the given value satisfies this Checker's type. Returns
     * true or false, does not produce an error message, and is fast both on success and on failure.
     */
    Checker.prototype.strictTest = function (value) {
        return this.checkerStrict(value, new util_1.NoopContext());
    };
    /**
     * Returns an error object describing the errors if the given value does not satisfy this
     * Checker's type strictly, or null if it does.
     */
    Checker.prototype.strictValidate = function (value) {
        return this._doValidate(this.checkerStrict, value);
    };
    /**
     * If this checker is for an interface, returns a Checker for the type required for the given
     * property of this interface.
     */
    Checker.prototype.getProp = function (prop) {
        var ttype = this.props.get(prop);
        if (!ttype) {
            throw new Error("Type has no property " + prop);
        }
        return new Checker(this.suite, ttype, this._path + "." + prop);
    };
    /**
     * If this checker is for an interface, returns a Checker for the argument-list required to call
     * the given method of this interface. E.g. if this Checker is for the interface:
     *    interface Foo {
     *      find(s: string, pos?: number): number;
     *    }
     * Then methodArgs("find").check(...) will succeed for ["foo"] and ["foo", 3], but not for [17].
     */
    Checker.prototype.methodArgs = function (methodName) {
        var tfunc = this._getMethod(methodName);
        return new Checker(this.suite, tfunc.paramList);
    };
    /**
     * If this checker is for an interface, returns a Checker for the return value of the given
     * method of this interface.
     */
    Checker.prototype.methodResult = function (methodName) {
        var tfunc = this._getMethod(methodName);
        return new Checker(this.suite, tfunc.result);
    };
    /**
     * If this checker is for a function, returns a Checker for its argument-list.
     */
    Checker.prototype.getArgs = function () {
        if (!(this.ttype instanceof types_1.TFunc)) {
            throw new Error("getArgs() applied to non-function");
        }
        return new Checker(this.suite, this.ttype.paramList);
    };
    /**
     * If this checker is for a function, returns a Checker for its result.
     */
    Checker.prototype.getResult = function () {
        if (!(this.ttype instanceof types_1.TFunc)) {
            throw new Error("getResult() applied to non-function");
        }
        return new Checker(this.suite, this.ttype.result);
    };
    /**
     * Return the type for which this is a checker.
     */
    Checker.prototype.getType = function () {
        return this.ttype;
    };
    /**
     * Actual implementation of check() and strictCheck().
     */
    Checker.prototype._doCheck = function (checkerFunc, value) {
        var noopCtx = new util_1.NoopContext();
        if (!checkerFunc(value, noopCtx)) {
            var detailCtx = new util_1.DetailContext();
            checkerFunc(value, detailCtx);
            throw detailCtx.getError(this._path);
        }
    };
    Checker.prototype._doValidate = function (checkerFunc, value) {
        var noopCtx = new util_1.NoopContext();
        if (checkerFunc(value, noopCtx)) {
            return null;
        }
        var detailCtx = new util_1.DetailContext();
        checkerFunc(value, detailCtx);
        return detailCtx.getErrorDetail(this._path);
    };
    Checker.prototype._getMethod = function (methodName) {
        var ttype = this.props.get(methodName);
        if (!ttype) {
            throw new Error("Type has no property " + methodName);
        }
        if (!(ttype instanceof types_1.TFunc)) {
            throw new Error("Property " + methodName + " is not a method");
        }
        return ttype;
    };
    return Checker;
}());
exports.Checker = Checker;


/***/ }),

/***/ "./node_modules/ts-interface-checker/dist/types.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-interface-checker/dist/types.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * This module defines nodes used to define types and validations for objects and interfaces.
 */
// tslint:disable:no-shadowed-variable prefer-for-of
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.basicTypes = exports.BasicType = exports.TParamList = exports.TParam = exports.param = exports.TFunc = exports.func = exports.TProp = exports.TOptional = exports.opt = exports.TIface = exports.iface = exports.TEnumLiteral = exports.enumlit = exports.TEnumType = exports.enumtype = exports.TIntersection = exports.intersection = exports.TUnion = exports.union = exports.TTuple = exports.tuple = exports.TArray = exports.array = exports.TLiteral = exports.lit = exports.TName = exports.name = exports.TType = void 0;
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/ts-interface-checker/dist/util.js");
/** Node that represents a type. */
var TType = /** @class */ (function () {
    function TType() {
    }
    return TType;
}());
exports.TType = TType;
/** Parses a type spec into a TType node. */
function parseSpec(typeSpec) {
    return typeof typeSpec === "string" ? name(typeSpec) : typeSpec;
}
function getNamedType(suite, name) {
    var ttype = suite[name];
    if (!ttype) {
        throw new Error("Unknown type " + name);
    }
    return ttype;
}
/**
 * Defines a type name, either built-in, or defined in this suite. It can typically be included in
 * the specs as just a plain string.
 */
function name(value) { return new TName(value); }
exports.name = name;
var TName = /** @class */ (function (_super) {
    __extends(TName, _super);
    function TName(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this._failMsg = "is not a " + name;
        return _this;
    }
    TName.prototype.getChecker = function (suite, strict, allowedProps) {
        var _this = this;
        var ttype = getNamedType(suite, this.name);
        var checker = ttype.getChecker(suite, strict, allowedProps);
        if (ttype instanceof BasicType || ttype instanceof TName) {
            return checker;
        }
        // For complex types, add an additional "is not a <Type>" message on failure.
        return function (value, ctx) { return checker(value, ctx) ? true : ctx.fail(null, _this._failMsg, 0); };
    };
    return TName;
}(TType));
exports.TName = TName;
/**
 * Defines a literal value, e.g. lit('hello') or lit(123).
 */
function lit(value) { return new TLiteral(value); }
exports.lit = lit;
var TLiteral = /** @class */ (function (_super) {
    __extends(TLiteral, _super);
    function TLiteral(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.name = JSON.stringify(value);
        _this._failMsg = "is not " + _this.name;
        return _this;
    }
    TLiteral.prototype.getChecker = function (suite, strict) {
        var _this = this;
        return function (value, ctx) { return (value === _this.value) ? true : ctx.fail(null, _this._failMsg, -1); };
    };
    return TLiteral;
}(TType));
exports.TLiteral = TLiteral;
/**
 * Defines an array type, e.g. array('number').
 */
function array(typeSpec) { return new TArray(parseSpec(typeSpec)); }
exports.array = array;
var TArray = /** @class */ (function (_super) {
    __extends(TArray, _super);
    function TArray(ttype) {
        var _this = _super.call(this) || this;
        _this.ttype = ttype;
        return _this;
    }
    TArray.prototype.getChecker = function (suite, strict) {
        var itemChecker = this.ttype.getChecker(suite, strict);
        return function (value, ctx) {
            if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
            }
            for (var i = 0; i < value.length; i++) {
                var ok = itemChecker(value[i], ctx);
                if (!ok) {
                    return ctx.fail(i, null, 1);
                }
            }
            return true;
        };
    };
    return TArray;
}(TType));
exports.TArray = TArray;
/**
 * Defines a tuple type, e.g. tuple('string', 'number').
 */
function tuple() {
    var typeSpec = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeSpec[_i] = arguments[_i];
    }
    return new TTuple(typeSpec.map(function (t) { return parseSpec(t); }));
}
exports.tuple = tuple;
var TTuple = /** @class */ (function (_super) {
    __extends(TTuple, _super);
    function TTuple(ttypes) {
        var _this = _super.call(this) || this;
        _this.ttypes = ttypes;
        return _this;
    }
    TTuple.prototype.getChecker = function (suite, strict) {
        var itemCheckers = this.ttypes.map(function (t) { return t.getChecker(suite, strict); });
        var checker = function (value, ctx) {
            if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
            }
            for (var i = 0; i < itemCheckers.length; i++) {
                var ok = itemCheckers[i](value[i], ctx);
                if (!ok) {
                    return ctx.fail(i, null, 1);
                }
            }
            return true;
        };
        if (!strict) {
            return checker;
        }
        return function (value, ctx) {
            if (!checker(value, ctx)) {
                return false;
            }
            return value.length <= itemCheckers.length ? true :
                ctx.fail(itemCheckers.length, "is extraneous", 2);
        };
    };
    return TTuple;
}(TType));
exports.TTuple = TTuple;
/**
 * Defines a union type, e.g. union('number', 'null').
 */
function union() {
    var typeSpec = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeSpec[_i] = arguments[_i];
    }
    return new TUnion(typeSpec.map(function (t) { return parseSpec(t); }));
}
exports.union = union;
var TUnion = /** @class */ (function (_super) {
    __extends(TUnion, _super);
    function TUnion(ttypes) {
        var _this = _super.call(this) || this;
        _this.ttypes = ttypes;
        var names = ttypes.map(function (t) { return t instanceof TName || t instanceof TLiteral ? t.name : null; })
            .filter(function (n) { return n; });
        var otherTypes = ttypes.length - names.length;
        if (names.length) {
            if (otherTypes > 0) {
                names.push(otherTypes + " more");
            }
            _this._failMsg = "is none of " + names.join(", ");
        }
        else {
            _this._failMsg = "is none of " + otherTypes + " types";
        }
        return _this;
    }
    TUnion.prototype.getChecker = function (suite, strict) {
        var _this = this;
        var itemCheckers = this.ttypes.map(function (t) { return t.getChecker(suite, strict); });
        return function (value, ctx) {
            var ur = ctx.unionResolver();
            for (var i = 0; i < itemCheckers.length; i++) {
                var ok = itemCheckers[i](value, ur.createContext());
                if (ok) {
                    return true;
                }
            }
            ctx.resolveUnion(ur);
            return ctx.fail(null, _this._failMsg, 0);
        };
    };
    return TUnion;
}(TType));
exports.TUnion = TUnion;
/**
 * Defines an intersection type, e.g. intersection('number', 'null').
 */
function intersection() {
    var typeSpec = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeSpec[_i] = arguments[_i];
    }
    return new TIntersection(typeSpec.map(function (t) { return parseSpec(t); }));
}
exports.intersection = intersection;
var TIntersection = /** @class */ (function (_super) {
    __extends(TIntersection, _super);
    function TIntersection(ttypes) {
        var _this = _super.call(this) || this;
        _this.ttypes = ttypes;
        return _this;
    }
    TIntersection.prototype.getChecker = function (suite, strict) {
        var allowedProps = new Set();
        var itemCheckers = this.ttypes.map(function (t) { return t.getChecker(suite, strict, allowedProps); });
        return function (value, ctx) {
            var ok = itemCheckers.every(function (checker) { return checker(value, ctx); });
            if (ok) {
                return true;
            }
            return ctx.fail(null, null, 0);
        };
    };
    return TIntersection;
}(TType));
exports.TIntersection = TIntersection;
/**
 * Defines an enum type, e.g. enum({'A': 1, 'B': 2}).
 */
function enumtype(values) {
    return new TEnumType(values);
}
exports.enumtype = enumtype;
var TEnumType = /** @class */ (function (_super) {
    __extends(TEnumType, _super);
    function TEnumType(members) {
        var _this = _super.call(this) || this;
        _this.members = members;
        _this.validValues = new Set();
        _this._failMsg = "is not a valid enum value";
        _this.validValues = new Set(Object.keys(members).map(function (name) { return members[name]; }));
        return _this;
    }
    TEnumType.prototype.getChecker = function (suite, strict) {
        var _this = this;
        return function (value, ctx) {
            return (_this.validValues.has(value) ? true : ctx.fail(null, _this._failMsg, 0));
        };
    };
    return TEnumType;
}(TType));
exports.TEnumType = TEnumType;
/**
 * Defines a literal enum value, such as Direction.Up, specified as enumlit("Direction", "Up").
 */
function enumlit(name, prop) {
    return new TEnumLiteral(name, prop);
}
exports.enumlit = enumlit;
var TEnumLiteral = /** @class */ (function (_super) {
    __extends(TEnumLiteral, _super);
    function TEnumLiteral(enumName, prop) {
        var _this = _super.call(this) || this;
        _this.enumName = enumName;
        _this.prop = prop;
        _this._failMsg = "is not " + enumName + "." + prop;
        return _this;
    }
    TEnumLiteral.prototype.getChecker = function (suite, strict) {
        var _this = this;
        var ttype = getNamedType(suite, this.enumName);
        if (!(ttype instanceof TEnumType)) {
            throw new Error("Type " + this.enumName + " used in enumlit is not an enum type");
        }
        var val = ttype.members[this.prop];
        if (!ttype.members.hasOwnProperty(this.prop)) {
            throw new Error("Unknown value " + this.enumName + "." + this.prop + " used in enumlit");
        }
        return function (value, ctx) { return (value === val) ? true : ctx.fail(null, _this._failMsg, -1); };
    };
    return TEnumLiteral;
}(TType));
exports.TEnumLiteral = TEnumLiteral;
function makeIfaceProps(props) {
    return Object.keys(props).map(function (name) { return makeIfaceProp(name, props[name]); });
}
function makeIfaceProp(name, prop) {
    return prop instanceof TOptional ?
        new TProp(name, prop.ttype, true) :
        new TProp(name, parseSpec(prop), false);
}
/**
 * Defines an interface. The first argument is an array of interfaces that it extends, and the
 * second is an array of properties.
 */
function iface(bases, props) {
    return new TIface(bases, makeIfaceProps(props));
}
exports.iface = iface;
var TIface = /** @class */ (function (_super) {
    __extends(TIface, _super);
    function TIface(bases, props) {
        var _this = _super.call(this) || this;
        _this.bases = bases;
        _this.props = props;
        _this.propSet = new Set(props.map(function (p) { return p.name; }));
        return _this;
    }
    TIface.prototype.getChecker = function (suite, strict, allowedProps) {
        var _this = this;
        var baseCheckers = this.bases.map(function (b) { return getNamedType(suite, b).getChecker(suite, strict); });
        var propCheckers = this.props.map(function (prop) { return prop.ttype.getChecker(suite, strict); });
        var testCtx = new util_1.NoopContext();
        // Consider a prop required if it's not optional AND does not allow for undefined as a value.
        var isPropRequired = this.props.map(function (prop, i) {
            return !prop.isOpt && !propCheckers[i](undefined, testCtx);
        });
        var checker = function (value, ctx) {
            if (typeof value !== "object" || value === null) {
                return ctx.fail(null, "is not an object", 0);
            }
            for (var i = 0; i < baseCheckers.length; i++) {
                if (!baseCheckers[i](value, ctx)) {
                    return false;
                }
            }
            for (var i = 0; i < propCheckers.length; i++) {
                var name_1 = _this.props[i].name;
                var v = value[name_1];
                if (v === undefined) {
                    if (isPropRequired[i]) {
                        return ctx.fail(name_1, "is missing", 1);
                    }
                }
                else {
                    var ok = propCheckers[i](v, ctx);
                    if (!ok) {
                        return ctx.fail(name_1, null, 1);
                    }
                }
            }
            return true;
        };
        if (!strict) {
            return checker;
        }
        var propSet = this.propSet;
        if (allowedProps) {
            this.propSet.forEach(function (prop) { return allowedProps.add(prop); });
            propSet = allowedProps;
        }
        // In strict mode, check also for unknown enumerable properties.
        return function (value, ctx) {
            if (!checker(value, ctx)) {
                return false;
            }
            for (var prop in value) {
                if (!propSet.has(prop)) {
                    return ctx.fail(prop, "is extraneous", 2);
                }
            }
            return true;
        };
    };
    return TIface;
}(TType));
exports.TIface = TIface;
/**
 * Defines an optional property on an interface.
 */
function opt(typeSpec) { return new TOptional(parseSpec(typeSpec)); }
exports.opt = opt;
var TOptional = /** @class */ (function (_super) {
    __extends(TOptional, _super);
    function TOptional(ttype) {
        var _this = _super.call(this) || this;
        _this.ttype = ttype;
        return _this;
    }
    TOptional.prototype.getChecker = function (suite, strict) {
        var itemChecker = this.ttype.getChecker(suite, strict);
        return function (value, ctx) {
            return value === undefined || itemChecker(value, ctx);
        };
    };
    return TOptional;
}(TType));
exports.TOptional = TOptional;
/**
 * Defines a property in an interface.
 */
var TProp = /** @class */ (function () {
    function TProp(name, ttype, isOpt) {
        this.name = name;
        this.ttype = ttype;
        this.isOpt = isOpt;
    }
    return TProp;
}());
exports.TProp = TProp;
/**
 * Defines a function. The first argument declares the function's return type, the rest declare
 * its parameters.
 */
function func(resultSpec) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    return new TFunc(new TParamList(params), parseSpec(resultSpec));
}
exports.func = func;
var TFunc = /** @class */ (function (_super) {
    __extends(TFunc, _super);
    function TFunc(paramList, result) {
        var _this = _super.call(this) || this;
        _this.paramList = paramList;
        _this.result = result;
        return _this;
    }
    TFunc.prototype.getChecker = function (suite, strict) {
        return function (value, ctx) {
            return typeof value === "function" ? true : ctx.fail(null, "is not a function", 0);
        };
    };
    return TFunc;
}(TType));
exports.TFunc = TFunc;
/**
 * Defines a function parameter.
 */
function param(name, typeSpec, isOpt) {
    return new TParam(name, parseSpec(typeSpec), Boolean(isOpt));
}
exports.param = param;
var TParam = /** @class */ (function () {
    function TParam(name, ttype, isOpt) {
        this.name = name;
        this.ttype = ttype;
        this.isOpt = isOpt;
    }
    return TParam;
}());
exports.TParam = TParam;
/**
 * Defines a function parameter list.
 */
var TParamList = /** @class */ (function (_super) {
    __extends(TParamList, _super);
    function TParamList(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        return _this;
    }
    TParamList.prototype.getChecker = function (suite, strict) {
        var _this = this;
        var itemCheckers = this.params.map(function (t) { return t.ttype.getChecker(suite, strict); });
        var testCtx = new util_1.NoopContext();
        var isParamRequired = this.params.map(function (param, i) {
            return !param.isOpt && !itemCheckers[i](undefined, testCtx);
        });
        var checker = function (value, ctx) {
            if (!Array.isArray(value)) {
                return ctx.fail(null, "is not an array", 0);
            }
            for (var i = 0; i < itemCheckers.length; i++) {
                var p = _this.params[i];
                if (value[i] === undefined) {
                    if (isParamRequired[i]) {
                        return ctx.fail(p.name, "is missing", 1);
                    }
                }
                else {
                    var ok = itemCheckers[i](value[i], ctx);
                    if (!ok) {
                        return ctx.fail(p.name, null, 1);
                    }
                }
            }
            return true;
        };
        if (!strict) {
            return checker;
        }
        return function (value, ctx) {
            if (!checker(value, ctx)) {
                return false;
            }
            return value.length <= itemCheckers.length ? true :
                ctx.fail(itemCheckers.length, "is extraneous", 2);
        };
    };
    return TParamList;
}(TType));
exports.TParamList = TParamList;
/**
 * Single TType implementation for all basic built-in types.
 */
var BasicType = /** @class */ (function (_super) {
    __extends(BasicType, _super);
    function BasicType(validator, message) {
        var _this = _super.call(this) || this;
        _this.validator = validator;
        _this.message = message;
        return _this;
    }
    BasicType.prototype.getChecker = function (suite, strict) {
        var _this = this;
        return function (value, ctx) { return _this.validator(value) ? true : ctx.fail(null, _this.message, 0); };
    };
    return BasicType;
}(TType));
exports.BasicType = BasicType;
/**
 * Defines the suite of basic types.
 */
exports.basicTypes = {
    any: new BasicType(function (v) { return true; }, "is invalid"),
    number: new BasicType(function (v) { return (typeof v === "number"); }, "is not a number"),
    object: new BasicType(function (v) { return (typeof v === "object" && v); }, "is not an object"),
    boolean: new BasicType(function (v) { return (typeof v === "boolean"); }, "is not a boolean"),
    string: new BasicType(function (v) { return (typeof v === "string"); }, "is not a string"),
    symbol: new BasicType(function (v) { return (typeof v === "symbol"); }, "is not a symbol"),
    void: new BasicType(function (v) { return (v == null); }, "is not void"),
    undefined: new BasicType(function (v) { return (v === undefined); }, "is not undefined"),
    null: new BasicType(function (v) { return (v === null); }, "is not null"),
    never: new BasicType(function (v) { return false; }, "is unexpected"),
    Date: new BasicType(getIsNativeChecker("[object Date]"), "is not a Date"),
    RegExp: new BasicType(getIsNativeChecker("[object RegExp]"), "is not a RegExp"),
};
// This approach for checking native object types mirrors that of lodash. Its advantage over
// `isinstance` is that it can still return true for native objects created in different JS
// execution environments.
var nativeToString = Object.prototype.toString;
function getIsNativeChecker(tag) {
    return function (v) { return typeof v === "object" && v && nativeToString.call(v) === tag; };
}
if (typeof Buffer !== "undefined") {
    exports.basicTypes.Buffer = new BasicType(function (v) { return Buffer.isBuffer(v); }, "is not a Buffer");
}
var _loop_1 = function (array_1) {
    exports.basicTypes[array_1.name] = new BasicType(function (v) { return (v instanceof array_1); }, "is not a " + array_1.name);
};
// Support typed arrays of various flavors
for (var _i = 0, _a = [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array,
    Int32Array, Uint32Array, Float32Array, Float64Array, ArrayBuffer]; _i < _a.length; _i++) {
    var array_1 = _a[_i];
    _loop_1(array_1);
}


/***/ }),

/***/ "./node_modules/ts-interface-checker/dist/util.js":
/*!********************************************************!*\
  !*** ./node_modules/ts-interface-checker/dist/util.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetailContext = exports.NoopContext = exports.VError = void 0;
/**
 * Error thrown by validation. Besides an informative message, it includes the path to the
 * property which triggered the failure.
 */
var VError = /** @class */ (function (_super) {
    __extends(VError, _super);
    function VError(path, message) {
        var _this = _super.call(this, message) || this;
        _this.path = path;
        // See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work for info about this workaround.
        Object.setPrototypeOf(_this, VError.prototype);
        return _this;
    }
    return VError;
}(Error));
exports.VError = VError;
/**
 * Fast implementation of IContext used for first-pass validation. If that fails, we can validate
 * using DetailContext to collect error messages. That's faster for the common case when messages
 * normally pass validation.
 */
var NoopContext = /** @class */ (function () {
    function NoopContext() {
    }
    NoopContext.prototype.fail = function (relPath, message, score) {
        return false;
    };
    NoopContext.prototype.unionResolver = function () { return this; };
    NoopContext.prototype.createContext = function () { return this; };
    NoopContext.prototype.resolveUnion = function (ur) { };
    return NoopContext;
}());
exports.NoopContext = NoopContext;
/**
 * Complete implementation of IContext that collects meaningfull errors.
 */
var DetailContext = /** @class */ (function () {
    function DetailContext() {
        // Stack of property names and associated messages for reporting helpful error messages.
        this._propNames = [""];
        this._messages = [null];
        // Score is used to choose the best union member whose DetailContext to use for reporting.
        // Higher score means better match (or rather less severe mismatch).
        this._score = 0;
    }
    DetailContext.prototype.fail = function (relPath, message, score) {
        this._propNames.push(relPath);
        this._messages.push(message);
        this._score += score;
        return false;
    };
    DetailContext.prototype.unionResolver = function () {
        return new DetailUnionResolver();
    };
    DetailContext.prototype.resolveUnion = function (unionResolver) {
        var _a, _b;
        var u = unionResolver;
        var best = null;
        for (var _i = 0, _c = u.contexts; _i < _c.length; _i++) {
            var ctx = _c[_i];
            if (!best || ctx._score >= best._score) {
                best = ctx;
            }
        }
        if (best && best._score > 0) {
            (_a = this._propNames).push.apply(_a, best._propNames);
            (_b = this._messages).push.apply(_b, best._messages);
        }
    };
    DetailContext.prototype.getError = function (path) {
        var msgParts = [];
        for (var i = this._propNames.length - 1; i >= 0; i--) {
            var p = this._propNames[i];
            path += (typeof p === "number") ? "[" + p + "]" : (p ? "." + p : "");
            var m = this._messages[i];
            if (m) {
                msgParts.push(path + " " + m);
            }
        }
        return new VError(path, msgParts.join("; "));
    };
    DetailContext.prototype.getErrorDetail = function (path) {
        var details = [];
        for (var i = this._propNames.length - 1; i >= 0; i--) {
            var p = this._propNames[i];
            path += (typeof p === "number") ? "[" + p + "]" : (p ? "." + p : "");
            var message = this._messages[i];
            if (message) {
                details.push({ path: path, message: message });
            }
        }
        var detail = null;
        for (var i = details.length - 1; i >= 0; i--) {
            if (detail) {
                details[i].nested = [detail];
            }
            detail = details[i];
        }
        return detail;
    };
    return DetailContext;
}());
exports.DetailContext = DetailContext;
var DetailUnionResolver = /** @class */ (function () {
    function DetailUnionResolver() {
        this.contexts = [];
    }
    DetailUnionResolver.prototype.createContext = function () {
        var ctx = new DetailContext();
        this.contexts.push(ctx);
        return ctx;
    };
    return DetailUnionResolver;
}());


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./build/app/worker.js ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const grain_rpc_1 = __webpack_require__(/*! grain-rpc */ "./node_modules/grain-rpc/dist/lib/index.js");
const rpc = new grain_rpc_1.Rpc({ logger: {}, sendMessage: postMessage });
onmessage = (ev) => rpc.receiveMessage(ev.data);
const bank = rpc.getStub('bank');
rpc.registerFunc('runUserCode', async (code) => {
    const userFunc = Function('transfer', 'getBalance', `return async function() { ${code} }`)(bank.transfer, bank.getBalance);
    await userFunc();
});

})();

/******/ })()
;
//# sourceMappingURL=worker.js.map