import React from "react";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaSkype, FaInstagram } from "react-icons/fa";

const Sidebar = ({ sidebarData }) => {
    return (
        <aside>
            <div className="contact">
                <h2>Contact</h2>
                <address>
                    <div className="contact-item"><FaMapMarkerAlt className="icon" /> <span>{sidebarData.contact.address}</span></div>
                    <div className="contact-item"><FaPhoneAlt className="icon" /> <a href={`tel:${sidebarData.contact.phone}`}>{sidebarData.contact.phone}</a></div>
                    <div className="contact-item"><FaEnvelope className="icon" /> <a href={`mailto:${sidebarData.contact.email}`}>{sidebarData.contact.email}</a></div>
                </address>
            </div>

            <div className="education">
                <h2>Education</h2>
                <div className="education-list">
                    {sidebarData.education.map((edu, index) => (
                        <div className="edu-item" key={index}>
                            <div className="edu-year">{edu.year}</div>
                            <div className="edu-body">
                                <div className="edu-school">{edu.school}</div>
                                <div className="edu-degree">{edu.degree || edu.branch}</div>
                                {edu.location && <div className="edu-location">{edu.location}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="certificates">
                <h2>Certificates</h2>
                <ul>
                    {(sidebarData.certificates || []).map((c, i) => (
                        <li key={i}><strong>{c.year}</strong> {c.title} <div className="issuer">{c.issuer}</div></li>
                    ))}
                </ul>
            </div>

            <div className="social-media">
                <h2>Social Media</h2>
                <div className="social-list">
                    {sidebarData.social && sidebarData.social.skype && (<div className="social-row"><FaSkype className="icon" /> <span>{sidebarData.social.skype}</span></div>)}
                    {sidebarData.social && sidebarData.social.twitter && (<div className="social-row"><FaTwitter className="icon" /> <span>{sidebarData.social.twitter}</span></div>)}
                    {sidebarData.social && sidebarData.social.linkedin && (<div className="social-row"><FaLinkedin className="icon" /> <span>{sidebarData.social.linkedin}</span></div>)}
                    {sidebarData.social && sidebarData.social.instagram && (<div className="social-row"><FaInstagram className="icon" /> <span>{sidebarData.social.instagram}</span></div>)}
                </div>
            </div>

            <div className="skills">
                <h2>Skills</h2>
                <ul>
                    {sidebarData.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
export default Sidebar;