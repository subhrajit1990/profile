import React, { useState, useEffect, useMemo } from "react";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Sidebar = ({ sidebarData, profileName = 'default' }) => {
    const storageKey = useMemo(() => `keyword_hits_${profileName.replace(/\s+/g, '_')}`, [profileName]);
    const [keywordCounts, setKeywordCounts] = useState({});

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) setKeywordCounts(JSON.parse(raw));
        } catch (e) { }
    }, [storageKey]);

    const persist = (next) => {
        setKeywordCounts(next);
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch (e) { }
    };

    const hitKeyword = (keyword) => {
        persist({ ...keywordCounts, [keyword]: (keywordCounts[keyword] || 0) + 1 });
    };

    const topKeywords = useMemo(() => {
        const entries = Object.entries(keywordCounts);
        entries.sort((a, b) => b[1] - a[1]);
        return entries.slice(0, 3).map(e => e[0]);
    }, [keywordCounts]);

    const exportWeights = () => {
        const payload = {
            profile: profileName,
            generatedAt: new Date().toISOString(),
            weights: { ...(keywordCounts) }
        };

        // Download as JSON file
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${profileName.replace(/\s+/g, '_')}_keyword_weights.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const injectJsonLd = () => {
        const skills = Object.keys(keywordCounts).map(k => ({
            '@type': 'DefinedTerm',
            'name': k,
            'termCode': String(keywordCounts[k] || 0)
        }));

        const ld = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            'name': profileName,
            'hasOccupation': sidebarData.contact && sidebarData.contact.website ? sidebarData.contact.website : undefined,
            'knowsAbout': skills
        };

        // Remove previous injected script if present
        const existing = document.getElementById('keyword-weights-jsonld');
        if (existing) existing.remove();

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'keyword-weights-jsonld';
        script.text = JSON.stringify(ld);
        document.head.appendChild(script);
        // Notify user briefly
        alert('JSON-LD injected into page head (for crawlers that execute JS).');
    };
    return (
        <>
            <div className="contact">
                <h2>Contact</h2>
                <address>
                    <div><FaPhoneAlt /> <a href={`tel:${sidebarData.contact.phone}`}>{sidebarData.contact.phone}</a></div>
                    <div><FaEnvelope /> <a href={`mailto:${sidebarData.contact.email}`}>{sidebarData.contact.email}</a></div>
                    <div><FaMapMarkerAlt /> <span>{sidebarData.contact.address}</span></div>
                    <div><FaGlobe /> <a href={sidebarData.contact.website} target="_blank" rel="noreferrer">{sidebarData.contact.website}</a></div>
                </address>

                {sidebarData.social && (
                    <div className="social-links">
                        {sidebarData.social.linkedin && (<a href={sidebarData.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>)}
                        {sidebarData.social.github && (<a href={sidebarData.social.github} target="_blank" rel="noreferrer">GitHub</a>)}
                        {sidebarData.social.twitter && (<a href={sidebarData.social.twitter} target="_blank" rel="noreferrer">Twitter</a>)}
                        {sidebarData.social.instagram && (<a href={`https://instagram.com/${sidebarData.social.instagram.replace(/^@/, '')}`} target="_blank" rel="noreferrer">Instagram</a>)}
                    </div>
                )}
            </div>
            <div className="education">
                <h2>2. Education</h2>
                {sidebarData.education.map((edu, index) => (
                    <p key={index}><strong>{edu.year}</strong><br />{edu.school}<br />{edu.branch}</p>
                ))}
            </div>
            <div className="skills">
                <h2>Skills</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                    <button className="btn" onClick={exportWeights}>Export Weights</button>
                    <button className="btn" onClick={injectJsonLd}>Inject JSON-LD</button>
                </div>
                <ul>
                    {sidebarData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
            <div className="languages">
                <h2>Languages</h2>
                <ul>
                    {sidebarData.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
            </div>
        </>

    )
}
export default Sidebar;