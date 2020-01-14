import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getToDo,
  changeInputValue,
  addTask,
  checkTask,
  removeTask,
  closeModal
} from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import InputGroup from "../../components/InputGroup/InputGroup";
import Task from "../../components/Task/Task";

class ToDoList extends Component {
  componentDidMount() {
    this.props.getToDo();
  }

  render = () => {
    const {
      tasks,
      changeInputValue,
      inputValue,
      loading,
      addTask,
      checkTask,
      removeTask,
      error,
      show,
      closeModal
    } = this.props;
    return (
      <Fragment>
        <Modal show={show} close={closeModal}>
          {error}
        </Modal>
        <div className="container">
          <InputGroup
            value={inputValue}
            add={e => addTask(e, inputValue)}
            change={changeInputValue}
          />
          <div className="border border-secondary rounded p-2">
            <h1 className="text-center">TO DO</h1>
            {loading ? (
              <Spinner />
            ) : (
              tasks !== null &&
              Object.keys(tasks).map(id => (
                <Task
                  key={id}
                  task={tasks[id]}
                  remove={() => removeTask(id)}
                  check={() => checkTask(id, tasks)}
                />
              ))
            )}
          </div>
        </div>
      </Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    inputValue: state.inputValue,
    loading: state.loading,
    error: state.error,
    show: state.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToDo: () => dispatch(getToDo()),
    changeInputValue: e => dispatch(changeInputValue(e)),
    addTask: (e, string) => dispatch(addTask(e, string)),
    checkTask: (id, tasks) => dispatch(checkTask(id, tasks)),
    removeTask: id => dispatch(removeTask(id)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);