import { Component } from "react";
import Input from "../../../component/input";
import './AddMaster.css';

class AddMasterData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(value) {
        this.props.changeAddMasterDataValue(value);
    }

    render() {
        return (
            <div className="add-master-container">
                <div>
                    <Input inputValue={this.state.value} placeholder="マスタ値" changeInput={this.changeValue} />
                </div>
            </div>
        );
    }
}

export default AddMasterData;