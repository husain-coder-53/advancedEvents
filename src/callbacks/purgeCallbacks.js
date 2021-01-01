import ENUM from "../enum";
import State from "../StateContainer";

export default function _purgeCallbacks() {
  const placementIdList = State.get(ENUM.IDENTIFIER_LIST);
  for (let i = 0; i < this[ENUM.IDENTIFIERS].length; i++) {
    const id = this[ENUM.IDENTIFIERS][i];
    if (!placementIdList.hasOwnProperty(id)) continue;
    placementIdList[id].callbacks = [];
  }
  State.set({ [ENUM.IDENTIFIER_LIST]: placementIdList });
}