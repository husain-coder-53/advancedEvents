#Advanced Events
Events library with host of features to not only listen or emit events, but manage callbacks which are registered.

##Features
[x] Register to one or more placement id(s) using string or an array.
[x] Add / modify / remove callbacks dynamically. 
[x] Pause and release events.
[x] If event is paused, you can collect callbacks, and fire them, when you release event.
[x] You can purge pending callbacks, or remove all callbacks.  

##Methods
[x] on()
[x] off()
[x] once()
[x] emit()

##Event Methods
[x] callbacks(): Add callbacks which need to be fired, when events are fired
[x] removeDuplicates()
[x] removeNamedCallbacks()
[x] pause()
[x] resume()
[x] purgePendingEventCallbacks()
[x] purgeCallbacks()

##Properties
[x] paused
[x] numberOfCallbacksRegistered
[x] anyDuplicateFunction

##Roadmap
[x] Finalize the module, with corrections to naming conventions, and proper comments.
[x] Update test files.
[x] Create test suite.

##Usage
````
// Create new instance with config
var advancedEvents = new AdvancedEvents({
    overWriteNamedFunctions: true, //Default: false
    maxCallbacksAllowed: 5, //Default: -1(Any amount)
    // canHoldEvents: false, //Default: true
});

// Event Methods
    var fooEvent = advancedEvents.on(["fooEvent", "something"]);

fooEvent
  .callbacks([
    successFunction1,
    function successFunction2() {
      console.log("Success 2.1");
    },
    function successFunction2() {
      console.log("Success 2.2");
    },
  ])
  .removeDuplicates() //Only useful to remove duplicate Named functions
  .removeNamedCallbacks(["successFunction2"])
  .pauseEvent({ saveEmittedEvent: true })
  .releaseEvent()
  .purgePendingEventCallbacks()
  .purgeCallbacks();

// Emit
advancedEvents.emit(["fooEvent"], {
  something: "Got it",
});
````