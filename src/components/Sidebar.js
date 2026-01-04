import React from "react";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Sidebar = ({ sidebarData }) => {
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
                <h2>Education</h2>
                {sidebarData.education.map((edu, index) => (
                    <p key={index}><strong>{edu.year}</strong><br />{edu.school}<br />{edu.degree || edu.branch || ''}<br />{edu.location || ''}</p>
                ))}
            </div>
            <div className="skills">
                <h2>Skills</h2>
                <ul>
                    {sidebarData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
            <div className="languages">
                <h2>Languages</h2>
                <ul>
                    {sidebarData.languages && sidebarData.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default Sidebar;