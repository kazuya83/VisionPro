import { Component } from "react";
import './CustomerTable.css';

class CustomerTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="customer-table-container">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th className="no">No</th>
                            <th className="id">ID</th>
                            <th className="name">氏名</th>
                            <th className="sex">性別</th>
                            <th className="age">年齢</th>
                            <th className="prefecture">都道府県</th>
                            <th className="pay-amount">合計購入金額</th>
                            <th className="last-update-date">最終購入日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customerInfoList.map((customer) => {
                            return (
                                <tr key={customer.id}>
                                    <td className="no">1</td>
                                    <td className="id">{customer.id}</td>
                                    <td className="name">{customer.customerName}</td>
                                    <td className="sex">{customer.sex_jp}</td>
                                    <td className="age">{customer.age}</td>
                                    <td className="prefecture">{customer.prefecture}</td>
                                    <td className="pay-amount">{customer.payAmount}</td>
                                    <td className="last-update-date">{customer.lastUpdateDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CustomerTable;