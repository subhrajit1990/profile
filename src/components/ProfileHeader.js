import React, { useState, useEffect, useMemo } from "react";
import { generateResumePdf } from "../utils/generatePdf";

const ProfileHeader = ({ profileHeader }) => {
    const nameKey = useMemo(() => (profileHeader && profileHeader.name) ? `profile_hits_${encodeURIComponent(profileHeader.name)}` : 'profile_hits_default', [profileHeader]);

    const getInitial = () => {
        try {
            const stored = localStorage.getItem(nameKey);
            if (stored !== null) return parseInt(stored, 10) || 0;
        } catch (e) { }
        return profileHeader && profileHeader.hits ? profileHeader.hits : 0;
    };

    const [hits, setHits] = useState(getInitial);

    useEffect(() => {
        try {
            localStorage.setItem(nameKey, String(hits));
        } catch (e) { }
    }, [hits, nameKey]);

    return (
        <header className="profile-header" role="banner">
            <div className="profile-header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1>{profileHeader.name}</h1>
                    <h2>{profileHeader.designation}</h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: 8 }} aria-hidden>Views: <strong>{hits}</strong></div>
                    <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                        <button className="btn" onClick={() => setHits(h => h + 1)} aria-label="Increment view count">Hit</button>
                        <button className="btn" onClick={() => generateResumePdf('.resume', `${(profileHeader && profileHeader.name) ? profileHeader.name.replace(/\s+/g,'_') : 'resume'}.pdf`)} aria-label="Download PDF">Download</button>
                    </div>
                </div>
            </div>
            <hr className="designationLine" />
        </header>
    )
}
export default ProfileHeader;