import React, {useEffect, useRef, useState} from "react";
import './Comment.css';

function Comment(props) {
    return (
        <input 
            className="comment"
            placeholder="说点什么..."
            type="text"
            
        >
        </input>
    );
}

export default Comment;