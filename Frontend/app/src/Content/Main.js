import { Component } from "react";
import Navigation from "../Navigation/Navigation";
import CustomerList from "./CustomerList";
import WebHistory from "./WebHistory";
import MA from "./MA";
import Analysis from "./Analysis";
import Sales from "./Sales";
import Stock from "./Stock";
import CustomizeVariable from "./CustomizeVariable";
import Setting from "./Setting";
import Const from "../common/Const";
import './Main.css';
import CommonFunc from "../common/CommonFunc";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRenderToggle: true
        };
        this.rerender = this.rerender.bind(this);
    }

    rerender() {
        this.setState({
            isRenderToggle: !this.state.isRenderToggle
        });
    }

    render() {
        const slot = () => {
            const selectedNavigationId = CommonFunc.GetLocalStrage(Const.localStorage.NAVIGATION_ID) ?? Const.NAVIGATION.CUSTOMER_LIST;
            switch (Number(selectedNavigationId)) {
                case Const.NAVIGATION.CUSTOMER_LIST:
                    return <CustomerList />;
                case Const.NAVIGATION.WEB_HISTORY:
                    return <WebHistory />;
                case Const.NAVIGATION.MA:
                    return <MA />;
                case Const.NAVIGATION.ANALYSIS:
                    return <Analysis />;
                case Const.NAVIGATION.SALES:
                    return <Sales />;
                case Const.NAVIGATION.STOCK:
                    return <Stock />;
                case Const.NAVIGATION.CUSTOMIZE_VARIABLE:
                    return <CustomizeVariable />;
                case Const.NAVIGATION.SETTING:
                    return <Setting />;
            }
        };

        const navigationToggleStr = CommonFunc.GetLocalStrage(Const.localStorage.NAVIGATION_TOGGLE) ?? Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.OPEN;
        const navigationToggleClassName = "side-content" +  (Number(navigationToggleStr) === Const.NAVIGATION_TOGGLE_OPEN_OR_CLOSE.CLOSE ? "_close" : "_open");

        return (
            <div className="main-container">
                <div className={"side-content " + navigationToggleClassName}>
                    <Navigation navigationList={this.navigations} rerender={this.rerender} />
                </div>
                
                <div className="main-content">
                    {slot()}
                </div>
            </div>
        );
    }
}

export default Main;