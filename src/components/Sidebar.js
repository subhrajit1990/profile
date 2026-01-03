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
                <h2>1. Contact</h2>
                <p><FaPhoneAlt /> {sidebarData.contact.phone}</p>
                <p><FaEnvelope /> {sidebarData.contact.email}</p>
                <p><FaMapMarkerAlt /> {sidebarData.contact.address}</p>
                <p><FaGlobe /> {sidebarData.contact.website}</p>

                {sidebarData.social && (
                    <p className="social-links">
                        {sidebarData.social.linkedin && (<a href={sidebarData.social.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>)}
                        {sidebarData.social.github && (<a href={sidebarData.social.github} target="_blank" rel="noreferrer"><FaGithub /></a>)}
                        {sidebarData.social.twitter && (<a href={sidebarData.social.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>)}
                    </p>
                )}
            </div>
            <div className="education">
                <h2>2. Education</h2>
                {sidebarData.education.map((edu, index) => (
                    <p key={index}><strong>{edu.year}</strong><br />{edu.school}<br />{edu.branch}</p>
                ))}
            </div>
            <div className="skills">
                <h2>3. Skills</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                    <button className="btn" onClick={exportWeights}>Export Weights</button>
                    <button className="btn" onClick={injectJsonLd}>Inject JSON-LD</button>
                </div>
                <ul>
                    {sidebarData.skills.map((skill, index) => {
                        const count = keywordCounts[skill] || 0;
                        const isHot = count >= 3 || topKeywords.includes(skill);
                        return (
                            <li key={index} className={isHot ? 'keyword-hot' : ''} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>{skill} {isHot && <small style={{color: '#b71c1c', marginLeft: 6}}>★</small>}</span>
                                <span style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                                    <small style={{color:'#666'}}>{count}</small>
                                    <button className="hit-btn" onClick={() => hitKeyword(skill)} aria-label={`Hit ${skill}`}>+Hit</button>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="languages">
                <h2>4. Languages</h2>
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