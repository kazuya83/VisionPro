import { Component } from "react";
import './modal.css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.slotComponent = this.props.component;

        this.modalClose = this.modalClose.bind(this);
    }

    modalClose() {
        this.props.switchShowModal();
    }

    render() {
        return (
            <div className={"modal-container " + (this.props.isShow ? "" : "modal-container_hidden") }>
                <div className="modal-cover" onClick={this.modalClose}></div>
                <div className="modal-warapper">
                    <div className="modal-header">
                        {this.props.title}
                    </div>
                    <div className="modal-content">
                        {this.props.slotComponent}
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.modalClose} className="btn-warning">閉じる</button>
                        {this.props.updateBtn}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Modal;