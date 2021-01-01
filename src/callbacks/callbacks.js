import ENUM from "../enum";
import {
  isArrayOrString,
  isArrayOrFunction,
  removeDuplicateFunctions,
  removeFunction,
} from "../helpers/index";
import State from "../StateContainer";

import _pauseEvent from "./pauseEvent";
import _resumeEvent from "./resumeEvents";
import _purgePendingEventCallbacks from "./purgePendingEventCallbacks";
import _purgeCallbacks from "./purgeCallbacks";

export default class CallbackManagement {
  constructor(id) {
    // Check if id(s) are of valid "type", and add them to list
    if (isArrayOrString(id)) {
      this[ENUM.IDENTIFIERS] = [].concat(id);
    }
  }

  callbacks(functions) {
    // Check if argument provided is function or array of functions
    if (!isArrayOrFunction(functions)) return;
    let placementIdList = State.get(ENUM.IDENTIFIER_LIST);
    // Collect functions
    let arrayofFunctions = [];
    if (typeof functions === "function") {
      // If only single "function" is provided as argument, then push in the array
      arrayofFunctions.push(functions);
    } else {
      arrayofFunctions = arrayofFunctions.concat(functions);
    }
    for (const placementId in placementIdList) {
      if (this[ENUM.IDENTIFIERS].indexOf(placementId) === -1) continue;
      const updatedCallbacksList = placementIdList[placementId].callbacks.concat(
        arrayofFunctions
      );
      placementIdList[placementId].callbacks = removeDuplicateFunctions(
        updatedCallbacksList
      );
    }

    State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
    return this;
  }

  removeDuplicates() {
    if (this[ENUM.IDENTIFIERS].length === 0) return;
    let placementIdList = State.get(ENUM.IDENTIFIER_LIST);
    for (const placementId in placementIdList) {
      if (this[ENUM.IDENTIFIERS].indexOf(placementId) === -1) continue;
      const updatedCallbacksList = placementIdList[placementId].callbacks;
      placementIdList[placementId].callbacks = removeDuplicateFunctions(
        updatedCallbacksList,
        true
      );
    }
    State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
    return this;
  }

  removeNamedCallbacks(functionNames) {
    if (!isArrayOrString(functionNames)) return;
    let placementIdList = State.get(ENUM.IDENTIFIER_LIST);
    functionNames = [].concat(functionNames);
    for (const placementId in placementIdList) {
      if (this[ENUM.IDENTIFIERS].indexOf(placementId) === -1) continue;
      const updatedCallbacksList = placementIdList[placementId].callbacks;
      placementIdList[placementId].callbacks = removeFunction(
        updatedCallbacksList,
        functionNames
      );
    }
    State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
    return this;
  }
  
  pauseEvent(options) {
    _pauseEvent.call(this, options);
    return this;
  }
  resumeEvent() {
    _resumeEvent.call(this);
    return this;
  }
  purgePendingEventCallbacks() {
    _purgePendingEventCallbacks.call(this);
    return this;
  }
  purgeCallbacks(placementIds) {
    _purgeCallbacks.call(this);
    return this;
  }
}
