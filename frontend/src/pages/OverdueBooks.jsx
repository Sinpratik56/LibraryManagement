import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function OverdueBooks() {

    const [overdueBooks, setOverdueBooks] =
        useState([]);

    useEffect(() => {

        fetchOverdueBooks();

    }, []);

    const fetchOverdueBooks =
        async () => {

            try {

                const res =
                    await API.get(
                        "/issues/overdue"
                    );

                setOverdueBooks(
                    res.data
                );

            } catch (error) {

                console.error(
                    error
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
                        text-white
                        mb-6
                    "
                >
                    ⚠️ Overdue Books
                </h1>

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
                                    Student
                                </th>

                                <th className="p-4 text-left">
                                    Book
                                </th>

                                <th className="p-4 text-left">
                                    Due Date
                                </th>

                                <th className="p-4 text-left">
                                    Fine
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {overdueBooks.map(
                                (issue) => (

                                    <tr
                                        key={issue._id}
                                        className="
                                            border-b
                                            border-slate-700
                                            bg-slate-800
                                            hover:bg-slate-700
                                        "
                                    >

                                        <td className="p-4 text-white">
                                            {issue.student?.name}
                                        </td>

                                        <td className="p-4 text-white">
                                            {issue.book?.title}
                                        </td>

                                        <td className="p-4 text-white">
                                            {new Date(
                                                issue.dueDate
                                            ).toLocaleDateString()}
                                        </td>

                                        <td
                                            className="
                                                p-4
                                                font-semibold
                                                text-red-400
                                            "
                                        >
                                            ₹{issue.fine}
                                        </td>

                                    </tr>
                                )
                            )}

                            {overdueBooks.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="
                                            p-8
                                            text-center
                                            text-gray-400
                                        "
                                    >
                                        No overdue books found.
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

export default OverdueBooks;