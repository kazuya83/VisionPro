import { Component } from "react";
import StockCard from "./StockCard";
import './StockCardList.css';

class StockCardList extends Component {
    constructor(props) {
        super(props);

        this.stockList = [
            { id: 1, itemName: '商品A', stockCount: 10000, itemImageSrc: 'https://kao-h.assetsadobe3.com/is/image/content/dam/sites/kao/www-kao-com/jp/ja/products/nivea/25991616/GG01.jpg' },
            { id: 2, itemName: '商品B', stockCount: 5, itemImageSrc: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/niv/niv02219/v/12.jpg' },
            { id: 3, itemName: '商品C', stockCount: 3,  },
            { id: 4, itemName: '商品D', stockCount: 1000,  },
            { id: 5, itemName: '商品E', stockCount: 10,  },
        ];
    }

    render() {
        return (
            <div className="stock-card-list-container">
                {this.stockList.map((stock) => {
                    return <StockCard id={stock.id} key={stock.id} itemName={stock.itemName} itemImageSrc={stock.itemImageSrc} stockCount={stock.stockCount} />
                })}
            </div>
        );
    }
}

export default StockCardList;