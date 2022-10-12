import { Component } from "react";
import Input from "../../../component/input";
import './AddMaster.css';

class AddMaster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            description: props.description,
        }

        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
    }

    changeName(value) {
        this.state.name = value;
        this.props.changeAddMasterValue(value, this.state.description);
    }

    changeDescription(value) {
        this.state.description = value;
        this.props.changeAddMasterValue(this.state.name, value);
    }

    render() {
        return (
            <div className="add-master-container">
                <div>
                    <Input inputValue={this.state.name} placeholder="マスタ名" changeInput={this.changeName} />
                </div>

                <div>
                    <Input inputValue={this.state.description} placeholder="説明" changeInput={this.changeDescription} />
                </div>
            </div>
        );
    }
}

export default AddMaster;