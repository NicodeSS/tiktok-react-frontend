import React from "react";
import './Description.css';

function Description(props) {
    const info = props.info;
    const desc = info.description;
    return (
        <div className="description">{desc}</div>
    );
}

export default Description;