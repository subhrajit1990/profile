import React from "react";


const References = ({ references }) => {
    return (
        <section className="references" aria-labelledby="references-heading">
            <h2 id="references-heading">References</h2>
            <div className="references-items">
                {references.map((ref, index) => (
                    <div key={index} className="reference-item">
                        <p><strong>{ref.name}</strong></p>
                        {ref.company && <p>{ref.company}</p>}
                        {ref.address && <p>{ref.address}</p>}
                        {ref.phone && <p>Phone: {ref.phone}</p>}
                        {ref.email && <p>Email: {ref.email}</p>}
                    </div>
                ))}
            </div>
        </section>
    )
}
export default References;