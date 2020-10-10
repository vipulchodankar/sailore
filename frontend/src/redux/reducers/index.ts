import { combineReducers } from "redux";

import sailors from "./sailors";
import ui from "./ui";

const rootReducer = () => combineReducers({ ui, sailors });

export default rootReducer;
