import React from "react";
import { generateResumePdf } from "../utils/generatePdf";

const ProfileHeader = ({ profileHeader }) => {

    return (
        <header className="profile-header" role="banner">
            <div className="profile-header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    {/* left column reserved for name ribbon via CSS positioning */}
                </div>

                <div style={{ textAlign: 'right' }}>
                    {/* Download button moved to top-right floating control in Resume.js */}
                </div>
            </div>

            <div className="name-ribbon">
                <div className="ribbon">{profileHeader.name}</div>
                <div className="designation">{profileHeader.designation}</div>
            </div>

            <hr className="designationLine" />
        </header>
    )
}
export default ProfileHeader;