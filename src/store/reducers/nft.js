import { NFT_ACTION_TYPES } from 'store/actions/nft';
import { SORT_OPTIONS } from 'constants/config';

const initialState = {
    item: false,
    results: [],
    searchParams: null,
    loading: false,
    sortOrder: SORT_OPTIONS.NEW_TO_OLD
};

const NFTReducer = (state = initialState, action) => {
    switch (action.type) {
        case NFT_ACTION_TYPES.LOAD_NFT: {
            return {
                ...state,
                loading: true
            };
        }
        case NFT_ACTION_TYPES.NFT_LOADED: {
            return {
                ...state,
                loading: false,
                item: action.payload
            };
        }

        case NFT_ACTION_TYPES.LOAD_SEARCH: {
            return {
                ...state,
                loading: true,
                searchParams: action.payload
            };
        }
        case NFT_ACTION_TYPES.SEARCH_LOADED: {
            return {
                ...state,
                loading: false,
                results: action.payload
            };
        }
        case NFT_ACTION_TYPES.SEARCH_FAILED: {
            return {
                ...state,
                loading: false
            };
        }
        case NFT_ACTION_TYPES.UPDATE_SORT_ORDER: {
            return {
                ...state,
                ...action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default NFTReducer;
