import { useState, useEffect } from "react";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

function Login() {

    const { login } =
        useAuth();

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    useEffect(() => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {

            navigate(
                "/dashboard"
            );
        }

    }, [navigate]);

    const handleSubmit =
async (e) => {

    e.preventDefault();

    try {

        const res =
            await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

        login({

            token:
                res.data.token,

            user:
                res.data.user
        });

        toast.success(
            `Welcome ${res.data.user.name}`
        );

        navigate(
            "/dashboard"
        );

    } catch (error) {

        if (
            error.response?.status === 400
        ) {

            toast.error(
                "Invalid Email or Password"
            );

        } else {

            toast.error(
                "Server Error. Please try again."
            );
        }

        console.error(
            "LOGIN ERROR:",
            error
        );
    }
};



    return (

        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gray-100
                dark:bg-slate-900
                px-4
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    dark:bg-slate-800
                    rounded-3xl
                    shadow-2xl
                    border
                    border-slate-700
                    p-8
                "
            >

                <h1
                    className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        text-3xl
                        font-bold
                        text-gray-900
                        dark:text-white
                        mb-3
                    "
                >

                    <span>
                        📚
                    </span>

                    Library Login

                </h1>

                <p
                    className="
                        text-center
                        text-gray-500
                        dark:text-gray-400
                        mb-8
                    "
                >
                    Welcome back! Please login
                    to continue.
                </p>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        space-y-5
                    "
                >

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                        className="
                            w-full
                            p-3
                            rounded-xl
                            border
                            dark:bg-slate-700
                            dark:text-white
                            dark:border-slate-600
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                        className="
                            w-full
                            p-3
                            rounded-xl
                            border
                            dark:bg-slate-700
                            dark:text-white
                            dark:border-slate-600
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            py-3
                            rounded-xl
                            shadow-lg
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                        "
                    >

                        Login

                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;