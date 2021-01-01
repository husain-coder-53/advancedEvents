import ENUM from "../enum";
import State from "../StateContainer";

export default function _resumeEvent(options) {
  // Set "pause" flag to false
  // Set "saveEmittedEvent" flag to false
  const placementIdList = State.get(ENUM.IDENTIFIER_LIST);
  for (let i = 0; i < this[ENUM.IDENTIFIERS].length; i++) {
    const id = this[ENUM.IDENTIFIERS][i];
    if (!placementIdList.hasOwnProperty(id)) continue;
    placementIdList[id].pause = false;
    placementIdList[id].saveEmittedEvent = false;
    fireAllSavedCallbacks(placementIdList[id].savedCallbacks);
    placementIdList[id].savedCallbacks = [];
  }
  State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
}

function fireAllSavedCallbacks(callbacks) {
  for (let i = 0; i < callbacks.length; i++) {
    const item = callbacks[i];
    item.callback(item.eventName, item.payload);
  }
}
