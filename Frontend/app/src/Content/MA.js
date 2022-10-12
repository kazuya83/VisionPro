import { Component } from "react";
import Toggle from "../component/toggle";
import LINE from "./MA/LINE";
import './MA.css';
import CommonFunc from "../common/CommonFunc";
import Const from "../common/Const";

class MA extends Component {
    constructor(props) {
        super(props);

        this.toggleList = [
            { toggleName: "メール", id: 1 },
            { toggleName: "LINE", id: 2 },
        ];

        this.state = {
            selectedToggleId: CommonFunc.GetLocalStrage(Const.localStorage.ACTION_SELECTED_TOGGLE) ?? 1
        };

        this.changeToggleId = this.changeToggleId.bind(this);
    }

    changeToggleId(id) {
        this.setState({
            selectedToggleId: id
        });
        CommonFunc.SetLocalStrage(Const.localStorage.ACTION_SELECTED_TOGGLE, id); 
    }

    render() {
        return (
            <div className="ma-content">
                <div className="ma-content-header">
                    <div className="ma-content-header_left">
                        <Toggle toggleList={this.toggleList} selectedToggleId={this.state.selectedToggleId} changeToggleId={this.changeToggleId} />
                    </div>

                    <div className="ma-content-header_right">
                        <button className="btn-primary">新規配信設定追加</button>
                    </div>
                </div>
                

                <LINE />
            </div>
        )
    }
}

export default MA;