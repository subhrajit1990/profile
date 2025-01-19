import React from "react";


const WorkExp = ({ workExp }) => {
    return (

        <div className="work-experience">

            <h2>Work Experience</h2>

            {workExp.map((exp, index) => (
                <div className="experience">
                    <h4>{exp.orgName}</h4>

                    <p><i>{exp.designation}</i></p>
                    <ul>
                        {exp.scope.map((scp, index) => (
                            <li key={index}>{scp}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default WorkExp;