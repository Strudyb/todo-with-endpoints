import React from "react";

function Modal({ closeModal, modalData, inputHandler, checkboxHandler, updateData }) {

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">{modalData.title}</div>
        <div className="modal__body">
          <div className="modal__group">
            <label>Enter The New Title</label>
            <input
              type="text"
              onChange={(e) => inputHandler(e.target.value)}
            />
          </div>
          <div className="modal__group flex-row">
            <label htmlFor="">
              Set Status {modalData.completed ? "In Progress" : "Completed"}
            </label>
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) => checkboxHandler(e.target.checked)}
            />
          </div>
        </div>
        <div className="modal_foter">
          <button onClick={closeModal} className="btn btn-delete">
            Close
          </button>
          <button className="btn btn-edit" onClick={() => updateData(modalData.id)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
