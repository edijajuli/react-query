import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <h2>SingleProduct - {id}</h2>
            <button onClick={handleBack}>Go Back</button>
        </div>
    );
};

export default SingleProduct;
