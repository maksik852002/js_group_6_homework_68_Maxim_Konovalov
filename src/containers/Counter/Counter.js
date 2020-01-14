import React, { Component, Fragment } from "react";
import "./Counter.css";
import { connect } from "react-redux";
import { fetchCounter, postCounter, closeModal } from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";

class Counter extends Component {
  componentDidMount() {
    this.props.fetchCounter();
  }

  render() {
    const {
      counter,
      postCounter,
      loading,
      closeModal,
      show,
      error
    } = this.props;
    return (
      <Fragment>
        <Modal show={show} close={closeModal}>
          {error}
        </Modal>
        <div className="Counter">
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1>{counter}</h1>
              <button onClick={() => postCounter(counter + 1)}>Increase</button>
              <button onClick={() => postCounter(counter - 1)}>Decrease</button>
              <button onClick={() => postCounter(counter + 5)}>
                Increase by 5
              </button>
              <button onClick={() => postCounter(counter - 5)}>
                Decrease by 5
              </button>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
    loading: state.loading,
    error: state.error,
    show: state.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCounter: () => dispatch(fetchCounter()),
    postCounter: counter => dispatch(postCounter(counter)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);