import { combineReducers } from "redux-immutable";

import game from "./game";

const reducer = (state, action) => ({ ...state });

export default combineReducers({ reducer, game });
