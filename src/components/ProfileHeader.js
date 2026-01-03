import React, { useState, useEffect, useMemo } from "react";

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
        <>
            <div className="profile-header-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1>{profileHeader.name}</h1>
                    <h3>{profileHeader.designation}</h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: 8 }}>Views: <strong>{hits}</strong></div>
                    <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                        <button className="btn" onClick={() => setHits(h => h + 1)}>Hit +</button>
                        <button className="btn" onClick={() => window.print()}>Download PDF</button>
                    </div>
                </div>
            </div>
            <hr className="designationLine" />
        </>
    )
}
export default ProfileHeader;