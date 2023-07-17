import { combineReducers } from 'redux';
// import { adminTokenReducer } from './AdminReducer';
// import { statusReducer } from './MenuReducer';
import { tokenReducer} from './userReducer';
// import { carouselReducer } from './CarouselReducer'
// import { modalReducer } from './VideoModalReducer'
// import { globalNotificationReducer } from './globalNotificationReducer'


export default combineReducers({
    // userReducer,
    tokenReducer,
    // adminTokenReducer,
    // statusReducer,
    // carouselReducer,
    // modalReducer,
    // globalNotificationReducer
});