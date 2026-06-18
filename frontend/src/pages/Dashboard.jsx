import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {


    const [stats, setStats] =
        useState(null);

    const storedUser =
        JSON.parse(
            localStorage.getItem(
            "user"
            )
        );

    const role =
        storedUser?.user?.role;

            useEffect(() => {

        const fetchStats =
    async () => {

        try {

            if (
                role === "Admin"
            ) {

                const res =
                    await API.get(
                        "/issues/dashboard/stats"
                    );

                setStats(
                    res.data
                );

            } else {

                const student =
                    await API.get(
                        "/students"
                    );

                

const currentStudent =
    student.data.find(
        (s) =>
            s.email ===
            storedUser.user.email
    );

                if (
                    currentStudent
                ) {

                    const res =
                        await API.get(

                            `/issues/student-dashboard/${currentStudent._id}`

                        );

                    setStats(
                        res.data
                    );
                }
            }

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );
        }
    };

        fetchStats();

    }, []);

    if (!stats) {

        return (

            <div className="flex">

                <Sidebar />

                <div className="
    flex-1
    flex
    items-center
    justify-center
    min-h-screen
    bg-gray-100
    dark:bg-slate-900
">

                    <h2 className="
    text-2xl
    font-semibold
    text-gray-900
    dark:text-white
">
                        Loading...
                    </h2>

                </div>

            </div>

        );
    }

    return (

        <div className="flex bg-gray-100 dark:bg-slate-900 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8 text-gray-900 dark:text-white">

                <div className="mb-8">

                    <h1 className="
    text-4xl
    font-bold
    text-gray-800
    dark:text-white
">

                        Dashboard

                    </h1>

                    <p className="
    text-gray-500
    dark:text-gray-400
    mt-2
">

                        Library Management System Overview

                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

{
role === "Admin"
? (

<>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            📚
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Total Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.totalBooks}
        </p>
    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            👨‍🎓
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Total Students
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.totalStudents}
        </p>
    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            📖
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Issued Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.issuedBooks}
        </p>
    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            ✅
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Returned Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.returnedBooks}
        </p>
    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            ⚠️
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Overdue Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.overdueBooks}
        </p>
    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            💰
        </div>

        <h3 className="text-gray-500 dark:text-gray-300 font-medium">
            Total Fine
        </h3>

        <p className="text-4xl font-bold mt-2">
            ₹ {stats.totalFine}
        </p>
    </div>

</>

)
: (

<>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            📚
        </div>

        <h3>
            Available Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.availableBooks}
        </p>

    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            📖
        </div>

        <h3>
            My Issued Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.myIssuedBooks}
        </p>

    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            💰
        </div>

        <h3>
            My Pending Fine
        </h3>

        <p className="text-4xl font-bold mt-2">
            ₹ {stats.myPendingFine}
        </p>

    </div>

    <div className="
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-md
        p-6
    ">
        <div className="text-4xl mb-3">
            📅
        </div>

        <h3>
            My Due Books
        </h3>

        <p className="text-4xl font-bold mt-2">
            {stats.myDueBooks}
        </p>

    </div>

</>

)
}
                </div>

            </div>

        </div>

    );
}

export default Dashboard;