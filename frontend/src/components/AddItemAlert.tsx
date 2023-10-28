import React from "react";

const AddItemAlert = ({ status, show }: { status: number, show: boolean }) => {
    const clname: string = status == 204 ? "alert alert-success alert-dismissible fade" : "alert alert-danger alert-dismissible fade";
    const text: string = status == 204 ? "Successfully added item!" : "Error while adding item...";
    console.log(clname);
    console.log(show);
    return (
        <React.Fragment>
            <div className={`${clname}${show ? ' show' : ''}`} role="alert">
                {text}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </React.Fragment>
    )
};

export default AddItemAlert;