import ENUM from "../enum";
import State from "../StateContainer";

export default function _pauseEvent(options) {
  const { saveEmittedEvent = false } = options || {};
  // Set "pause" flag to true
  // Set "saveEmittedEvent" flag also
  const placementIdList = State.get(ENUM.IDENTIFIER_LIST);
  for (let i = 0; i < this[ENUM.IDENTIFIERS].length; i++) {
    const id = this[ENUM.IDENTIFIERS][i];
    if (!placementIdList.hasOwnProperty(id)) continue;
    placementIdList[id].pause = true;
    placementIdList[id].saveEmittedEvent = saveEmittedEvent;
    if( !saveEmittedEvent ){
        placementIdList[id].savedCallbacks = [];
    }
  }
  State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
}
