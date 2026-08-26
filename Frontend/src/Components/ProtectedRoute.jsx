import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProtectedRoute({ children }) {

    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {

    const verifyToken = async () => {
        try {

            await axios.get(
                "http://localhost:5000/api/auth/verify",
                {
                    withCredentials: true
                }
            );

            setIsVerified(true);

        } catch (error) {
            console.error("Error verifying token:", error);
        setIsVerified(false);

        if (error.response?.status === 401) {
            toast.error("Session expired. Please login again");
            navigate("/login");
        } 
        else {
            toast.error("Unable to verify session. Please try again.");
            navigate("/login");
        }
    }
    };

    verifyToken();

}, []);

    return isVerified ? children : null;
}