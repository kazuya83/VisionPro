import { Component } from "react";
import Input from '../component/input';
import StockCardList from "./Stock/StockCardList";
import './Stock.css';

class Stock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stock-content">
                <Input name="filter" placeholder="キーワード絞り込み" />
                <StockCardList />
            </div>
        );
    }
}
export default Stock;