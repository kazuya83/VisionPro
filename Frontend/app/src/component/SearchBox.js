import { Component } from "react";
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';


class SearchBox extends Component {
    constructor(props) {
        super(props);
    }

    inputChanged(e) {
        console.log(e);
    }

    render() {
        return (
            <div className="search-box-container">
                <div className="search-icon-wrapper">
                    <SearchIcon />
                </div>
                <div className="search-input-wrapper">
                    <input type="text" placeholder={this.props.placeholder} onChange={this.inputChanged} />
                </div>
            </div>
        );
    }
}
export default SearchBox;