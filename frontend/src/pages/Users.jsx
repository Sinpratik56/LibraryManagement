import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Users() {


const [name, setName] =
    useState("");

const [email, setEmail] =
    useState("");

const [password, setPassword] =
    useState("");

const [role, setRole] =
    useState("Student");

const [users, setUsers] =
    useState([]);

const [search, setSearch] =
    useState("");    

useEffect(() => {

    fetchUsers();

}, []);

const fetchUsers =
    async () => {

        try {

            const res =
                await API.get(
                    "/auth/users"
                );

            setUsers(
                res.data
            );
            

        } catch (error) {

            console.error(
                error
            );
        }
    };

const deleteUser =
    async (id) => {

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        if (
            id ===
            currentUser?.user?.id
        ) {

            alert(
                "You cannot delete your own account"
            );

            return;
        }

        try {

            await API.delete(
                `/auth/users/${id}`
            );

            alert(
                "User Deleted"
            );

            fetchUsers();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };

const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            alert(
                "User Registered Successfully"
            );

            setName("");
            setEmail("");
            setPassword("");
            setRole("Student");

            fetchUsers();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

const filteredUsers =
    users.filter((user) =>

        user.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

        ||

        user.email
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

        ||

        user.role
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );

return (

    <div className="
        flex
        min-h-screen
        bg-gray-100
        dark:bg-slate-900
    ">

        <Sidebar />

        <div className="
            flex-1
            p-8
            text-gray-900
            dark:text-white
        ">

            <h1 className="
                text-4xl
                font-bold
                mb-6
            ">
                👥 User Management
            </h1>

            <div className="
                bg-white
                dark:bg-slate-800
                rounded-2xl
                shadow-md
                p-6
                mb-8
                max-w-xl
            ">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                            dark:bg-slate-700
                        "
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                            dark:bg-slate-700
                        "
                        required
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
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                            dark:bg-slate-700
                        "
                        required
                    />

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                            dark:bg-slate-700
                        "
                    >

                        <option>
                            Student
                        </option>

                        <option>
                            Admin
                        </option>

                    </select>

                    <button
                        type="submit"
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-3
                            rounded-lg
                        "
                    >
                        Create User
                    </button>

                </form>

            </div>

            <div className="
                bg-white
                dark:bg-slate-800
                rounded-2xl
                shadow-md
                overflow-hidden
            ">

            <div className="mb-4">

    <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
            setSearch(
                e.target.value
            )
        }
        className="
            w-full
            md:w-96
            p-3
            border
            rounded-lg
            dark:bg-slate-700
            dark:text-white
        "
    />

</div>

                <table className="w-full">

                    <thead className="
                        bg-slate-800
                        text-white
                    ">

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map(
                            (user) => (

                                <tr
                                    key={user._id}
                                    className="
                                        border-b
                                        dark:border-slate-700
                                    "
                                >

                                    <td className="p-4">
                                        {user.name}
                                    </td>

                                    <td className="p-4">
                                        {user.email}
                                    </td>

                                    <td className="p-4">
                                        {user.role}
                                    </td>

                                    <td className="p-4">

                                        <button
        onClick={() =>
            deleteUser(
                user._id
            )
        }
        className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-3
            py-2
            rounded-lg
        "
    >
        Delete
    </button>

</td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
);


}

export default Users;
