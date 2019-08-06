import React from 'react';




function CreateProject(props) {

    return (
        <button className="sideBtn active" onClick={() => props.edit()} style={{width:100}} >+ Project</button>
    );

}
export default CreateProject