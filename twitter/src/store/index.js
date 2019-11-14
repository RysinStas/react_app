import {createStore} from "redux";
import reducer from "../reducer";

const store = createStore(reducer);

store.subscribe(()=>{
    localStorage.setItem('posts', JSON.stringify( store.getState().posts))
});


export default store;