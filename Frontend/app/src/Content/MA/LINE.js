import { Component } from "react";
import CommonFunc from "../../common/CommonFunc";
import Const from "../../common/Const";
import Folder from "../../Folder/Folder";
import ActionTable from "./ActionTable";
import './LINE.css';

class LINE extends Component {
    constructor(props) {
        super(props);

        this.state = {
            folderList: [],
            settingList: [],
            selectedFolderId: 0,
        };
        this.selectedFolderId = Number(CommonFunc.GetLocalStrage(Const.localStorage.LINE_FOLDER_ID) ?? 0);

        this.changeFolderId = this.changeFolderId.bind(this);
    }

    componentDidMount() {
        this.getFolderList();
        this.getLineSettingList();
    }

    async getFolderList() {
        const folderData = await CommonFunc.GetData('LineFolder');
        this.setState({
            folderList: CommonFunc.ConverterJSONpParse(folderData.line_folder_list) ?? []
        });
    }

    async getLineSettingList() {
        const settingData = await CommonFunc.GetData('LineSettingList');
        this.setState({
            settingList: CommonFunc.ConverterJSONpParse(settingData.line_setting_list) ?? []
        })
    }

    changeFolderId(id) {
        this.setState({
            selectedFolderId: id
        });
        CommonFunc.SetLocalStrage(Const.localStorage.LINE_FOLDER_ID, id);
    }

    render() {
        return (
            <div className="line-content">
                <div className="left-content">
                    <Folder folderTitle="フォルダ" folderList={this.state.folderList} selectedFolderId={this.state.selectedFolderId} changeFolderId={this.changeFolderId} />
                </div>

                <div className="right-content">
                    <ActionTable settingList={this.state.settingList} />
                </div>
            </div>
        );
    }
}

export default LINE;