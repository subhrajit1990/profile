import React from "react";


const ProfileHeader = ({ profileHeader }) => {
    return (
        <>
            <h1>{profileHeader.name}</h1>
            <h3>{profileHeader.designation}</h3>
            <hr className="designationLine" />
        </>
    )
}
export default ProfileHeader;