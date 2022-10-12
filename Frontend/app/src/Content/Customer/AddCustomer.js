import { Component } from "react";
import CommonFunc from "../../common/CommonFunc";
import Input from "../../component/input";
import './AddCustomer.css';

class AddCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attributeList: [],
            masterDataDictionary: {},
        };

        this.customerId = this.props.customerId;
        this.renderContent = this.renderContent.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.getMasterDataDictionary = this.getMasterDataDictionary.bind(this);
        this.chagneSelect = this.chagneSelect.bind(this);
    }

    async componentDidMount() {
        await this.getAttributeList();
        const masterIdList = [];
        this.state.attributeList.forEach(attribute => {
            const masterId = attribute.master_id;
            if (masterId === 0 || masterIdList.includes(masterId)) { return; }
            masterIdList.push(masterId);
        });
        await this.getMasterDataDictionary(masterIdList);
    }

    async getAttributeList() {
        const data = await CommonFunc.GetData('GetCustomerAttributeList');
        this.setState({
            attributeList: data ?? []
        });
    }

    async getMasterDataDictionary(masterIdList) {
        const masterDataDictionary = {};
        for (let i = 0; i < masterIdList.length; i++) {
            const masterId = masterIdList[i];
            const data = await CommonFunc.GetData(`Master_Data_List?master_id=${masterId}`);
            masterDataDictionary[masterId] = data;
        }
        this.setState({
            masterDataDictionary: masterDataDictionary
        });
        console.log(this.state.masterDataDictionary);
    }

    async renderContent() {
        const data = await CommonFunc.GetData('GetCustomerAttributeList');
        return (
            <>
            {data.map((attribute) => {
                return (
                    <div key={attribute.attribute_id}>
                        <label>{attribute.attribute_name}</label>
                    </div>
                );
            })}
            </>
        );
    }

    changeInput(value, attributeId) {
        const attributeList = this.state.attributeList;
        const attribute = attributeList.find(attribute => attribute.attribute_id === attributeId);
        attribute.attribute_value = value;
        this.setState({
            attributeList: attributeList
        });
    }

    chagneSelect(e) {
        const attributeId = Number(e.target.getAttribute('attribute_id'));
        const value = e.target.value;
        const attributeList = this.state.attributeList;
        const attribute = attributeList.find(attribute => attribute.attribute_id === attributeId);
        attribute.attribute_value = value;
        this.setState({
            attributeList: attributeList
        });
    }

    async addAttribute() {
        const param = { attribute_info: {} };
        this.state.attributeList.forEach(attribute => {
            param.attribute_info[attribute.attribute_id] = attribute.attribute_value ?? ''
        });
        const response = await CommonFunc.PostData('UpdateCustomer', param);
        alert(response.message);
        if (response.status_code === 200) {
            this.props.switchAddCustomer();
            return;
        }
        
        
    }

    render() {
        return (
            <div className="add-customer-container">
                {this.state.attributeList.map((attribute) => {
                    if (attribute.attribute_data_type === 4) {
                        return (
                            <div className="add-customer-content" key={attribute.attribute_id}>
                                <div className="add-customer-content-label-container">
                                    <label>{attribute.attribute_name}</label>
                                </div>
                                <div>
                                    <select onChange={this.chagneSelect} attribute_id={attribute.attribute_id}>
                                        {this.state.masterDataDictionary[attribute.master_id]?.map((masterData) => {
                                            return (
                                                <option key={masterData.master_data_id} value={masterData.master_data_id}>{masterData.master_data_value}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div className="add-customer-content" key={attribute.attribute_id}>
                            <Input type={attribute.attribute_data_type === 3 ? "date" : "text"} name={attribute.attribute_id} placeholder={attribute.attribute_name} changeInput={this.changeInput} />
                        </div>
                    );
                })}
                <div className="add-customer-content"></div>
            </div>
        );
    }
}

export default AddCustomer;