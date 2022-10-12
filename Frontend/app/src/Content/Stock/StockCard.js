import { Component } from "react";
import CommonFunc from "../../common/CommonFunc";
// import LineChart from "../../component/Graph/LineChart";
import noImageIcon from '../../image/no-image.png';
import './StockCard.css';

class StockCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stock-card">
                <div className="stock-card-header">
                    <div className="id">No.{this.props.id}</div>
                    <div className="item-name">{this.props.itemName}</div>
                </div>

                <div className="stock-card-content">
                    <div className="item-image">
                        <img src={this.props.itemImageSrc ? this.props.itemImageSrc : noImageIcon} />
                    </div>

                    <div className="stock-card-description">
                        <div>残</div>
                        <div className="stock-count">{CommonFunc.ReplaceCommaNumber(this.props.stockCount)}</div>
                    </div>

                    
                </div>
                
            </div>
        );
    }
}

export default StockCard;