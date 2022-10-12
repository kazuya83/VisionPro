import { Component } from "react";
import Input from "../../component/input";
import stringIcon from "../../image/string.png";
import numberIcon from "../../image/number.png";
import calendarIcon from "../../image/calendar.png";
import masterDataIcon from "../../image/master.png";
import CommonFunc from "../../common/CommonFunc";
import Const from "../../common/Const";

class AddCustomizeVariableCard extends Component {
    constructor(props) {
        super(props);
        this.attributeTypeList = [
            { typeId: 1, typeName: '文字型', icon: stringIcon },
            { typeId: 2, typeName: '数値型', icon: numberIcon },
            { typeId: 3, typeName: '日付型', icon: calendarIcon },
            { typeId: 4, typeName: 'マスタデータ', icon: masterDataIcon },
        ];
        this.state = {
            attributeName: '',
            description: '',
            dataType: -1,
            isShowMasterDataList: false,
            masterId: 0,
            masterDataList: [],
        };

        this.changeAttributeName = this.changeAttributeName.bind(this);
        this.changeAttributeDescription = this.changeAttributeDescription.bind(this);
        this.changeAttributeDataType = this.changeAttributeDataType.bind(this);
        this.getMasterDataList = this.getMasterDataList.bind(this);
        this.changeMasterId = this.changeMasterId.bind(this);
    }

    componentDidMount() {
        this.getMasterDataList();
    }

    changeAttributeName(attributeName) {
        this.setState({ attributeName: attributeName });
    }

    changeAttributeDescription(description) {
        this.setState({ description: description });
    }

    changeAttributeDataType(typeId) {
        this.setState({ dataType: typeId });
        this.setState({ masterId: typeId === 4 && !this.state.isShowMasterDataList ? 1 : typeId === 4 ? this.state.masterId : 0 });
        this.setState({ isShowMasterDataList: typeId === 4 });
    }

    changeMasterId(e) {
        this.setState({ masterId: e.target.value });
    }

    async addAttribute() {
        if (!this.validation()) { return; }

        const retData = await CommonFunc.PostData('UpdateCustomerAttribute',{attribute_name: this.state.attributeName, attribute_description: this.state.description, attribute_data_type: this.state.dataType, master_id: this.state.masterId });
        if (retData.status_code !== Const.STATUS_CODE.SUCCESS) {
            return false;
        }
        this.setState({
            attributeName: '',
            description: '',
            dataType: -1,
            isShowMasterDataList: false
        });
        return true;
    }

    async getMasterDataList() {
        const retData = await CommonFunc.GetData('Master_List');
        this.setState({
            masterDataList: retData
        })
    }

    validation() {
        if (this.state.attributeName.trim().length === 0) { alert('属性名を入力してください');return false; }
        if (this.state.dataType < 0) { alert('データ型を選択してください');return false; }

        return true;
    }

    render() {
        return (
            <div>
                <div className="add-modal-row">
                    <Input inputValue={this.state.attributeName} placeholder="属性名" changeInput={this.changeAttributeName} />
                </div>

                <div className="add-modal-row">
                    <Input inputValue={this.state.description} placeholder="説明" changeInput={this.changeAttributeDescription} />
                </div>

                <div className="add-modal-header">データ型</div>
                <div className="add-modal-row attribute-type-card-list">
                    {this.attributeTypeList.map((attributeType) => {
                        const typeClass = "attribute-type-card";
                        const selectedTypeClass = attributeType.typeId === this.state.dataType ? ` ${typeClass}_selected` : ''; 
                        return (
                            <div key={attributeType.typeId} className={typeClass + selectedTypeClass} onClick={() => {this.changeAttributeDataType(attributeType.typeId);}}>
                                <div>
                                    <img src={attributeType.icon} />
                                </div>
                                <div className="attribute-type-card-label">
                                    {attributeType.typeName}
                                </div>
                            </div>
                        );
                    })}
                </div>


                <div className="add-modal-header" style={{'display': (this.state.isShowMasterDataList ? 'block' : 'none')}}>マスタデータ選択</div>
                <div className="add-modal-row master-data-select" style={{'display': (this.state.isShowMasterDataList ? 'block' : 'none')}}>
                    <select onChange={this.changeMasterId}>
                        {this.state.masterDataList.map(masterData => {
                            return(
                                <option id={masterData.master_id} value={masterData.master_id} key={masterData.master_id}>{masterData.master_name}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}

export default AddCustomizeVariableCard;