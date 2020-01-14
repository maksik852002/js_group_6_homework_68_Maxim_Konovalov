import {
  FETCH_COUNTER_SUCCESS,
  FETCH_TODO_SUCCESS,
  CHANGE_INPUT_VALUE,
  FETCH_ERROR,
  FETCH_REQUEST,
  CLOSE_MODAL
} from "./actions";

const initialState = {
  counter: 0,
  tasks: {},
  inputValue: "",
  loading: false,
  error: "",
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: !state.loading };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        loading: !state.loading,
        show: !state.show
      };
    case CLOSE_MODAL:
      return { ...state, show: false, loading: false };
    case FETCH_COUNTER_SUCCESS:
      return action.counter !== null
        ? { ...state, counter: action.counter, loading: false }
        : { ...state, loading: false };
    case CHANGE_INPUT_VALUE:
      return { ...state, inputValue: action.value };
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        loading: !state.loading,
        inputValue: ""
      };
    default:
      return state;
  }
};

export default reducer;