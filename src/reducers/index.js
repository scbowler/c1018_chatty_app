import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import chatReducer from './chat_reducer';

export default combineReducers({
    chat: chatReducer,
    form: formReducer
});
