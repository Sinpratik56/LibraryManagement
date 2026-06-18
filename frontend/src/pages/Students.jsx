
import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Students() {

    const [students, setStudents] =
        useState([]);

    const [formData, setFormData] =
        useState({
            studentId: "",
            name: "",
            department: "",
            email: "",
            phone: ""
        });

    const [editingStudent, setEditingStudent] =
        useState(null);

    const fetchStudents =
        async () => {

            try {

                const res =
                    await API.get(
                        "/students"
                    );

                setStudents(
                    res.data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    useEffect(() => {

        fetchStudents();

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    const addStudent =
        async (e) => {

            e.preventDefault();

            try {

                await API.post(
                    "/students",
                    formData
                );

                alert(
                    "Student Added"
                );

                setFormData({

                    studentId: "",
                    name: "",
                    department: "",
                    email: "",
                    phone: ""
                });

                fetchStudents();

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Failed To Add Student"
                );
            }
        };

    const startEdit = (
        student
    ) => {

        setEditingStudent({
            ...student
        });
    };

    const updateStudent =
        async (e) => {

            e.preventDefault();

            try {

                await API.put(

                    `/students/${editingStudent._id}`,

                    {
                        studentId:
                            editingStudent.studentId,

                        name:
                            editingStudent.name,

                        department:
                            editingStudent.department,

                        email:
                            editingStudent.email,

                        phone:
                            editingStudent.phone
                    }

                );

                alert(
                    "Student Updated"
                );

                setEditingStudent(
                    null
                );

                fetchStudents();

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Update Failed"
                );
            }
        };

    const deleteStudent =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete this student?"
                );

            if (!confirmDelete)
                return;

            try {

                await API.delete(
                    `/students/${id}`
                );

                alert(
                    "Student Deleted"
                );

                fetchStudents();

            } catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Delete Failed"
                );
            }
        };
        const [searchTerm, setSearchTerm] = useState("");
    return (

    <div className="
    flex
    min-h-screen
    bg-gray-100
    dark:bg-slate-900
">

        <Sidebar />

        <div className="flex-1 p-8 text-gray-900 dark:text-white">

            <h1 className="
    text-4xl
    font-bold
    text-white
    mb-6
">
                👨‍🎓 Students Management
            </h1>

            {editingStudent && (

                <form
                    onSubmit={updateStudent}
                    className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
        mb-6
    "
                >

                    <h2 className="text-2xl font-bold mb-4">
                        Edit Student
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
                            value={editingStudent.studentId}
                            onChange={(e) =>
                                setEditingStudent({
                                    ...editingStudent,
                                    studentId: e.target.value
                                })
                            }
                            placeholder="Student ID"
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
                            value={editingStudent.name}
                            onChange={(e) =>
                                setEditingStudent({
                                    ...editingStudent,
                                    name: e.target.value
                                })
                            }
                            placeholder="Name"
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
                            value={editingStudent.department}
                            onChange={(e) =>
                                setEditingStudent({
                                    ...editingStudent,
                                    department: e.target.value
                                })
                            }
                            placeholder="Department"
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
                            value={editingStudent.email}
                            onChange={(e) =>
                                setEditingStudent({
                                    ...editingStudent,
                                    email: e.target.value
                                })
                            }
                            placeholder="Email"
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
                            value={editingStudent.phone}
                            onChange={(e) =>
                                setEditingStudent({
                                    ...editingStudent,
                                    phone: e.target.value
                                })
                            }
                            placeholder="Phone"
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
                                setEditingStudent(null)
                            }
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            )}

            <form
                onSubmit={addStudent}
                className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
        mb-6
    "
            >

                <h2 className="text-2xl font-bold mb-4">
                    Add New Student
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
                        name="studentId"
                        placeholder="Student ID"
                        value={formData.studentId}
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
                        name="name"
                        placeholder="Name"
                        value={formData.name}
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
                        name="department"
                        placeholder="Department"
                        value={formData.department}
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
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg"
                >
                    Add Student
                </button>

            </form>

            <input
                type="text"
                placeholder="🔍 Search students..."
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

            <div className="bg-white dark:bg-slate-800 border border-slate-700">

                <table className="w-full bg-white dark:bg-slate-800 border border-slate-700">

                    <thead className="bg-slate-800 text-white">

                        <tr>

                            <th className="p-4 text-left">
                                Student ID
                            </th>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Department
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Phone
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="dark:bg-slate-800">

                        {students

                            .filter(
                                (student) =>

                                    student.name
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )

                                    ||

                                    student.studentId
                                        ?.toLowerCase()
                                        .includes(
                                            searchTerm.toLowerCase()
                                        )
                            )

                            .map(
                                (student) => (

                                    <tr
                                        key={student._id}
                                        className="
    border-b
    hover:bg-gray-50
    dark:hover:bg-slate-700
"
                                    >

                                        <td className="p-4 dark:text-white">
                                            {student.studentId}
                                        </td>

                                        <td className="p-4 dark:text-white">
                                            {student.name}
                                        </td>

                                        <td className="p-4 dark:text-white">
                                            {student.department}
                                        </td>

                                        <td className="p-4 dark:text-white">
                                            {student.email}
                                        </td>

                                        <td className="p-4 dark:text-white">
                                            {student.phone}
                                        </td>

                                        <td className="p-4 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    startEdit(student)
                                                }
                                                className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteStudent(
                                                        student._id
                                                    )
                                                }
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg"
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

export default Students;
