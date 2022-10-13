import { Component } from "react";
import CommonFunc from "../common/CommonFunc";
import CustmoizeVariableCardList from "./CustomizeVariable/CustomizeVariableCardList";
import './CustomizeVariable.css';

class CustomizeVariable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 1,
            basicAttributes: [],
        };

        this.attributeCategorys = [
            { id: 1, category_name: '顧客基本属性' },
            { id: 2, category_name: '顧客履歴属性' },
            { id: 3, category_name: 'カスタマイズ属性' },
        ];

        this.getCustomerBasicAttributeList = this.getCustomerBasicAttributeList.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    componentDidMount() {
        switch (this.state.selectedCategory) {
            case 1:
                this.getCustomerBasicAttributeList();
                break;
            default:
                break;
        }
    }

    async getCustomerBasicAttributeList() {
        const data = await CommonFunc.GetData('GetCustomerAttributeList');
        this.setState({
            basicAttributes: data ?? []
        })
    }

    selectCategory(categoryId) {
        this.setState({
            selectedCategory: categoryId
        });
    }

    render() {
        return (
            <div className="customize-variable-content">
                <div className="customize-variable-header">
                    {this.attributeCategorys.map(category => {
                        const categoryClassName = 'customize-variable-category';
                        return (
                            <div key={category.id} className={categoryClassName + (this.state.selectedCategory === category.id ? ' ' + categoryClassName + '_selected' : '')} onClick={() => {this.selectCategory(category.id)}}>
                                {category.category_name}
                            </div>
                        );
                    })}
                </div>

                <div className="customize-variable-body">
                    <CustmoizeVariableCardList attributes={this.state.basicAttributes} reRenderAttribute={this.getCustomerBasicAttributeList} />
                </div>
            </div>
        );
    }
}
export default CustomizeVariable;