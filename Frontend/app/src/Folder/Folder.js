import { Component } from "react";
import './Folder.css';

class Folder extends Component {
    constructor(props) {
        super(props);
        this.selectFolder = this.selectFolder.bind(this);
    }

    selectFolder(id) {
        this.props.changeFolderId(id);
    }

    render() {
        return (
            <div className="folder-contaner">
                <div className="folder-contaner-header">{this.props.folderTitle ?? "セグメント"}</div>

                <div className="folder-content">
                    {this.props.folderList.map((folder) => {
                        const selectedClassName = Number(folder.id) === Number(this.props.selectedFolderId) ? "folder_selected" : "";
                        return (
                            <div key={folder.id} id={"folder" + folder.id} className={"folder " + selectedClassName} onClick={() => { this.selectFolder(folder.id); }}>{folder.folder_name}</div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Folder;