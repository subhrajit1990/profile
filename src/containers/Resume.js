import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileImage from "../components/ProfileImage";
import References from "../components/References";
import ProfileDesc from "../components/ProfileDesc";
import WorkExp from "../components/WorkExp";
import { generateResumePdf } from "../utils/generatePdf";


const Resume = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const sidebarData = {
        contact: {
            "phone": "7000000001",
            "email": "xxxxxxxabc@hmail.com",
            "address": "House Number : 90, Lorem Lane",
            "website": "www.demo1.com"
        },
        "education": [
            {
                "year": "2015 - 2019",
                "school": "College ...",
                "branch": "Science"
            },
            {
                "year": "2011 - 2015",
                "school": "High School ...",
                "branch": "Science"
            }
        ],
        "skills": ["react", "HTML", "Spring Boot"],
        "languages": ["English", "Hindi"]
    };

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/data.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Http error ! status : ${response.status}`);
                }
                return response.json();
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
    }, []);

    if (error) {
        return <div> Error: {error} </div>;
    }

    if (!data) {
        return <div> Loading ... </div>;
    }

    return (

        <div className="resume">

            <button className="download-btn" onClick={() => generateResumePdf('.resume', `${(data.profileHeader && data.profileHeader.name) ? data.profileHeader.name.replace(/\s+/g,'_') : 'resume'}.pdf`)} aria-label="Download PDF">Download</button>

            {/* Main Content first in DOM for ATS friendliness */}
            <main className="main-content" role="main">

                <ProfileHeader profileHeader={data.profileHeader} />

                <ProfileDesc profileDesc={data.profile} />

                <WorkExp workExp={data.workExp} />

                {data.references && data.references.length > 0 && (
                    <References references={data.references} />
                )}

            </main>

            {/* Sidebar comes after main content in DOM (still visually can be styled left) */}
            <aside className="sidebar" aria-label="Contact and sidebar">
                <ProfileImage profileImage={data.sidebar.profileImg} profileName={data.profileHeader && data.profileHeader.name} />
                <div className="sidebar-section">
                    <Sidebar sidebarData={data.sidebar || sidebarData} profileName={(data.profileHeader && data.profileHeader.name) || 'default'} />
                </div>
            </aside>

        </div>

    );

};



export default Resume;
