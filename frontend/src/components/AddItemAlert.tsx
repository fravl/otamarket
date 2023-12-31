import React from "react";

const AddItemAlert = ({ status, show }: { status: number; show: boolean }) => {
    const clname: string =
        status == 201
            ? "alert alert-success alert-dismissible fade"
            : "alert alert-danger alert-dismissible fade";
    const text: string =
        status == 201
            ? "Successfully added item!"
            : "Error while adding item...";
    return (
        <div className={`${clname}${show ? " show" : ""}`} role="alert">
            {text}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

export default AddItemAlert;
