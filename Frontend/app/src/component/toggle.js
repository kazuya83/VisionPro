import { Component } from "react";
import './toggle.css';

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.selectedToggle = this.selectedToggle.bind(this);
    }

    selectedToggle(id) {
        this.props.changeToggleId(id);
    }

    render() {
        return (
            <div className="toggle-container">
                {this.props.toggleList.map((toggle) => {
                    const selectedClassName = toggle.id === Number(this.props.selectedToggleId) ? "toggle_selected" : "";
                    return (
                        <div className={"toggle " + selectedClassName}key={toggle.id} onClick={() => {this.selectedToggle(toggle.id);}}>{toggle.toggleName}</div>
                    )
                })}
            </div>
        );
    }
}
export default Toggle;