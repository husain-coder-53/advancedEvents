import ENUM from "../enum";
import State from "../StateContainer";
import { isArrayOrString } from "./validations";

export function fireAllCallbacksToRegisteredPlacementIds(
  placementIds,
  payload
) {
  // Check 1: PlacementIds should be string or Array
  if (!isArrayOrString(placementIds)) {
    throw new TypeError("ID(s) entered might not be correct.");
  }
  const placementIdsList = State.get(ENUM.IDENTIFIER_LIST);
  [].concat(placementIds).map((placementId) => {
    if (!placementIdsList.hasOwnProperty(placementId)) return true;
    const isEventPaused = placementIdsList[placementId].pause;
    const shouldWeSaveCallbacks =
      placementIdsList[placementId].saveEmittedEvent;
    if (isEventPaused === true && shouldWeSaveCallbacks === true) {
      const callbacks = placementIdsList[placementId].callbacks;
      placementIdsList[placementId].savedCallbacks = placementIdsList[placementId].savedCallbacks.concat(
        saveAllCallbacks(callbacks, placementId, payload)
      );
    } else {
      fireAllCallbacks(placementIdsList[placementId].callbacks, placementId, payload);
    }
  });
}

function fireAllCallbacks(callbacks, eventName, payload) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](eventName, payload);
  }
}

function saveAllCallbacks(callbacks, eventName, payload) {
  let tempArray = [];
  for (let i = 0; i < callbacks.length; i++) {
    const callback = callbacks[i];
    tempArray.push({ callback, eventName, payload });
  }
  return tempArray;
}
