import { Component } from "react";
import React from "react";
import CustomizeVariableCard from "./CustomizeVariableCard";
import plusIcon from '../../image/plus.png';
import Modal from "../../component/modal";
import AddCustomizeVariableCard from "./AddCusomizeVariableCard";
import './CustomizeVariableCard.css';

class CustmoizeVariableCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShow: false,
            addBtnEnabled: true,
        };
        this.childRef = React.createRef();

        this.switchShowModal = this.switchShowModal.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
    }

    switchShowModal() {
        this.setState({
            isModalShow: !this.state.isModalShow
        });
    }
    
    async addAttribute() {
        this.setState({ addBtnEnabled: !this.state.addBtnEnabled });
        const isSuccess = await this.childRef.current.addAttribute();
        this.setState({ addBtnEnabled: !this.state.addBtnEnabled });
        if (!isSuccess) {
            return;
        }
        this.props.reRenderAttribute();
        this.setState({isModalShow: false});
    }

    render() {
        const addModalSlot = <AddCustomizeVariableCard ref={this.childRef} />;
        const addBtn = <button className="btn-primary" onClick={this.addAttribute} disabled={!this.state.addBtnEnabled}>追加</button>

        return (
            <div className="customize-variable-card-list">
                <div className="customize-variable-card add-card" onClick={this.switchShowModal}>
                    <img src={plusIcon}/>
                </div>
                <Modal isShow={this.state.isModalShow} switchShowModal={this.switchShowModal} title="新規属性追加" slotComponent={addModalSlot} updateBtn={addBtn} />
                {this.props.attributes.map((attribute) => {
                    return (
                        <CustomizeVariableCard key={attribute.attribute_id} attribute={attribute} />
                    );
                })}
            </div>
        );
    }
};
export default CustmoizeVariableCardList;