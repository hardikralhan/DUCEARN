const initialState = {
    walletAmount: 0,
    referralId: '',
    autoTopupEnabled: false,
    rank: 1,
    profileImage: '',
    doj:''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS_DOJ':
            return {
                ...state,
                doj: action.payload
            }
        case 'SET_REFERRAL_ID':
            return {
                ...state,
                referralId: action.payload,
            };

        case 'SET_WALLET_AMOUNT':
            return {
                ...state,
                walletAmount: action.payload,
            };

        case 'SET_AUTO_TOPUP':
            return {
                ...state,
                autoTopupEnabled: action.payload,
            };

        case 'TOGGLE_AUTO_TOPUP':
            return {
                ...state,
                autoTopupEnabled: !state.autoTopupEnabled,
            };

        case 'SET_RANK':
            return {
                ...state,
                rank: action.payload,
            };

        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                profileImage: action.payload,
            };
        case 'SET_TOTAL_INCOME_THROUGH_LEVEL':
            return {
                ...state,
                profileImage: action.payload,
            };
        case 'SET_TOTAL_INCOME_THROUGH_OWN_REFERRAL':
            return {
                ...state,
                profileImage: action.payload,
            };

        default:
            return state;
    }
};


let tokenIntitialState = {
    token: null,
}

export const tokenReducer = (state = tokenIntitialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'CLEAR_TOKEN':
            return {
                ...state,
                token: null,
            };

        default:
            return state;
    }
}