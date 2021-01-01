export function isArrayOrString(args) {
  // Check 1: args should be string or Array
  return Array.isArray(args) || typeof args === "string";
}

export function isArrayOrFunction(args) {
  // Check 1: args should be string or Array
  return (
    (Array.isArray(args) && isArrayOfFunctions(args)) ||
    typeof args === "function"
  );
}

function isArrayOfFunctions(args) {
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== "function") return false;
  }
  return true;
}
