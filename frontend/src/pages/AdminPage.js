import React, { useEffect, useState } from "react";
import SideMenu from "../Components/admin/SideMenu";
import NavBar from "../Components/admin/NavBar";
import AdminRoutes from "../Components/AdminRoutes";
import { useNavigate } from "react-router-dom";
import Loader  from "../Components/Loader";

function AdminPage() {
    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("currentUser"));
    //     if (!user) {
    //         navigate("/login");
    //     } else if (user.userType !== "Admin") {
    //         navigate("/accessdenied");
    //     } else {
    //         setLoading(false);
    //     }
    // }, []);

    return (
        <>
            {loading ? (
                <div className="center" style={{ height: "100vh" }}>
                    <Loader />
                </div>
            ) : (
                <div className="Admin_DashboardContainer">
                    <div className="Admin_SideMenuAndPageContent">
                        <div className="admin_sidebar_container">
                            <SideMenu />
                        </div>
                        <div className="Admin_PageContent">
                            <NavBar />
                            <AdminRoutes />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AdminPage;
