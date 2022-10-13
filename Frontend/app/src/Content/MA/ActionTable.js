import { Component } from "react";
import './ActionTable.css';

class ActionTable extends Component {
    constructor(props) {
        super(props);

        this.actionSettingList = [];
        for (let i = 1; i <= 30; i++) {
            const obj = { no: i, settingName: '設定' + i, status: 0, sendDate: '-', sendCount: 10  };
            this.actionSettingList.push(obj);
        }
    }

    render() {
        return(
            <div className="action-table">
                <table>
                    <thead>
                        <tr>
                            <th className="no">No</th>
                            <th className="title">設定名</th>
                            <th className="status">配信状況</th>
                            <th className="send-date">配信予定日時</th>
                            <th className="send-count">配信数（予定数）</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.settingList.map((actionSetting) => {
                            return (
                                <tr key={"line" + actionSetting.no}>
                                    <td className="no">{actionSetting.no}</td>
                                    <td className="title">{actionSetting.settingName}</td>
                                    <td className="status">{actionSetting.status}</td>
                                    <td className="send-date">{actionSetting.sendDate}</td>
                                    <td className="send-count">{actionSetting.sendCount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ActionTable;