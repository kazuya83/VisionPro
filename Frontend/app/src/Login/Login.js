import './Login.css';
import Const from "../common/Const";
import CommonFunc from "../common/CommonFunc";
import Input from "../component/input";
import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.corporateId = "";
        this.userName = "";
        this.password = "";

        this.changeCorporateId = this.changeCorporateId.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        // TODO:Mounted
    }
    
    changeCorporateId(corporateId) {
        this.corporateId = corporateId;
    }
    
    changeUserName(userName) {
        this.userName = userName;
    }

    changePassword(password) {
        this.password = password;
    }

    buttonClick() {
        CommonFunc.SetLocalStrage(Const.localStorage.CORPORATE_ID, this.corporateId);
        CommonFunc.SetLocalStrage(Const.localStorage.USER_NAME, this.userName);
        // location.reload();
        this.props.reRender();
    }
    
    render() {
        return (
            <div className="login-content">
                <div>
                    <h2>Login</h2>
                </div>

                <div className='form-container'>
                    <Input inputValue={this.corporateId} name={"corporate_id"} placeholder="CORPORATE ID" changeInput={this.changeCorporateId} />
                </div>
    
                <div className="form-container">
                    <Input inputValue={this.userName} name={Const.localStorage.USER_NAME} placeholder={'USER NAME'} changeInput={this.changeUserName} />
                </div>

                <div className="form-container">
                    <Input type="password" name="pass_word" placeholder='PASSWORD' changeInput={this.changePassword}  />
                </div>

                <div className="form-container">
                    <button onClick={this.buttonClick} className="btn-primary">LOGIN</button>
                </div>
            </div>
        );
    }
}

export default Login;