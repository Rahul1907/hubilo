import { createStore } from 'redux'
import rootReducer from './components/reducers/rootreducers'

const store = createStore(rootReducer);

export default store