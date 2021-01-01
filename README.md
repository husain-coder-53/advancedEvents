# Advanced Events
Events library with host of features to not only listen or emit events, but manage callbacks which are registered.

## Features
* Register to one or more placement id(s) using string or an array.
* Add / modify / remove callbacks dynamically. 
* Pause and release events.
* If event is paused, you can collect callbacks, and fire them, when you release event.
* You can purge pending callbacks, or remove all callbacks.  

## Methods
* on()
* off()
* once()
* emit()

## Event Methods
* callbacks(): Add callbacks which need to be fired, when events are fired
* removeDuplicates()
* removeNamedCallbacks()
* pause()
* resume()
* purgePendingEventCallbacks()
* purgeCallbacks()

## Properties
* paused
* numberOfCallbacksRegistered
* anyDuplicateFunction

## Roadmap
* Finalize the module, with corrections to naming conventions, and proper comments.
* Update test files.
* Create test suite.

## Usage
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