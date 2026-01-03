import React from "react";


const ProfileDesc = ({ profileDesc }) => {
    return (
        <div className="profile">
            <h2>Profile</h2>
            {profileDesc.summary && <p className="summary"><strong>Summary:</strong> {profileDesc.summary}</p>}
            <p>{profileDesc.desc}</p>
        </div>
    )
}
export default ProfileDesc;