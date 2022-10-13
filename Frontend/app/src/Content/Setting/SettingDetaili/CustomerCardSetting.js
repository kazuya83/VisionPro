import { Component } from "react";
import Input from "../../../component/input";
import ArrowIcon from "../../../image/arrow.png";
import '../../../Content/Customer/CustomerCard.css';
import './CustomerCardSetting.css';
import CommonFunc from "../../../common/CommonFunc";

class CustomerCardSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerVariableList: [],
            selectedAttribute1: -1,
            selectedAttribute2: -1,
            selectedAttribute3: -1,
            selectedAttribute4: -1,
            selectedAttribute5: -1,
            selectedAttribute6: -1,
            selectedAttribute7: -1,
            selectedAttribute8: -1,
        };

        this.attributeContainerList = [
            { id: 1, name:'属性①' },
            { id: 2, name:'属性②' },
            { id: 3, name:'属性③' },
            { id: 4, name:'属性④' },
            { id: 5, name:'属性⑤' },
            { id: 6, name:'属性⑥' },
            { id: 7, name:'属性⑦' },
            { id: 8, name:'属性⑧' },
        ];

        this.getCustomerVariable = this.getCustomerVariable.bind(this);
        this.changeSelectedAttribute = this.changeSelectedAttribute.bind(this);
        this.getCustomerAttributeName = this.getCustomerAttributeName.bind(this);
        this.getCustomerLayoutList = this.getCustomerLayoutList.bind(this);
    }

    componentDidMount() {
        this.getCustomerVariable();
        this.getCustomerLayoutList();
    }

    async getCustomerVariable() {
        const data = await CommonFunc.GetData('GetCustomerAttributeList');
        this.setState({
            customerVariableList: data
        });
    }

    async getCustomerLayoutList() {
        const data = await CommonFunc.GetData('GetCustomerLayout');
        const obj = {};
        data.forEach(d => {
            obj[`selectedAttribute${d.layout_id}`] = d.attribute_id;
        });
        this.setState(obj);
    }

    async changeSelectedAttribute(e) {
        const param = {
            layout_id: e.target.getAttribute('attribute_container_id'),
            attribute_id: e.target.value
        };
        const res = await CommonFunc.PostData('UpdateCustomerLayout', param);
        this.getCustomerLayoutList();
    }

    getCustomerAttributeName(attributeId) {
        const customerVariable = this.state.customerVariableList.find(customerVariable => Number(customerVariable.attribute_id) === Number(attributeId));
        if (CommonFunc.IsEmpty(customerVariable)) { return '' };
        return customerVariable.attribute_name;
    }

    render() {
        return (
            <div className="customer-card-setting-container">
                <div className="customer-card-setting-container_left">
                    <div className="introduce">属性を８個までレイアウト設定できます</div>

                    <div className="customer-card customer-card-setting">
                        <div className="customer-id other">ID. </div>
                        <div className="customer-info-container">
                            <div className="customer-info-container_left">
                                <div className="customer-common-item">
                                    <div>属性①</div>
                                    <div></div>
                                </div>
                                <div className="customer-common-item">
                                    <div>属性②</div>
                                    <div></div>
                                </div>
                            </div>

                            <div className="customer-info-container_right">
                                <div className="customer-common-item">
                                    <div>属性④</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>属性⑤</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>属性⑥</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>属性⑦</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>属性⑧</div>
                                    <div></div>
                                </div>
                            </div>
                        </div>

                        <div className="customer-icon other">
                            <div className="customer-common-item">
                                <div>属性③</div>
                            </div>
                        </div>
                    </div>

                    <div className="arrow-under">
                        <img src={ArrowIcon} />
                    </div>

                    <div className="customer-card customer-card-dummy">
                        <div className="customer-id other">ID. </div>
                        <div className="customer-info-container">
                            <div className="customer-info-container_left">
                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute1)}</div>
                                    <div></div>
                                </div>
                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute2)}</div>
                                    <div></div>
                                </div>
                            </div>

                            <div className="customer-info-container_right">
                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute4)}</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute5)}</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute6)}</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute7)}</div>
                                    <div></div>
                                </div>

                                <div className="customer-common-item">
                                    <div>{this.getCustomerAttributeName(this.state.selectedAttribute8)}</div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className="customer-icon other">
                            <div className="customer-common-item">
                                <div>{this.getCustomerAttributeName(this.state.selectedAttribute3)}</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="customer-card-setting-container_right">
                    {this.attributeContainerList.map(attributeContainer => {
                        return (
                            <div className="customer-select-container" key={attributeContainer.id}>
                                <label>{attributeContainer.name}</label>
                                <select onChange={this.changeSelectedAttribute} attribute_container_id={attributeContainer.id} value={this.state[`selectedAttribute${attributeContainer.id}`]}>
                                    <option value="-1">未選択</option>
                                    {this.state.customerVariableList.map(customerVariable => {
                                        return (
                                            <option key={attributeContainer.id+"_"+customerVariable.attribute_id} value={customerVariable.attribute_id}>{customerVariable.attribute_name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        );
                    })}
                </div>
                
                
            </div>
        );
    }
}
export default CustomerCardSetting;