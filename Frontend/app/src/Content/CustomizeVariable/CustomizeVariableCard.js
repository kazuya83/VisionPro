import { Component } from "react";
import stringIcon from "../../image/string.png";
import numberIcon from "../../image/number.png";
import calendarIcon from "../../image/calendar.png";
import masterDataIcon from "../../image/master.png";
import eggIcon from '../../image/egg.png';
import CommonFunc from "../../common/CommonFunc";

class CustomizeVariableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            masterDataList: []
        }

        this.convertDataTypeJp = this.convertDataTypeJp.bind(this);
        this.getMasterDataList = this.getMasterDataList.bind(this);
        this.convertMasterIdToMasterName = this.convertMasterIdToMasterName.bind(this);
    }

    componentDidMount() {
        this.getMasterDataList();
    }

    async getMasterDataList() {
        const res = await CommonFunc.PostData('get_master_list', CommonFunc.GetCommonRequestParam());
        this.setState({
            masterDataList: res.data
        });
        console.log(this.state.masterDataList);
    }

    convertDataTypeJp(typeId) {
        switch (typeId) {
            case 1:
                return "文字型";
            case 2:
                return "数値型";
            case 3:
                return "日付型";
            case 4:
                return "マスタデータ";
            default:
                return "";
        }
    }

    converDataTypeIcon(typeId) {
        switch (typeId) {
            case 1:
                return stringIcon;
            case 2:
                return numberIcon;
            case 3:
                return calendarIcon;
            case 4:
                return masterDataIcon;
            default:
                return eggIcon;
        }
    }

    convertMasterIdToMasterName(masterId) {
        const targetMasterData = this.state.masterDataList.find(masterData => masterData.master_id === masterId);
        if (!targetMasterData) { return ''; }
        return targetMasterData.master_name;
    }

    render() {
        console.log(this.props.attribute.attribute_description);
        return (
            <div className="customize-variable-card">
                <div className="customize-variable-card-no">
                    <div>No.{this.props.attribute.attribute_id}</div>
                </div>

                <div>
                    <label>属性名：</label>
                    <label>{this.props.attribute.attribute_name}</label>
                </div>

                <br/>

                <div>
                    <label>説明：</label>
                    <label>{this.props.attribute.attribute_description}</label>
                </div>

                <br/>

                <div>
                    <label>データ型：</label>
                    <label>{this.convertDataTypeJp(this.props.attribute.attribute_data_type)}</label>
                </div>

                <br/>

                <div style={{'display': (this.props.attribute.attribute_data_type === 4 ? 'display' : 'none')}}>
                    <label>マスタデータ：</label>
                    <label>{this.convertMasterIdToMasterName(this.props.attribute.master_id)}</label>
                </div>

                <div className="customize-variable-card-icon">
                    <img src={this.converDataTypeIcon(this.props.attribute.attribute_data_type)} />
                </div>
            </div>
        );
    }
}

export default CustomizeVariableCard;