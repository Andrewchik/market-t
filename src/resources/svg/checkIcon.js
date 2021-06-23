import React from "react";

const Check = ({ size = 18, color = "#A08D4E" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ size }
        height={ size }
        viewBox="0 0 24 24"
        fill="none"
        stroke={ color }
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default Check;
