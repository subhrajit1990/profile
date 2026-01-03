import React from "react";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Sidebar = ({ sidebarData }) => {
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
                <ul>
                    {sidebarData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
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