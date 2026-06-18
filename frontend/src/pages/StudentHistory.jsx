import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function StudentHistory() {

    const [students, setStudents] =
        useState([]);

    const [history, setHistory] =
        useState([]);

    const [studentId, setStudentId] =
        useState("");

    useEffect(() => {

    fetchStudents();

    if (
        role === "Student"
    ) {

        fetchMyHistory();
    }

}, []);

    const fetchStudents =
        async () => {

            const res =
                await API.get(
                    "/students"
                );

            setStudents(
                res.data
            );
        };
    const fetchMyHistory =
    async () => {

        try {

            const studentRes =
                await API.get(
                    "/students"
                );

            const currentStudent =
                studentRes.data.find(
                    (s) =>
                        s.email ===
                        storedUser.user.email
                );

            if (
                currentStudent
            ) {

                const res =
                    await API.get(

                        `/issues/student/${currentStudent._id}`

                    );

                setHistory(
                    res.data
                );
            }

        } catch (error) {

            console.error(
                error
            );
        }
    };

    const fetchHistory =
        async (id) => {

            try {

                const res =
                    await API.get(
                        `/issues/student/${id}`
                    );

                setHistory(
                    res.data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const storedUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const role =
        storedUser?.user?.role;

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
                    text-white
                    mb-6
                "
            >
                📜 Student History
            </h1>

            {
    role === "Admin" && (

        <div
            className="
                bg-white
                dark:bg-slate-800
                border
                border-slate-700
                rounded-2xl
                shadow-md
                p-6
                mb-6
            "
        >

            <h2
                className="
                    text-xl
                    font-semibold
                    mb-4
                "
            >
                Select Student
            </h2>

            <select
                value={studentId}
                onChange={(e) => {

                    setStudentId(
                        e.target.value
                    );

                    fetchHistory(
                        e.target.value
                    );
                }}
                className="
                    w-full
                    md:w-96
                    border
                    rounded-xl
                    p-3
                    bg-white
                    dark:bg-slate-700
                    dark:text-white
                    dark:border-slate-600
                "
            >

                <option value="">
                    Select Student
                </option>

                {students.map(
                    (student) => (

                        <option
                            key={student._id}
                            value={student._id}
                        >
                            {student.name}
                        </option>

                    )
                )}

            </select>

        </div>

    )
}

            <div
                className="
                    bg-white
                    dark:bg-slate-800
                    border
                    border-slate-700
                    rounded-2xl
                    shadow-md
                    overflow-hidden
                "
            >

                <table
                    className="
                        w-full
                        bg-slate-800
                        text-white
                    "
                >

                    <thead
                        className="
                            bg-slate-900
                            text-white
                        "
                    >

                        <tr>

                            <th className="p-4 text-left">
                                Book
                            </th>

                            <th className="p-4 text-left">
                                Issue Date
                            </th>

                            <th className="p-4 text-left">
                                Due Date
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Fine
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {history.map(
                            (item) => (

                                <tr
                                    key={item._id}
                                    className="
                                        border-b
                                        border-slate-700
                                        hover:bg-slate-700
                                    "
                                >

                                    <td className="p-4">
                                        {item.book?.title}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            item.issueDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            item.dueDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={
                                                item.status ===
                                                "Returned"

                                                    ? "bg-green-600 text-white px-3 py-1 rounded-full text-sm"

                                                    : "bg-yellow-500 text-black px-3 py-1 rounded-full text-sm"
                                            }
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                    <td
                                        className="
                                            p-4
                                            font-semibold
                                            text-red-400
                                        "
                                    >
                                        ₹{item.fine}
                                    </td>

                                </tr>
                            )
                        )}

                        {history.length === 0 && (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="
                                        p-8
                                        text-center
                                        text-gray-400
                                    "
                                >
                                    {
    role === "Admin"
        ? "Select a student to view borrowing history."
        : "No borrowing history found."
}
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
);
}

export default StudentHistory;