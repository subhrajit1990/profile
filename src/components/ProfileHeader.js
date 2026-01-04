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
                    <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                        <button className="btn" onClick={() => generateResumePdf('.resume', `${(profileHeader && profileHeader.name) ? profileHeader.name.replace(/\s+/g,'_') : 'resume'}.pdf`)} aria-label="Download PDF">Download</button>
                    </div>
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