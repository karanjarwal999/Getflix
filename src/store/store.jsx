import { applyMiddleware, legacy_createStore } from "redux";
import { Recducer} from "./StoreReducer";
import thunk from "redux-thunk";

export  const store = legacy_createStore(Recducer,applyMiddleware(thunk))