import { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if(!formData.name || !formData.email || !formData.password){
            toast.error('Please fill all the fields')
            return;
        }
        if(formData.password.length < 6){
            toast.error('Password must be at least 6 characters')
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
            console.log(response);
            navigate('/login');

        } 
        
        
        catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        } 
    }


  return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">


            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl 
            rounded-2xl p-8 shadow-2xl border border-white/10">


                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>


                <p className="text-gray-300 text-center mt-2">
                    Join NoteFlow and manage your ideas
                </p>



                <form onSubmit={handleSubmit} className="mt-8 space-y-5">


                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg 
                        bg-white/10 border border-white/20 
                        outline-none focus:border-blue-400"
                    />



                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg 
                        bg-white/10 border border-white/20 
                        outline-none focus:border-blue-400"
                    />



                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg 
                        bg-white/10 border border-white/20 
                        outline-none focus:border-blue-400"
                    />



                    <button
                        className="w-full py-3 rounded-lg 
                        bg-blue-500 hover:bg-blue-600 
                        transition font-semibold"
                    >
                        Sign Up
                    </button>


                </form>


                <p className="text-center text-gray-300 mt-6">
                    Already have an account?
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-400 ml-2"
                    >
                        Login
                    </button>

                </p>


            </div>

        </div>
    );
}
