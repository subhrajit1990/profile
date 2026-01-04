import React from "react";


const ProfileDesc = ({ profileDesc }) => {
    return (
        <section className="profile" aria-labelledby="profile-heading">
            <h2 id="profile-heading">Profile</h2>
            {profileDesc.summary && <p className="summary"><strong>Summary: </strong>{profileDesc.summary}</p>}
            {profileDesc.desc && <p>{profileDesc.desc}</p>}
        </section>
    )
}
export default ProfileDesc;