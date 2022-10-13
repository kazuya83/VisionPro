import { Component } from "react";
import CommonFunc from "../common/CommonFunc";
import Const from "../common/Const";
import SearchBox from "../component/SearchBox";
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userName = CommonFunc.GetLocalStrage(Const.localStorage.USER_NAME);
        const userNameFirstChar = CommonFunc.IsEmpty(userName) ? "?" : userName[0];
        return(
            <header>
                <h1 className="title">VisionPro</h1>

                <div className="header-search-box">
                    <SearchBox placeholder="Search..." />
                </div>
                
                
                <div id="mectrl_user" onClick={() => {CommonFunc.SetLocalStrage(Const.localStorage.USER_NAME, ''); this.props.reRender();}}>
                    {userNameFirstChar}
                </div>
            </header>
        );
    }
}
export default Header;