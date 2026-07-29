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

            console.log("API CALL START");

            const response = await axios.get(
                "http://localhost:5000/api/auth/verify",
                {
                    withCredentials: true
                }
            );

            setIsVerified(true);

        } catch (error) {
            setIsVerified(false);
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again");
                navigate("/login");
            }
        }
    };

    verifyToken();

}, []);

    return isVerified ? children : null;
}