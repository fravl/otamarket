import React, { useState } from "react";

const submitButton = ({ loading }: { loading: boolean }) => {
    const text: string = loading ? "Sending item..." : "Add Item";
    return (
        <button type="submit" name="submitButton" className="btn btn-primary w-100" disabled={loading}>
            <span className={`spinner-border spinner-border-sm ${loading ? 'd-block' : 'd-none'}`} id="loadingSpinner" role="status" aria-hidden="true"></span>
            {text}
        </button>
    )
};

export default submitButton;