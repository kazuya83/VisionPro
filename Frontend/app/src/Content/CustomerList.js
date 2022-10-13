import { Component } from "react";
import React from "react";
import CommonFunc from "../common/CommonFunc";
import Const from "../common/Const";
import Input from "../component/input";
import Folder from "../Folder/Folder";
import Modal from "../component/modal";
import CustomerCardList from "./Customer/CustomerCardList";
import CustomerTable from "./Customer/CustomerTable";
import ToggleButton from "../component/toggleButton";
import './CustomerList.css';
import AddCustomer from "./Customer/AddCustomer";
import Tree from "../component/Tree/Tree";

class CustomerList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            folderList: [],
            customerInfoList: [],
            displayCustomerInfoList: [],
            layoutList: [],
            selectedFolderId: Number(CommonFunc.GetLocalStrage(Const.localStorage.CUSTOMER_FOLDER_ID) ?? 0),
            displayType: CommonFunc.GetLocalStrage(Const.localStorage.CUSTOMER_LIST.DISPLAY_TYPE) ?? Const.CUSTOMER_LIST.DISPLAY_TYPE.LIST,
            isShowAddCustomer: false,
        };

        this.folders = [
            { folder_id: 1, folder_name: '全体', children_folders: [
                { folder_id: 2, folder_name: 'あああ', children_folders:[
                    { folder_id: 4, folder_name: 'ううう', children_folders:[] },
                    { folder_id: 5, folder_name: 'えええ', children_folders:[
                        { folder_id: 6, folder_name: 'あああ', children_folders:[
                            { folder_id: 7, folder_name: 'ううう', children_folders:[] },
                            { folder_id: 8, folder_name: 'えええ', children_folders:[] },
                        ] },
                        { folder_id: 9, folder_name: 'いいい', children_folders:[] }
                    ] },
                ] },
                { folder_id: 3, folder_name: 'いいい', children_folders:[
                    { folder_id: 10, folder_name: 'あああ', children_folders:[
                        { folder_id: 11, folder_name: 'ううう', children_folders:[] },
                        { folder_id: 12, folder_name: 'えええ', children_folders:[
                            { folder_id: 13, folder_name: 'あああ', children_folders:[
                                { folder_id: 14, folder_name: 'ううう', children_folders:[] },
                                { folder_id: 15, folder_name: 'えええ', children_folders:[] },
                            ] },
                            { folder_id: 16, folder_name: 'いいい', children_folders:[] }
                        ] },
                    ] },
                ] }
            ]}
        ];

        this.filterString = "";
        this.childRef = React.createRef();

        this.changeFilterString =this.changeFilterString.bind(this);
        this.changeFolderId = this.changeFolderId.bind(this);
        this.onChangeToggleButton = this.onChangeToggleButton.bind(this);
        this.showCustomerDeatil = this.showCustomerDeatil.bind(this);
        this.addAttribute = this.addAttribute.bind(this);
        this.getCustomerLayoutList = this.getCustomerLayoutList.bind(this);
        this.getTemplateCustomerDisplayItem = this.getTemplateCustomerDisplayItem.bind(this);
        this.setCustomerDisplayList = this.setCustomerDisplayList.bind(this);
        this.getCustomerInfoList = this.getCustomerInfoList.bind(this);
    }

    async componentDidMount() {
        await this.getCustomerFolderList();
        await this.getCustomerInfoList();
        await this.getCustomerLayoutList();
        await this.setCustomerDisplayList();
    }

    getTemplateCustomerDisplayItem() {
        const displayItemList = {};
        displayItemList.customer_id = -1;
        for (let i = 1; i <= Const.CUSTOMER_LIST.DISPLAY_COUNT; i++) {
            displayItemList[i] = { name: '', value: '' };
        }
        return displayItemList;
    }

    async getCustomerFolderList() {
        const folderList = await CommonFunc.GetData('CustomerFolder');
        this.setState({
            folderList: CommonFunc.ConverterJSONpParse(folderList.customer_folder_list) ?? []
        });
    }

    async getCustomerInfoList() {
        const data = await CommonFunc.GetData('GetCustomerInfoList');
        this.setState({
            customerInfoList: data ?? []
        });
    }

    async getCustomerLayoutList() {
        const data = await CommonFunc.GetData('GetCustomerLayout');
        this.setState({
            layoutList: data
        });
        this.setCustomerDisplayList();
    }

    async setCustomerDisplayList() {
        console.log('=============');
        console.log(this.state.customerInfoList);
        console.log(this.state.layoutList);
        console.log('=============');
        console.log('');
        const displayList = [];
        this.state.customerInfoList.forEach(customerInfo => {
            const customerDisplay = this.getTemplateCustomerDisplayItem();
            displayList.push(customerDisplay);
            customerDisplay.customer_id = customerInfo.customer_id;
            this.state.layoutList.forEach(l => {
                if (CommonFunc.IsEmpty(l.layout_id) || CommonFunc.IsEmpty(l.attribute_id)) {
                    return;
                }
                customerDisplay[l.layout_id].name = customerInfo.attribute_dict[l.attribute_id]?.name;
                customerDisplay[l.layout_id].value = customerInfo.attribute_dict[l.attribute_id]?.value;
            });
        });
        console.log(displayList);
        this.setState({
            displayCustomerInfoList: displayList
        });
    }

    changeFilterString(filterString) {
        this.filterString = filterString;
        if (CommonFunc.IsEmpty(this.filterString)) {
            // this.setState({
            //     displayCustomerInfoList: this.state.customerInfoList,
            // });
            return;
        }
        const displayList = this.state.customerInfoList.filter((customer) => {
            for (const key in customer.attribute_dict) {
                if (CommonFunc.IsEmpty(customer.attribute_dict[key].value)) {
                    continue;
                }
                if (String(customer.attribute_dict[key].value).indexOf(this.filterString) != -1) { return true; }
            }
            return false;
        });
        // this.setState({
        //     displayCustomerInfoList: displayList,
        // });

    }

    changeFolderId(id) {
        this.setState({
            selectedFolderId: id
        });
        CommonFunc.SetLocalStrage(Const.localStorage.CUSTOMER_FOLDER_ID, id);
    }

    onChangeToggleButton(value) {
        this.setState({
            displayType: value ? Const.CUSTOMER_LIST.DISPLAY_TYPE.LIST : Const.CUSTOMER_LIST.DISPLAY_TYPE.CARD
        });
        CommonFunc.SetLocalStrage(Const.localStorage.CUSTOMER_LIST.DISPLAY_TYPE, this.state.displayType);
    }

    showCustomerDeatil() {
        this.setState({
            isShowAddCustomer: !this.state.isShowAddCustomer
        })
    }

    async addAttribute() {
        await this.childRef.current.addAttribute();
    }

    render() {
        const slot = this.state.displayType === Const.CUSTOMER_LIST.DISPLAY_TYPE.LIST ? <CustomerTable customerInfoList={this.state.displayCustomerInfoList} /> : <CustomerCardList customerInfoList={this.state.displayCustomerInfoList} />;
        const modalComponentSlot = <AddCustomer ref={this.childRef} switchAddCustomer={this.showCustomerDeatil} />;
        const addBtn = <button className="btn-primary" onClick={this.addAttribute}>追加</button>


        return(
            <div className="customer-list-content">
                <div className="left-content">
                    <Tree folders={this.folders} selectedFolderId={this.state.selectedFolderId} changeFolderId={this.changeFolderId} folderTitle="フォルダ" />
                    {/* <Folder folderList={this.state.folderList} selectedFolderId={this.state.selectedFolderId} changeFolderId={this.changeFolderId}  /> */}
                </div>

                <div className="right-content">
                    <div className="customer-content-header">
                        <div>
                            <Input inputValue={this.filterString} name="filter" placeholder="キーワード絞り込み" changeInput={this.changeFilterString} />
                        </div>

                        <div>
                            <ToggleButton label="一覧形式" checked={this.state.displayType === Const.CUSTOMER_LIST.DISPLAY_TYPE.LIST} onChangeToggleButton={this.onChangeToggleButton} />
                        </div>

                        <div>
                            <button className="btn-primary" onClick={this.showCustomerDeatil}>新規顧客追加</button>
                            <button className="btn-primary">一括CSV登録</button>
                        </div>
                    </div>

                    {slot}
                </div>

                <Modal isShow={this.state.isShowAddCustomer} switchShowModal={this.showCustomerDeatil} title="新規顧客追加" slotComponent={modalComponentSlot} updateBtn={addBtn} />
            </div>
        );
    }
}

export default CustomerList;