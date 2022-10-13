import { Component } from "react";
import Modal from "../../component/modal";
import manIcon from '../../image/man.png';
import womanIcon from '../../image/woman.png';
import otherIcon from '../../image/other.png';
import './CustomerCard.css';

class CustomerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false
        };

        this.switchShowModal = this.switchShowModal.bind(this);
    }

    convertSexIdToSexName(sexId) {
        switch (Number(sexId)) {
            case 1:
                return "男";
            case 2:
                return "女性";
            case 3:
                return "不明";
        }
    }

    getSexIcon(sexId) {
        switch (Number(sexId)) {
            case 1:
                return manIcon;
            case 2:
                return womanIcon;
            default:
                return otherIcon;
        }
    }

    getSexClass(sexId) {
        switch (Number(sexId)) {
            case 1:
                return "man";
            case 2:
                return "woman";
            default:
                return "other";
        }
    }

    switchShowModal() {
        this.setState({
            isModalShow: !this.state.isModalShow
        });
    }

    render() {
        const customer = this.props.customerInfo;
        const leftContainerItems = [1,2];
        const rightContainerItems = [4,5,6,7,8];
        return(
            <div key={customer.customer_id} className="customer-card" onClick={this.switchShowModal}>
                <div className={"customer-id"}>ID : {customer.customer_id}</div>

                <div className="customer-info-container">
                    <div className="customer-info-container_left">
                        {leftContainerItems.map(item => {
                            return (
                                <div className="customer-common-item">{customer[item].name}: {customer[item].value}</div>
                            );
                        })}
                    </div>

                    <div className="customer-info-container_right">
                        {rightContainerItems.map(item => {
                            return (
                                <div className="customer-common-item">{customer[item].name}: {customer[item].value}</div>
                            );
                        })}
                    </div>
                </div>
                
                <div className={"customer-icon"}>
                    <img src={this.getSexIcon(customer.sex)} />
                    <div className="customer-name">{customer[3].value}</div>
                </div>

                <Modal isShow={this.state.isModalShow} switchShowModal={this.switchShowModal} title="顧客詳細" />
            </div>
        );
    }
}

export default CustomerCard;