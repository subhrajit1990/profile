import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileImage from "../components/ProfileImage";
import References from "../components/References";
import ProfileDesc from "../components/ProfileDesc";
import WorkExp from "../components/WorkExp";


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

            {/* Sidebar */}

            <div className="sidebar">

                <ProfileImage profileImage={data.sidebar.profileImg} />

                <div className="sidebar-section">
                    <Sidebar sidebarData={data.sidebar || sidebarData} />
                </div>
            </div>



            {/* Main Content */}

            <div className="main-content">

                <ProfileHeader profileHeader={data.profileHeader} />

                <ProfileDesc profileDesc={data.profile} />

                <WorkExp workExp={data.workExp} />

                {data.references.length === 0 ? ("No References") : (
                    <References references={data.references} />
                )}

            </div>

        </div>

    );

};



export default Resume;
