import React from "react";


const ProfileImage = ({ profileImage }) => {
return (
<div className="profile-pic">
    <img src={profileImage} alt="Profile" />
</div>
)
}
export default ProfileImage;