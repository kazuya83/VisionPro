import './input.css';
import { Component } from "react";
import moment from 'moment';
import CommonFunc from "../common/CommonFunc";

class Input extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.placeholder = props.placeholder;
        this.type = props.type ? props.type : 'text';
        this.state = {
            inputValue: '',
            yearValue: '',
            monthValue: '',
            dayValue: '',
            inputToggle: false,
            dateToggle: false,
            yearAlert: '',
            monthAlert: '',
            dayAlert: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handlerChangeDay = this.handlerChangeDay.bind(this);
    }

    handleChange(e) {
        const value = this.type === 'date' ? moment(new Date(e.target.value)).format('YYYY-MM-DD') : e.target.value;
        this.props.changeInput(value, this.name);

        this.setState({
            inputValue: value,
        });
        this.setState({
            inputToggle: !CommonFunc.IsEmpty(value)
        });
    }

    handleChangeYear(e) {
        const value = e.target.value;
        this.setState({ yearValue: value });
        let alertText = '';

        if (isNaN(value)) {
            alertText = '数値を入力してください。';
        } else if (value.length !== 0 && value.length !== 4) {
            alertText = '4桁の数値を入力してください';
        }

        this.setState({ yearAlert: alertText  });

        const dateToggle = !CommonFunc.IsEmpty(value) || !CommonFunc.IsEmpty(this.state.monthValue) || !CommonFunc.IsEmpty(this.state.dayValue);
        this.setState({ dateToggle: dateToggle });

        this.props.changeInput(value, this.name);
    }

    handleChangeMonth(e) {
        const value = e.target.value;
        this.setState({
            monthValue: value
        });

        let alertText = '';
        if (isNaN(value)) {
            alertText = '数値を入力してください。';
        } else if (!CommonFunc.IsEmpty(value) && (Number(value) < 1 || 12 < Number(value))) {
            alertText = '1〜12の範囲で入力してください';
        }
        this.setState({ monthAlert: alertText });

        const dateToggle = !CommonFunc.IsEmpty(this.state.yearValue) || !CommonFunc.IsEmpty(value) || !CommonFunc.IsEmpty(this.state.dayValue);
        this.setState({ dateToggle: dateToggle });

        this.props.changeInput(value, this.name);
    }

    handlerChangeDay(e) {
        const value = e.target.value;
        this.setState({ dayValue: value });

        let alertText = '';
        if (isNaN(value)) {
            alertText = '数値を入力してください。';
        } else if (!CommonFunc.IsEmpty(value) && (Number(value) < 1 || 31 < Number(value))) {
            alertText = '1〜31の範囲で入力してください';
        }
        this.setState({ dayAlert: alertText });

        const dateToggle = !CommonFunc.IsEmpty(this.state.yearValue) || !CommonFunc.IsEmpty(this.state.monthValue) || !CommonFunc.IsEmpty(value);
        this.setState({ dateToggle: dateToggle });

        this.props.changeInput(value, this.name);
    }

    render() {
        if (this.type === 'date') {
            // TODO: ここのCSS制御がまだできていない
            return (
                <div>
                    <div className='input-date-container'>
                        <div className='input-container year'>
                            <input type="text" value={this.state.yearValue} onChange={this.handleChangeYear} className={this.state.dateToggle ? "used" : ""} />
                            <span className={!this.state.dateToggle ? "hidden-label" : ""}>年</span>
                            <label>{this.placeholder}</label>
                            <div className={!CommonFunc.IsEmpty(this.state.yearAlert) ? "alert" : ""}>{this.state.yearAlert}</div>
                        </div>

                        <div className='input-container month'>
                            <input type="text" value={this.state.monthValue} onChange={this.handleChangeMonth} />
                            <span className={!this.state.dateToggle ? "hidden-label" : ""}>月</span>
                            <div className={!CommonFunc.IsEmpty(this.state.monthAlert) ? "alert" : ""}>{this.state.monthAlert}</div>
                        </div>
                        <div className='input-container day'>
                            <input type="text" value={this.state.dayValue} onChange={this.handlerChangeDay} />
                            <span className={!this.state.dateToggle ? "hidden-label" : ""}>日</span>
                            <div className={!CommonFunc.IsEmpty(this.state.dayAlert) ? "alert" : ""}>{this.state.dayAlert}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="input-container">
                    <input type={this.type} value={this.state.inputValue} name={this.name} className={this.state.inputToggle ? "used" : ""} onChange={this.handleChange} />
                    <label>{this.placeholder}</label>
                </div>
            );
        }
    }
}
export default Input;