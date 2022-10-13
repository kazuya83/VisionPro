import { Component } from "react";
import SettingMA from "./Setting/SettingMA";
import './Setting.css';
import CommonFunc from "../common/CommonFunc";
import { RemoveFromQueue } from "@mui/icons-material";
import SettingMasterData from "./Setting/SettingMasterData";
import MASetting from "./Setting/SettingDetaili/MASetting";
import MasterSetting from "./Setting/SettingDetaili/MasterSetting";
import SettingCustomerCard from "./Setting/SettingCustomerCard";
import CustomerCardSetting from "./Setting/SettingDetaili/CustomerCardSetting";

class Setting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSettingId: 0,
            selectedSettingName: '',
        };

        this.changeSettingCard = this.changeSettingCard.bind(this);
    }

    changeSettingCard(settingId) {
        this.setState({
            selectedSettingId: settingId
        });
        let settingName = '';
        switch (settingId) {
            case 1:
                settingName = '配信設定';
                break;
            case 2:
                settingName = 'マスタデータ';
                break;
            case 3:
                settingName = '顧客属性表示';
                break;
        }
        this.setState({
            selectedSettingName: settingName
        });
    }

    render() {
        let slot;
        switch (this.state.selectedSettingId) {
            case 1:
                slot = <MASetting />
                break;
            case 2:
                slot = <MasterSetting />
                break;
            case 3:
                slot = <CustomerCardSetting/>
        }
        return (
            <div className="setting-content">
                <div className="setting-content-header">
                    <div className="setting-content-header-tab" onClick={() => { this.changeSettingCard(0) }} title="設定に戻る">設定</div>
                    <div className="setting-content-header-delimiter" style={{'display': (this.state.selectedSettingId === 0 ? 'none' : 'block')}}>＞</div>
                    <div className="setting-content-header-tab" style={{'display': (this.state.selectedSettingId === 0 ? 'none' : 'block')}}>{this.state.selectedSettingName}</div>
                </div>

                <div className="setting-content-body" style={{'display': (this.state.selectedSettingId === 0 ? 'flex' : 'none')}}>
                    <SettingCustomerCard changeSettingCard={this.changeSettingCard} />
                    <SettingMA changeSettingCard={this.changeSettingCard} />
                    <SettingMasterData changeSettingCard={this.changeSettingCard} />
                </div>

                <div className="setting-content-body">
                    {slot}
                </div>
            </div>
        );
    }
}

export default Setting;