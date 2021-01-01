import CallbackManagement from './callbacks/callbacks';
import {setConfig, registerPlacementId, deRegisterPlacementId, fireAllCallbacksToRegisteredPlacementIds} from './helpers/index';

export default class AdvancedEvents{
    constructor(config){
        setConfig(config);
    }

    on(placementIds, numberOfTimes){
        registerPlacementId(placementIds, numberOfTimes);
        return new CallbackManagement(placementIds);
    }

    off(placementIds){
        deRegisterPlacementId(placementIds);
    }

    once(placementIds){
        registerPlacementId(placementIds, -1);
        return new CallbackManagement(placementIds);
    }

    emit(placementIds, payload){
        fireAllCallbacksToRegisteredPlacementIds(placementIds, payload);
    }
}