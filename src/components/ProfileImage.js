import React from "react";


const ProfileImage = ({ profileImage, profileName }) => {
return (
    <figure className="profile-pic">
        <img src={profileImage} alt={profileName ? `${profileName} photo` : 'Profile'} />
        {profileName && <figcaption style={{position: 'absolute', left: '-9999px'}}>{profileName}</figcaption>}
    </figure>
)
}
export default ProfileImage;