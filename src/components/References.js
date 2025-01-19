import React from "react";


const References = ({ references }) => {
    return ( 
        <div className="references">         
                <h2>References</h2>
                <div className="references-items">
                    {references.map((ref, index) => (
                    <p key={index}>{ref.name}<br />{ref.address}<br />{ref.phone}<br />{ref.email}</p>
                ))}
                </div>
            </div >
    )
}
export default References;