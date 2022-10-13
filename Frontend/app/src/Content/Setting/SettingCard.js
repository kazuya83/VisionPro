import { Component } from "react";
import './SettingCard.css';

class SettingCard extends Component {
    constructor(props) {
        super(props);
        this.clickSettingCard = this.clickSettingCard.bind(this);
    }

    clickSettingCard() {
        this.props.changeSettingCard();
    }

    render() {
        return (
            <div className="setting-card" onClick={this.clickSettingCard}>
                <div className="setting-card-icon"><img src={this.props.icon} /></div>
                <div className="setting-card-title">{this.props.title}</div>
                <div className="setting-card-description">{this.props.description}</div>
            </div>
        );
    }
}

export default SettingCard;