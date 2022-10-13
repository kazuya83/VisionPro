import { OneKPlusOutlined } from "@mui/icons-material";
import { Component } from "react";
import CustomerCard from "./CustomerCard";

class CustomerCardList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.customerInfoList);
        return (
            <div className="customer-card-list">
                {this.props.customerInfoList.map((customer) => {
                    return (
                        <CustomerCard customerInfo={customer} key={customer.customer_id} />
                    );
                })}
            </div>
        );
    }
}

export default CustomerCardList;