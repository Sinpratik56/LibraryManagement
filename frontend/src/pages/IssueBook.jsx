import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function IssueBook() {
    
    const [books, setBooks] =
        useState([]);

    const [students, setStudents] =
        useState([]);

    const [bookId, setBookId] =
        useState("");

    const [studentId, setStudentId] =
        useState("");

    useEffect(() => {

        fetchBooks();
        fetchStudents();

    }, []);

    const fetchBooks =
        async () => {

            const res =
                await API.get("/books");

            setBooks(
                res.data
            );
        };

    const fetchStudents =
        async () => {

            const res =
                await API.get("/students");

            setStudents(
                res.data
            );
        };

    const handleIssue =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/issues",
                    {
                        bookId,
                        studentId
                    }
                );

                alert(
                    "Book Issued Successfully"
                );

                setBookId("");
                setStudentId("");

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Issue Failed"
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
                📖 Issue Book
            </h1>

            <div className="
    bg-white
    dark:bg-slate-800
    border
    border-slate-700
    rounded-2xl
    shadow-md
    p-8
    max-w-2xl
">

                <h2 className="text-2xl font-bold mb-6">
                    Issue a Book
                </h2>

                <form
                    onSubmit={handleIssue}
                    className="space-y-4"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Select Book
                        </label>

                        <select
                            value={bookId}
                            onChange={(e) =>
                                setBookId(
                                    e.target.value
                                )
                            }
                            className="
    w-full
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        >

                            <option value="">
                                Select Book
                            </option>

                            {books.map(
                                (book) => (

                                    <option
                                        key={book._id}
                                        value={book._id}
                                    >
                                        {book.title}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Select Student
                        </label>

                        <select
    value={studentId}
    onChange={(e) =>
        setStudentId(
            e.target.value
        )
    }
    className="
    w-full
    border
    rounded-lg
    p-3
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

<button
    type="submit"
    className="
        w-full
        bg-blue-600
        text-white
        py-3
        rounded-lg
        hover:bg-blue-700
    "
>
    Issue Book
</button>

</form>

</div>

</div>

</div>
);
}

export default IssueBook;