import { Component } from "react";
import './toggleButton.css';

class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.onChangeToggleButton = this.onChangeToggleButton.bind(this);
    }

    onChangeToggleButton() {
        this.props.onChangeToggleButton(!this.props.checked);
    }

    render() {
        const checkedClassName = this.props.checked ? "toggle-button-checked" : "";
        const checkedBallClassName = this.props.checked ? "toggle-button-ball-checked" : "toggle-button-ball-not-checked";
        return (
            <div className="toggle-button-container">
                <div className="toggle-button-label">{this.props.label}</div>
                <div className={"toggle-button " + checkedClassName} onClick={this.onChangeToggleButton}>
                    <div className={"toggle-button-ball " + checkedBallClassName}></div>
                </div>
            </div>
        );
    }
}

export default ToggleButton;