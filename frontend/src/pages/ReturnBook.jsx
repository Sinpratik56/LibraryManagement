import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

function ReturnBook() {

    const [issues, setIssues] =
        useState([]);

    useEffect(() => {

        fetchIssues();

    }, []);

    const fetchIssues =
        async () => {

            try {

                const res =
                    await API.get(
                        "/issues"
                    );

                const activeIssues =
                    res.data.filter(
                        (issue) =>
                            issue.status ===
                            "Issued"
                    );

                setIssues(
                    activeIssues
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const returnBook =
        async (issueId) => {

            try {

                await API.put(
                    `/issues/return/${issueId}`
                );

                toast.success(
    "Book Returned Successfully"
);

                fetchIssues();

            } catch (error) {

                toast.error(
    error.response?.data?.message ||
    "Return Failed"
);
            }
        };

    return (

    <div className="
    flex
    min-h-screen
    bg-gray-100
    dark:bg-slate-900
">

        <Sidebar />

        <div className="flex-1 p-8 text-gray-900 dark:text-white">

            <h1 className="text-4xl font-bold text-white mb-6">
                🔄 Return Books
            </h1>

            <div className="
    bg-white dark:bg-slate-800 border border-slate-700
">

                <table className="w-full">

                    <thead className="bg-slate-800 text-white">

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
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {issues.map(
                            (issue) => (

                                <tr
                                    key={issue._id}
                                    className="
    border-b hover:bg-gray-50 dark:hover:bg-slate-700
"
                                >

                                    <td className="p-4">
                                        {issue.student?.name}
                                    </td>

                                    <td className="p-4">
                                        {issue.book?.title}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            issue.dueDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                returnBook(
                                                    issue._id
                                                )
                                            }
                                            className="
                                                bg-green-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                hover:bg-green-700
                                            "
                                        >
                                            Return
                                        </button>

                                    </td>

                                </tr>
                            )
                        )}

                        {issues.length === 0 && (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="
                                        p-8
                                        text-center
                                        text-gray-500
                                    "
                                >
                                    No books currently issued.
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

export default ReturnBook;