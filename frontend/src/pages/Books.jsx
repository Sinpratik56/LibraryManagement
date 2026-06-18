import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


function Books() {
    const [loading, setLoading] =
    useState(true);

    const [books, setBooks] =
        useState([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [formData, setFormData] =
        useState({
            title: "",
            author: "",
            category: "",
            isbn: "",
            totalQuantity: ""
        });

    const [editingBook, setEditingBook] =
        useState(null);

    const fetchBooks =
    async () => {

        try {

            setLoading(true);

            const res =
                await API.get(
                    "/books"
                );

            setBooks(
                res.data
            );

        } catch (error) {

            console.error(
                error
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchBooks();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    const addBook =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/books",
                    formData
                );

                toast.success(
    "Book Added Successfully"
);

                setFormData({
                    title: "",
                    author: "",
                    category: "",
                    isbn: "",
                    totalQuantity: ""
                });

                fetchBooks();

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed To Add Book"
                );
            }
        };

    const startEdit = (book) => {

        setEditingBook({
            ...book
        });
    };

    const updateBook =
        async (e) => {

            e.preventDefault();

            try {

                await API.put(

                    `/books/${editingBook._id}`,

                    {
                        title:
                            editingBook.title,

                        author:
                            editingBook.author,

                        category:
                            editingBook.category,

                        isbn:
                            editingBook.isbn,

                        totalQuantity:
                            editingBook.totalQuantity
                    }

                );

                toast.success(
    "Book Updated Successfully"
);

                setEditingBook(
                    null
                );

                fetchBooks();

            } catch (error) {

                toast.error(
    error.response?.data?.message ||
    "Operation Failed"
);
            }
        };

    const deleteBook =
        async (id) => {

            const result =
    await Swal.fire({

        title:
            "Delete Book?",

        text:
            "This action cannot be undone.",

        icon:
            "warning",

        showCancelButton:
            true,

        confirmButtonColor:
            "#dc2626",

        cancelButtonColor:
            "#64748b",

        confirmButtonText:
            "Delete"
    });

if (!result.isConfirmed)
    return;

            try {

                await API.delete(
                    `/books/${id}`
                );

                toast.success(
    "Book Deleted Successfully"
);

                fetchBooks();

            } catch (error) {

                toast.error(
    error.response?.data?.message ||
    "Delete Failed"
);
            }
        };
if (loading) {

    return (

        <div className="
            flex
            items-center
            justify-center
            min-h-screen
            bg-gray-100
            dark:bg-slate-900
        ">

            <div
                className="
                    animate-spin
                    rounded-full
                    h-16
                    w-16
                    border-b-4
                    border-blue-600
                "
            />

        </div>
    );
}
    return (

    <div className="
    flex
    min-h-screen
    bg-gray-100
    dark:bg-slate-900
">

        <Sidebar />

        <div className="flex-1 p-8 text-gray-900 dark:text-white">

            <h1 className="text-4xl
                font-bold
                text-gray-800
                dark:text-white mb-6">
                📚 Books Management
            </h1>

            {editingBook && (

                <form
                    onSubmit={updateBook}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6"
                >

                    <h2 className="text-2xl font-bold mb-4 dark:text-white">
                        Edit Book
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">

                        <input
                            className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                            value={editingBook.title}
                            onChange={(e) =>
                                setEditingBook({
                                    ...editingBook,
                                    title: e.target.value
                                })
                            }
                            placeholder="Title"
                        />

                        <input
                            className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                            value={editingBook.author}
                            onChange={(e) =>
                                setEditingBook({
                                    ...editingBook,
                                    author: e.target.value
                                })
                            }
                            placeholder="Author"
                        />

                        <input
                            className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                            value={editingBook.category}
                            onChange={(e) =>
                                setEditingBook({
                                    ...editingBook,
                                    category: e.target.value
                                })
                            }
                            placeholder="Category"
                        />

                        <input
                            className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                            value={editingBook.isbn}
                            onChange={(e) =>
                                setEditingBook({
                                    ...editingBook,
                                    isbn: e.target.value
                                })
                            }
                            placeholder="ISBN"
                        />

                        <input
                            type="number"
                            className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                            value={editingBook.totalQuantity}
                            onChange={(e) =>
                                setEditingBook({
                                    ...editingBook,
                                    totalQuantity: e.target.value
                                })
                            }
                            placeholder="Quantity"
                        />

                    </div>

                    <div className="mt-4 flex gap-2">

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setEditingBook(null)
                            }
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            )}

            <form
                onSubmit={addBook}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6"
            >

                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    Add New Book
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">

                    <input
                        className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        name="author"
                        placeholder="Author"
                        value={formData.author}
                        onChange={handleChange}
                    />

                    <input
                        className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <input
                        className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        name="isbn"
                        placeholder="ISBN"
                        value={formData.isbn}
                        onChange={handleChange}
                    />

                    <input
                        className="
    border
    rounded-lg
    p-3
    dark:bg-slate-700
    dark:text-white
    dark:border-slate-600
"
                        name="totalQuantity"
                        type="number"
                        placeholder="Quantity"
                        value={formData.totalQuantity}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg"
                >
                    Add Book
                </button>

            </form>

            <input
                type="text"
                placeholder="🔍 Search by title or author..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
                className="
    w-full
    md:w-96
    border
    rounded-xl
    p-3
    mb-6
    bg-white
    dark:bg-slate-800
    dark:text-white
    dark:border-slate-600
"
            />

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-800 text-white">

                        <tr>

                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Author</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Available</th>
                            <th className="p-4 text-left">Total</th>
                            <th className="p-4 text-left">Actions</th>

                        </tr>

                    </thead>

                    <tbody>
                        {books.length === 0 && (

    <tr>

        <td
            colSpan="6"
            className="
                p-8
                text-center
                text-gray-500
            "
        >

            No books found.

        </td>

    </tr>
)}
                        {books

                            .filter(
                                (book) =>

                                    book.title
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )

                                    ||

                                    book.author
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )
                            )

                            .map(
                                (book) => (

                                    <tr
                                        key={book._id}
                                        className="
    border-b
    hover:bg-gray-50
    dark:hover:bg-slate-700
"
                                    >

                                        <td className="p-4">
                                            {book.title}
                                        </td>

                                        <td className="p-4">
                                            {book.author}
                                        </td>

                                        <td className="p-4">
                                            {book.category}
                                        </td>

                                        <td className="p-4">
                                            {book.availableQuantity}
                                        </td>

                                        <td className="p-4">
                                            {book.totalQuantity}
                                        </td>

                                        <td className="p-4 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    startEdit(book)
                                                }
                                                className="
    bg-yellow-500
    hover:bg-yellow-600
    text-white
    px-4
    py-2
    rounded-lg
    transition
"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteBook(book._id)
                                                }
                                                className="
    bg-red-600
    hover:bg-red-700
    text-white
    px-4
    py-2
    rounded-lg
    transition
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

export default Books;
