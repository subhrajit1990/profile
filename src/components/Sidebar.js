import React from "react";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const Sidebar = ({ sidebarData }) => {
    return (
        <>
            <div className="contact">
                <h2>Contact</h2>
                <p><FaPhoneAlt /> {sidebarData.contact.phone}</p>
                <p><FaEnvelope /> {sidebarData.contact.email}</p>
                <p><FaMapMarkerAlt /> {sidebarData.contact.address}</p>
                <p><FaGlobe /> {sidebarData.contact.website}</p>
            </div>
            <div className="education">
                <h2>Education</h2>
                {sidebarData.education.map((edu, index) => (
                    <p key={index}><strong>{edu.year}</strong><br />{edu.school}<br />{edu.branch}</p>
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
                <h2>languages</h2>
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