import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {

    const {
    logout,
    user
} = useAuth();

    const {
        darkMode,
        setDarkMode
    } = useTheme();

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const handleLogout = () => {

        logout();

        navigate("/");
    };

    const linkClass =
        (path) =>

            `px-4 py-3 rounded-lg transition

            ${
                location.pathname === path

                ? "bg-blue-600 text-white"

                : "text-gray-300 hover:bg-slate-700 hover:text-white"
            }`;

    return (

        <div
            className="
                w-64
                min-h-screen
                bg-slate-900
                dark:bg-slate-950
                text-white
                p-5
                flex
                flex-col
                transition-all
            "
        >

            <h1
                className="
                    text-2xl
                    font-bold
                    mb-6
                "
            >
                📚 Library
            </h1>

            <nav
    className="
        flex
        flex-col
        gap-2
    "
>

    <Link
        to="/dashboard"
        className={linkClass(
            "/dashboard"
        )}
    >
        Dashboard
    </Link>

    {
        user?.user?.role === "Admin" && (

            <>

                <Link
                    to="/books"
                    className={linkClass(
                        "/books"
                    )}
                >
                    📚 Books
                </Link>

                <Link
                    to="/students"
                    className={linkClass(
                        "/students"
                    )}
                >
                    👨‍🎓 Students
                </Link>

                <Link
                    to="/users"
                    className={linkClass(
                        "/users"
                    )}
                >
                    👥 Users
                </Link>

                <Link
                    to="/issue-book"
                    className={linkClass(
                        "/issue-book"
                    )}
                >
                    📖 Issue Books
                </Link>

                <Link
                    to="/return-book"
                    className={linkClass(
                        "/return-book"
                    )}
                >
                    🔄 Return Books
                </Link>

                <Link
                    to="/overdue"
                    className={linkClass(
                        "/overdue"
                    )}
                >
                    ⚠️ Overdue Books
                </Link>

            </>

        )
    }

    <Link
        to="/profile"
        className={linkClass(
            "/profile"
        )}
    >
        👤 My Profile
    </Link>

    <Link
        to="/student-history"
        className={linkClass(
            "/student-history"
        )}
    >
        📜 Student History
    </Link>

</nav>

            <div className="mt-auto">

                <button
    onClick={() =>
        setDarkMode(
            !darkMode
        )
    }
    className="
        w-full
        bg-slate-700
        hover:bg-slate-600
        text-white
        rounded-lg
        p-3
        mb-3
    "
>

    {darkMode
    ? "☀️ Switch to Light"
    : "🌙 Switch to Dark"}

</button>
                <button
                    onClick={handleLogout}
                    className="
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        rounded-lg
                        p-3
                    "
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;
