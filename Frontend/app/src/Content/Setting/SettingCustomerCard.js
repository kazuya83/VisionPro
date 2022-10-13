import { Component } from "react";
import SettingCard from "./SettingCard";
import CustomerIcon from "../../image/people.png";

class SettingCustomerCard extends Component {
    constructor(props) {
        super(props);
        
        this.changeSettingCard = this.changeSettingCard.bind(this);
    }

    changeSettingCard() {
        this.props.changeSettingCard(3);
    }

    render() {
        return (
            <>
                <SettingCard title="顧客属性表示" icon={CustomerIcon} description="顧客一覧で表示する属性のレイアウトを設定できます。" changeSettingCard={this.changeSettingCard} />
            </>
        );
    }
}

export default SettingCustomerCard;