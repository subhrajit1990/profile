import React from "react";


const ProfileDesc = ({ profileDesc }) => {
    return (
        <div className="profile">
            <h2>Profile</h2>
            <p>
                {profileDesc.desc}
            </p>
        </div>
    )
}
export default ProfileDesc;