import React from "react";
import './AuthorInfo.css';

function AuthorInfo(props) {
    const info = props.info;
    const avatar = info.author_avatar;
    const nick = info.author_nick;
    return (
        <div className="author_info">
            <img src={avatar} alt="avatar" className="avatar"/>
            <div className="mid_box">
                <p className="nick">{nick}</p>
                <p className="favor">5.0万本场点赞</p>
            </div>
            <div className="follow">
                关注
            </div>
        </div>
    );

}

export default AuthorInfo;