import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail } from "lucide-react";

import Sidebar from "../../Components/Sidebar";

export default function UserProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

const getProfile = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/user",
      {
        withCredentials: true,
      }
    );

    setUser(response.data.user || response.data.data);

  } catch (error) {

    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again");
      navigate("/login");
    } else {
      toast.error("Unable to fetch profile");
    }

  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getProfile();
  }, []);


if (!user) {
  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

  return (

    <div className="min-h-screen bg-[#0b1120] text-white">

      <Sidebar />


      <main className="ml-0 p-6 md:ml-72 md:p-10">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-400 mt-2">
            View your account information.
          </p>

        </div>


        <div className="max-w-3xl">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">

            <div className="flex items-center gap-5 pb-8 border-b border-white/10">

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/20">

                {user.name?.charAt(0).toUpperCase()}

              </div>


              <div>

                <h2 className="text-2xl font-semibold">
                  {user.name}
                </h2>

                <p className="text-gray-400 mt-1">
                  {user.email}
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-6">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">

                  <User size={20} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-1 font-medium">
                    {user.name}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">

                  <Mail size={20} />

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Email Address
                  </p>

                  <p className="mt-1 font-medium">
                    {user.email}
                  </p>

                </div>

              </div>


            </div>

          </div>

        </div>

      </main>

    </div>

  );
}