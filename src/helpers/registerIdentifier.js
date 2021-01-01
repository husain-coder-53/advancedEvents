import State from "../StateContainer";
import ENUM from "../enum";
import { isArrayOrString } from "./validations";

export function registerPlacementId(placementIds, expireAfterNumberOfTimes) {
  try {
    // Check 1: PlacementIds should be string or Array
    if (!isArrayOrString(placementIds)) {
      throw new TypeError("ID(s) entered might not be correct.");
    }
    // Check 2: "expireAfterNumberOfTimes" argument should a number
    if (
      (typeof expireAfterNumberOfTimes !== "undefined" &&
        !Number.isInteger(expireAfterNumberOfTimes)) ||
      expireAfterNumberOfTimes < -1
    ) {
      throw new TypeError("Second argument should be a Numer!");
    }
    // Check 3: If "expireAfterNumberOfTimes" is undefined, then assign "-1"(i.e., never to expire)
    expireAfterNumberOfTimes =
      typeof expireAfterNumberOfTimes === "undefined"
        ? -1
        : expireAfterNumberOfTimes;
    // Get current list
    const placementIdList = State.get(ENUM.IDENTIFIER_LIST);
    let tempPlacementIds = [].concat(placementIds).map((placementId) => {
      if (!placementIdList.hasOwnProperty(placementId)) {
        const updatedList = {
          ...State.get(ENUM.IDENTIFIER_LIST),
          ...{
            [placementId]: {
              expireAfterNumberOfTimes,
              callbacks: [],
              pause: false,
              saveEmittedEvent: false,
              savedCallbacks: [],
            },
          },
        };
        State.set({ [ENUM.IDENTIFIER_LIST]: updatedList });
      }
    });
  } catch (error) {
    throw new TypeError("Operation to update list failed!");
  }
}

if (!Number.hasOwnProperty("isInteger")) {
  Number.isInteger =
    Number.isInteger ||
    function (value) {
      return (
        typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value
      );
    };
}
