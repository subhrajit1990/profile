import React from "react";


const WorkExp = ({ workExp }) => {
    return (
        <section className="work-experience">
            <h2>Professional Experience</h2>
            {workExp.map((exp, index) => (
                <article className="experience" key={index}>
                    <h3>{exp.orgName}</h3>
                    <p><strong>{exp.designation}</strong></p>
                    {(exp.from || exp.to) && (
                        <p className="dates"><time dateTime={exp.from}>{exp.from}</time> — <time dateTime={exp.to}>{exp.to}</time></p>
                    )}
                    <ul>
                        {(exp.bullets || exp.scope || []).map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </article>
            ))}
        </section>
    )
}
export default WorkExp;