import ENUM from "../enum";
import State from "../StateContainer";
export function setConfig(config) {
  const alreadySetValues = State.get(ENUM.CONFIG);
  State.set({ [ENUM.CONFIG]: { ...alreadySetValues, ...sanitize(config) } });
}

function sanitize(config) {
  try {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      return {};
    }
    return {
      ...getConfigValues("overWriteNamedFunctions", config),
      ...getConfigValues("maxCallbacksAllowed", config),
      ...getConfigValues("canHoldEvents", config),
    };
  } catch (err) {
    return {};
  }
}

function getConfigValues(_name, config) {
  return config.hasOwnProperty(_name) && { [_name]: config[_name] };
}
