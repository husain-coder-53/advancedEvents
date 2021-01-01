import { isArrayOrString } from "./validations";

export function removeFunction(arrayofFunctions, functionNames) {
  if (!isArrayOrString(functionNames)) return;
  const arrayOfFunctionNames = [].concat(functionNames);
  let updatedArrayOfFunctions = [].concat(arrayofFunctions);
  for (let i = updatedArrayOfFunctions.length-1; i >= 0; i--) {
    const callback = updatedArrayOfFunctions[i];
    if (arrayOfFunctionNames.indexOf(callback.name) > -1) {
      updatedArrayOfFunctions.splice(i, 1);
    }
  }
  return updatedArrayOfFunctions;
}
