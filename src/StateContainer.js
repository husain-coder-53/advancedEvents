/**This Class has been exported as a single instance to be used in all of the module
 * Its stores all necessary information regarding the module, and acts as a storage container for the module
 * It exposes a "set" and a "get" method to set or get values.
 */
import ENUM from "./enum";

class StateContainer {
  constructor() {
    this.state = {
      [ENUM.CONFIG]: {
        overWriteNamedFunctions: false,
        maxCallbacksAllowed: -1,
        canHoldEvents: true,
      },
      [ENUM.IDENTIFIER_LIST]: {}
    };
  }

  get(stateName) {
    /**Retrives value from the "storage" Object
     * stateName: {String}
      */
    try {
      if (typeof stateName === "string") {
        return this.state[stateName];
      } else {
        return this.state;
      }
    } catch (err) {}
  }

  set(newState) {
    /**Sets values in the storage
     * newState: {Object}
     */
    try {
      this.state = { ...this.state, ...newState };
      return true;
    } catch (err) {
      return false;
    }
  }
}

const State = new StateContainer();
export default State;
