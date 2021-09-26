import { getTransfersByFromCityId, getTransfers, uploadTransfer } from "../../services/data-service";
import { getCityById } from "../../utils/cities";
import { SET_FILTERS } from "./filtersActions";

export const SET_ADD_NEW_TRANSFER = 'set-add-new-transfer';
export const SET_TRANSFERS = 'set-received-transfers';

export function applyFilterFromCityIdAction(fromCityId) {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            const filteredCities = await getTransfersByFromCityId(fromCityId);
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers: filteredCities } });
            console.log(filteredCities);
        } catch (e) {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true } });
        };
    };
}

export function receiveTransfersAction() {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
            const transfers = await getTransfers();
            const filters = Array.from(new Set(transfers.map(t => t.from)));
            dispatch({ type: SET_FILTERS, payload: filters });
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: true, transfers } });
        } catch (e) {
            dispatch({ type: SET_TRANSFERS, payload: { isReceived: false } });
        };
    };
}

export function saveNewTransferAction(transfer) {
    return async (dispatch) => {
        try {
            const uploaded = await uploadTransfer(transfer);
            dispatch({ type: SET_ADD_NEW_TRANSFER, payload: uploaded });
        } catch (e) {
            dispatch({ type: SET_ADD_NEW_TRANSFER, payload: false });
        };
    };
}