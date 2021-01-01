import ENUM from "../enum";
import State from "../StateContainer";

export function removeDuplicateFunctions(arrayofFunctions, forceRemoveDuplicateFunctions) {
  const config = State.get(ENUM.CONFIG);
  if (forceRemoveDuplicateFunctions !== true && config.overWriteNamedFunctions !== true) return arrayofFunctions;
  let updatedArrayOfFunctions = [];
  let tempArrayOfFunctionNames = [];
  for (let i = 0; i < arrayofFunctions.length; i++) {
    const callback = arrayofFunctions[i];
    const arrayIndex = tempArrayOfFunctionNames.indexOf(callback.name);
    if (callback.name.length > 0 && arrayIndex === -1) {
      tempArrayOfFunctionNames.push(callback.name);
      updatedArrayOfFunctions.push(callback);
    } else {
      updatedArrayOfFunctions.splice(arrayIndex, 1, callback);
    }
  }
  return updatedArrayOfFunctions;
}