import React from "react";
import download from "../assets/download.svg";
import fileUploadIcon from '../assets/icons8-file-upload-64 (1).png';
import { Label } from "@mui/icons-material";
const Upload = () => {
    return (
        <div>
            {" "}
            <div style={{ marginTop: 10 }} className="mr-3 mb-2">

                <a href="#open-modal" className="mb-2">
                    <img src={fileUploadIcon} width="40px" height="40px" title="File Upload" />
                </a></div>

            <div id="open-modal" class="modal-window">
                <div>
                    <label>File Upload</label>
                    <a href="#" title="Close" class="modal-close">
                        X
                    </a>
                    <div>
                        <form class="my-form">
                            <div id="drop-area" for="fileElem" >
                                <label for="fileElem">
                                    <p style={{ textAlign: "center" }}>
                                        <img
                                            class="search-icon"
                                            src={download}
                                            alt="search icon"
                                            width={25}
                                            style={{
                                                color: '#454EBF'
                                            }}
                                        />
                                    </p>

                                    <p>
                                        Drag and Drop Files Here (or) Click Icon to Upload a File
                                    </p>
                                    <input
                                        type="file"
                                        id="fileElem"
                                        multiple
                                        accept="image/*"
                                        onChange="handleFiles(this.files)"
                                    />
                                </label>
                            </div>
                        </form>


                        <div style={{ margin: 10, fontSize: 16 }}>
                            <i class="material-icons" style={{ paddingTop: 10, fontSize: 14, color: 'blue' }}>&#xe88f;</i> <label style={{}}> Supported File Types .xls,.xlsx,.csv</label>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
