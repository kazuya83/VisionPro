import { Component } from "react";
import CommonFunc from "../../../common/CommonFunc";
import Modal from "../../../component/modal";
import AddMaster from "./AddMaster";
import AddMasterData from "./AddMasterData";
import './MasterSetting.css';

class MasterSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            masterList: [],
            selectedMasterId: 0,
            masterDataList: [],
            isShowModal: false,
            isShowMasterDataModal: false,
            addMasterName: '',
            addMasterDescription: '',
            addMasterDataValue: '',
        }

        this.getMasterList = this.getMasterList.bind(this);
        this.getMasterDataList = this.getMasterDataList.bind(this);
        this.selectedMaster = this.selectedMaster.bind(this);
        this.switchShowModal = this.switchShowModal.bind(this);
        this.addMaster = this.addMaster.bind(this);
        this.addMasterData = this.addMasterData.bind(this);
        this.changeAddMasterValue = this.changeAddMasterValue.bind(this);
        this.changeAddMasterDataValue = this.changeAddMasterDataValue.bind(this);
        this.switchShowMasterData = this.switchShowMasterData.bind(this);
    }

    componentDidMount() {
        this.getMasterList();
    }

    async getMasterList() {
        const retData = await CommonFunc.GetData('Master_List');
        this.setState({
            masterList: retData
        })
    }

    async getMasterDataList(masterId) {
        const retData = await CommonFunc.GetData(`Master_Data_List?master_id=${masterId}`);
        this.setState({
            selectedMasterId: masterId,
            masterDataList: retData
        });
    }

    selectedMaster(masterId) {
        this.getMasterDataList(masterId);
    }

    switchShowModal() {
        this.setState({
            isShowModal: !this.state.isShowModal
        });
    }

    switchShowMasterData() {
        this.setState({
            isShowMasterDataModal: !this.state.isShowMasterDataModal
        });
    }

    async addMaster() {
        const retData = await CommonFunc.PostData('Create_Master', { master_name: this.state.addMasterName, description: this.state.addMasterDescription });
        this.switchShowModal();
        this.getMasterList();
    }

    async addMasterData() {
        if (this.state.selectedMasterId === 0) { alert('マスタを選択してください');return; }
        console.log('addMasterData');
        const retData = await CommonFunc.PostData('Create_Master_Data', { master_id: this.state.selectedMasterId, master_value: this.state.addMasterDataValue });
        this.switchShowMasterData();
        this.getMasterDataList(this.state.selectedMasterId);
    }

    changeAddMasterValue(name, description) {
        this.setState({
            addMasterName: name,
            addMasterDdescription: description
        });
    }

    changeAddMasterDataValue(value) {
        this.setState({
            addMasterDataValue: value
        });
    }

    render() {
        const addModalSlot = <AddMaster name={this.state.addMasterName} description={this.state.addMasterDescription} changeAddMasterValue={this.changeAddMasterValue} />;
        const addBtn = <button className="btn-primary" onClick={this.addMaster}>追加</button>;

        const addMasterDataSlot = <AddMasterData value={this.state.addMasterDataValue} changeAddMasterDataValue={this.changeAddMasterDataValue} />
        const addMasterDataBtn = <button className="btn-primary" onClick={this.addMasterData}>追加</button>

        return (
            <div className="master-container">
                <div className="left-content">
                    <div className="header">
                        <div className="master-selector-intro">マスタを選択してください</div>
                        <button className="btn-primary" id='addMaster' onClick={this.switchShowModal}>追加</button>
                    </div>
                    
                    <div className="row">
                        <div className="no title">ID</div>
                        <div className="name title">マスタ名</div>
                    </div>
                    <div className="body">
                        {this.state.masterList.map(master => {
                            return (
                                <div className={"row data " + (this.state.selectedMasterId === master.master_id ? 'data_selected' : '')} key={master.master_id} onClick={() => {this.selectedMaster(master.master_id)}}>
                                    <div className="no">{master.master_id}</div>
                                    <div className="name">{master.master_name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="center-content">
                    ＞
                </div>

                <div className="right-content">
                    <div className="header">
                        <div className="master-selector-intro">マスタデータの値</div>
                        <button className="btn-primary" id='addMasterData' onClick={this.switchShowMasterData}>追加</button>
                    </div>

                    <div className="row">
                        <div className="no title">ID</div>
                        <div className="name title">値</div>
                    </div>
                    <div className="body">
                        {this.state.masterDataList.map(master => {
                            return (
                                <div className="row data" key={master.master_data_id}>
                                    <div className="no">{master.master_data_id}</div>
                                    <div className="name">{master.master_data_value}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <Modal isShow={this.state.isShowModal} switchShowModal={this.switchShowModal} title="新規マスタ追加" slotComponent={addModalSlot} updateBtn={addBtn} />
                <Modal isShow={this.state.isShowMasterDataModal} switchShowModal={this.switchShowMasterData} title="新規マスタデータ追加" slotComponent={addMasterDataSlot} updateBtn={addMasterDataBtn} />
            </div>
        );
    }
}

export default MasterSetting;