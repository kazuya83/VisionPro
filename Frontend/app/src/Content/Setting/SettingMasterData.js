import { Component } from "react";
import masterDataIcon from "../../image/master.png";
import SettingCard from "./SettingCard";

class SettingMasterData extends Component {
    constructor(props) {
        super(props);

        this.changeSettingCard = this.changeSettingCard.bind(this);
    }

    changeSettingCard() {
        this.props.changeSettingCard(2);
    }

    render() {
        return (
            <>
                <SettingCard title="マスタデータ編集" icon={masterDataIcon} description="性別や都道府県など、選択形式にしたいデータをマスタデータとして保存できます。" changeSettingCard={this.changeSettingCard} />
            </>
        );
    }
}

export default SettingMasterData;