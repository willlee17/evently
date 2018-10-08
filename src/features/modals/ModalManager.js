import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnauthModal from './UnauthModal';

// Every modal that we make, we put it in here. Modals sort of cover the entire app.
const modalLookUp = {
  TestModal,
  LoginModal,
  RegisterModal,
  UnauthModal,
}

const mapStateToProps = (state) => ({
  currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
  let renderedModal;

  if(currentModal) {
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookUp[modalType]

    renderedModal = <ModalComponent {...modalProps} />
  }
  return(
    <span>{renderedModal}</span>
  )
}

export default connect(mapStateToProps)(ModalManager);
