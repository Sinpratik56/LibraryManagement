import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function Profile() {

    const { user } = useAuth();

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const handlePasswordChange =
        async (e) => {

            e.preventDefault();

            try {

                await API.put(
                    "/auth/change-password",
                    {
                        email:
                            user?.user?.email,

                        currentPassword,

                        newPassword
                    }
                );

                alert(
                    "Password Changed Successfully"
                );

                setCurrentPassword("");
                setNewPassword("");

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Password Change Failed"
                );
            }
        };

    return (

        <div
            className="
                flex
                min-h-screen
                bg-gray-100
                dark:bg-slate-900
            "
        >

            <Sidebar />

            <div
                className="
                    flex-1
                    p-8
                    text-gray-900
                    dark:text-white
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-8
                    "
                >
                    👤 My Profile
                </h1>

                {/* Profile Card */}

                <div
                    className="
                        bg-white
                        dark:bg-slate-800
                        rounded-2xl
                        shadow-md
                        p-6
                        max-w-xl
                        mb-6
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-4
                        "
                    >
                        Profile Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="font-semibold">
                                Name
                            </p>

                            <p className="text-gray-600 dark:text-gray-300">
                                {user?.user?.name}
                            </p>

                        </div>

                        <div>

                            <p className="font-semibold">
                                Email
                            </p>

                            <p className="text-gray-600 dark:text-gray-300">
                                {user?.user?.email}
                            </p>

                        </div>

                        <div>

                            <p className="font-semibold">
                                Role
                            </p>

                            <p className="text-gray-600 dark:text-gray-300">
                                {user?.user?.role}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Change Password Card */}

                <div
                    className="
                        bg-white
                        dark:bg-slate-800
                        rounded-2xl
                        shadow-md
                        p-6
                        max-w-xl
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-4
                        "
                    >
                        🔐 Change Password
                    </h2>

                    <form
                        onSubmit={
                            handlePasswordChange
                        }
                        className="space-y-4"
                    >

                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-3
                                border
                                rounded-lg
                                dark:bg-slate-700
                                dark:border-slate-600
                            "
                            required
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-3
                                border
                                rounded-lg
                                dark:bg-slate-700
                                dark:border-slate-600
                            "
                            required
                        />

                        <button
                            type="submit"
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                transition
                            "
                        >
                            Update Password
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Profile;