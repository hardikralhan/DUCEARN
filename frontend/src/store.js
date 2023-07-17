import { createStore } from "redux";
import rootReducer from "./redux/reducer/rootReducer";

const store = createStore(rootReducer);

export default store;