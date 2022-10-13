import { Component } from "react";
import "./Tree.css";
import folderIcon from "../../image/open-folder.png";
import { RestaurantRounded } from "@mui/icons-material";

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: this.props.render ? this.props.render : true
        };

        this.clickFolder = this.clickFolder.bind(this);
        this.reRender = this.reRender.bind(this);
    }

    clickFolder(folderId) {
        this.reRender(folderId);
    }

    reRender(folderId) {
        this.setState({
            render: !this.state.render
        });
        if (this.props.isChild) {
            this.props.reRender(folderId);
        } else {
            this.props.changeFolderId(folderId);
        }
    }

    render() {
        const titleContainer = this.props.isChild ? <></> : <div className="folder-title">{this.props.folderTitle}</div>;
        
        return (
            <div>
                {titleContainer}
                {this.props.folders.map(folder => {
                    const selectedFolderClass = folder.folder_id === this.props.selectedFolderId ? 'folder-row_selected ' : '';
                    const childHr = this.props.isChild ? <></> : <></>;
                    const parentClass = !this.props.isChild ? 'parent-folder ' : '';
                    return (
                        <div className="folder" key={folder.folder_id}>
                            <div className={"folder-row " + selectedFolderClass + parentClass} onClick={() => { this.clickFolder(folder.folder_id); }}>
                                {childHr}
                                <img src={folderIcon} />
                                <span>{folder.folder_name}</span>
                            </div>

                            <div className="children-folder">
                                <Tree folders={folder.children_folders} selectedFolderId={this.props.selectedFolderId} isChild={true} reRender={this.reRender} render={this.state.render} />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Tree;