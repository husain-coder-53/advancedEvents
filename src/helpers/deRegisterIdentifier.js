import State from "../StateContainer";
import ENUM from "../enum";
import { isArrayOrString } from "./validations";

export function deRegisterPlacementId(placementIds) {
    try {
        // Check 1: PlacementIds should be string or Array
        if (!isArrayOrString(placementIds)) {
          throw new TypeError("ID(s) entered might not be correct.");
        }
        const placementIdsArray = [].concat(placementIds);
        const placementIdList = State.get(ENUM.IDENTIFIER_LIST);
        for(const placementId in placementIdList ){
            if( placementIdsArray.indexOf(placementId) > -1 ) delete placementIdList[placementId];
        }
        console.log("After Deleted", State.get(ENUM.IDENTIFIER_LIST));
    }catch(err){
        console.warn("Cannot remove events for said placementIds!", err);
    }
}