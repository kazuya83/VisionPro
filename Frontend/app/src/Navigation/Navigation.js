import { Component } from "react";
import CommonFunc from "../common/CommonFunc";
import Const from "../common/Const";
import './Navigation.css';
import arrowIcon from '../image/arrow.png';
import settingIcon from '../image/setting.png';
import peopleIcon from '../image/people.png';
import whiteboardIcon from '../image/whiteboard.png';
import sendIcon from '../image/send.png';
import analysisIcon from '../image/analysis.png';
import salesIcon from '../image/sales.png';
import stockIcon from '../image/stock.png';
import marketingIcon from '../image/marketing.png';
import customizeVariableIcon from '../image/customizeVariable.png';
import eggIcon from '../image/egg.png';


class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigationList: []
        };

        this.selectedNavigation = this.selectedNavigation.bind(this);
        this.getSelectedNavigationClass = this.getSelectedNavigationClass.bind(this);
        this.changeOpenOrClose = this.changeOpenOrClose.bind(this);
    }

    componentDidMount() {
        this.getNavigationList();
    }

    async getNavigationList() {
        const response = await CommonFunc.PostData('Navigation', CommonFunc.GetCommonRequestParam());
        const data = response.data;
        this.setState({
            navigationList: CommonFunc.ConverterJSONpParse(data) ?? []
        });
    }

    getNavigationIcon(id) {
        switch (Number(id)) {
            case Const.NAVIGATION.CUSTOMER_LIST:
                return peopleIcon;
            case Const.NAVIGATION.WEB_HISTORY:
                return whiteboardIcon;
            case Const.NAVIGATION.MA:
                return sendIcon;
            case Const.NAVIGATION.ANALYSIS:
                return analysisIcon;
            case Const.NAVIGATION.SALES:
                return salesIcon;
            case Const.NAVIGATION.STOCK:
                return stockIcon;
            case Const.NAVIGATION.MARKETING:
                return marketingIcon;
            case Const.NAVIGATION.CUSTOMIZE_VARIABLE:
                return customizeVariableIcon;
            default:
                return eggIcon;
        }
    }

    selectedNavigation(id) {
        CommonFunc.SetLocalStrage(Const.localStorage.NAVIGATION_ID, id);
        this.props.rerender();
    }

    getSelectedNavigationClass(id) {
        const selectedId = CommonFunc.GetLocalStrage(Const.localStorage.NAVIGATION_ID);
        return id === Number(selectedId) ? "selected-navigation" : "";
    }

    getCurrentToggle() {
        const navigationToggleStr = CommonFunc.GetLocalStrage(Const.localStorage.NAVIGATION_TOGGLE) ?? Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.OPEN;
        return Number(navigationToggleStr);
    }

    changeOpenOrClose() {
        const changeNavigationToggle = this.getCurrentToggle() === Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.CLOSE ? Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.OPEN : Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.CLOSE;
        CommonFunc.SetLocalStrage(Const.localStorage.NAVIGATION_TOGGLE, changeNavigationToggle);
        this.props.rerender();
    }

    render() {
        const isCloseNavigation = this.getCurrentToggle() === Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.CLOSE;
        const arrowIconClassName = isCloseNavigation ? "reverse" : "";
        const navigationCloseClassName = isCloseNavigation ? "close-navigation-label" : "";
        const navigationCloseSettingIconClassName = isCloseNavigation ? "close-navigation-setting-icon" : "";

        return (
            <>
                <ul className="navigations">
                    {this.state.navigationList.map((nav) => {
                        return (
                            <li id={nav.navigation_id} key={nav.navigation_name} className={this.getSelectedNavigationClass(nav.navigation_id)} onClick={() => { this.selectedNavigation(nav.navigation_id); }}>
                                <img src={this.getNavigationIcon(nav.navigation_id)} />
                                <label className={navigationCloseClassName}>{nav.navigation_name}</label>
                            </li>
                            );
                    })}
                </ul>

                <div className={"setting-navigation " + navigationCloseSettingIconClassName} onClick={() => { this.selectedNavigation(0); }}>
                    <img src={settingIcon} />
                    <label className={navigationCloseClassName}>設定</label>
                </div>

                <div className="side-content-arrow" onClick={this.changeOpenOrClose}>
                    <img src={arrowIcon} width="20px" height="20px" className={arrowIconClassName} />
                </div>
            </>
        );
    }
}

export default Navigation;