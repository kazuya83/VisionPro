import Const from './common/Const';
import CommonFunc from './common/CommonFunc';
import './MasterPage.css';
import Header from './Content/Header';
import Main from './Content/Main';
import Login from './Login/Login';
import { Component, useState } from "react";

class MasterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRenderToggle: true
        };

        this.reRender = this.reRender.bind(this);
    }

    reRender() {
        this.setState({
            isRenderToggle: !this.state.isRenderToggle
        });
    }

    render() {
        const userName = CommonFunc.GetLocalStrage(Const.localStorage.USER_NAME);
        const isLogin = !CommonFunc.IsEmpty(userName);

        const slot = () => {
            return isLogin ? <Main reRender={this.reRender} /> : <Login reRender={this.reRender} />;
        };
        
        return (
            <div id="App">
                <Header reRender={this.reRender} />
    
                <div className="content">
                    {slot()}
                </div>
            </div>
        );
    }
}

export default MasterPage;