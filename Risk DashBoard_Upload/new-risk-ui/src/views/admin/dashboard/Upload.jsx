import React from "react";
const upload = () => {
    return (
        <div>
            <div style={{ marginTop: 10 }} className="mr-3 mb-2">

                <a href="#open-modal"  >
                    <i class="material-icons" style={{ "font-size": "30px", color: "#6c7383" }} >file_upload</i>
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

                                    </p>

                                    <p>
                                        Drag and Drop Files Here (or) Click Icon to Upload a File
                                    </p>
                                    <input
                                        type="file"
                                        id="fileElem"
                                        accept=".csv"
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

export default upload;
