import { Component } from "react";
import SettingCard from "./SettingCard";
import sendIcon from "../../image/send.png";

class SettingMA extends Component {
    constructor(props) {
        super(props);
        this.changeSettingCard = this.changeSettingCard.bind(this);
    }

    changeSettingCard() {
        this.props.changeSettingCard(1);
    }

    render() {
        return (
            <>
                <SettingCard title="配信設定" icon={sendIcon} description="配信を行うメールアドレスや、LINE@などの設定を行います。" changeSettingCard={this.changeSettingCard} />
            </>
        );
    }
}

export default SettingMA;