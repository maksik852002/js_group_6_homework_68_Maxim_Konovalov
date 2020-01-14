import axios from "../axios-orders";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_ERROR = "FETCH_ERROR";
export const FETCH_COUNTER_SUCCESS = "FETCH_COUNTER_SUCCESS";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
export const CHECK_TASK = "CHECK_TASK";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};

export const fetchError = error => {
  return { type: FETCH_ERROR, error };
};

export const fetchCounterSuccess = counter => {
  return { type: FETCH_COUNTER_SUCCESS, counter };
};

export const fetchToDoSuccess = tasks => {
  return { type: FETCH_TODO_SUCCESS, tasks };
};

export const changeInputValue = e => {
  return { type: CHANGE_INPUT_VALUE, value: e.target.value };
};

export const fetchCounter = () => {
  return dispatch => {
    dispatch(fetchRequest());
    axios.get("/counter.json").then(
      response => {
        dispatch(fetchCounterSuccess(response.data));
      },
      error => {
        dispatch(fetchError(error.toString()));
      }
    );
  };
};

export const postCounter = counter => {
  return dispatch => {
    dispatch(fetchRequest());
    axios.patch("/.json", { counter }).then(
      response => {
        dispatch(fetchCounterSuccess(response.data.counter));
      },
      error => {
        dispatch(fetchError(error.toString()));
      }
    );
  };
};

export const getToDo = () => {
  return async dispatch => {
    try {
      dispatch(fetchRequest());
      const response = await axios.get("/tasks.json");
      dispatch(fetchToDoSuccess(response.data));
    } catch (error) {
      dispatch(fetchError(error.toString()));
    }
  };
};

export const addTask = (e, string) => {
  e.preventDefault();
  let name = {
    name: string,
    checked: false
  };
  return async dispatch => {
    try {
      await axios.post("/tasks.json", name);
      dispatch(getToDo());
    } catch (error) {
      dispatch(fetchError(error.toString()));
    }
  };
};

export const checkTask = (id, tasks) => {
  return async dispatch => {
    tasks[id] = { ...tasks[id], checked: !tasks[id].checked };
    let checked = tasks[id].checked;
    try {
      await axios.patch(`/tasks/${id}.json`, { checked: checked });
      dispatch(getToDo());
    } catch (error) {
      dispatch(fetchError(error.toString()));
    }
  };
};

export const removeTask = id => {
  return async dispatch => {
    try {
      await axios.delete(`/tasks/${id}.json`);
      dispatch(getToDo());
    } catch (error) {
      dispatch(fetchError(error.toString()));
    }
  };
};