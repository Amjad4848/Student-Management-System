```javascript
/* =========================================================
   STUDENT MANAGEMENT SYSTEM
   Professional Dashboard JavaScript
   ========================================================= */


/* =========================================================
   1. STUDENT DATA
   ========================================================= */

let students = [
    {
        id: "STU-1001",
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        course: "Computer Science",
        status: "Active",
        joined: "Oct 02, 2026",
        initials: "AH"
    },

    {
        id: "STU-1002",
        name: "Sara Ali",
        email: "sara@example.com",
        course: "Software Engineering",
        status: "Active",
        joined: "Sep 28, 2026",
        initials: "SA"
    },

    {
        id: "STU-1003",
        name: "Usman Ahmed",
        email: "usman@example.com",
        course: "Information Technology",
        status: "Pending",
        joined: "Sep 25, 2026",
        initials: "UA"
    },

    {
        id: "STU-1004",
        name: "Maria Noor",
        email: "maria@example.com",
        course: "Web Development",
        status: "Active",
        joined: "Sep 20, 2026",
        initials: "MN"
    }
];


/* =========================================================
   2. DOM ELEMENTS
   ========================================================= */

const tableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("searchInput");

const totalStudents =
    document.getElementById("totalStudents");

const activeStudents =
    document.getElementById("activeStudents");


/* =========================================================
   3. GENERATE STUDENT ID
   ========================================================= */

function generateStudentId() {

    const number =
        1000 + students.length + 1;

    return `STU-${number}`;
}


/* =========================================================
   4. GET INITIALS
   ========================================================= */

function getInitials(name) {

    const words =
        name.trim().split(" ");

    if (words.length === 1) {
        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}


/* =========================================================
   5. RENDER STUDENTS
   ========================================================= */

function renderStudents(data = students) {

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#9ca3af;
                    ">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    data.forEach((student, index) => {

        const row =
            document.createElement("tr");

        const avatarClasses = [
            "avatar-blue",
            "avatar-purple",
            "avatar-green",
            "avatar-orange"
        ];

        const avatarClass =
            avatarClasses[index % avatarClasses.length];


        row.innerHTML = `

            <td>

                <div class="student-info">

                    <div class="student-avatar ${avatarClass}">
                        ${student.initials}
                    </div>

                    <div>
                        <strong>
                            ${student.name}
                        </strong>

                        <span>
                            ${student.email}
                        </span>
                    </div>

                </div>

            </td>


            <td>
                ${student.id}
            </td>


            <td>
                ${student.course}
            </td>


            <td>

                <span class="status ${
                    student.status.toLowerCase()
                }">

                    ${student.status}

                </span>

            </td>


            <td>
                ${student.joined}
            </td>


            <td>

                <button
                    class="action-btn"
                    onclick="showStudentActions(${students.indexOf(student)})"
                    title="Actions"
                >
                    ⋮
                </button>

            </td>

        `;

        tableBody.appendChild(row);
    });


    updateStatistics();
}


/* =========================================================
   6. UPDATE DASHBOARD STATISTICS
   ========================================================= */

function updateStatistics() {

    if (totalStudents) {

        totalStudents.textContent =
            students.length.toLocaleString();
    }


    if (activeStudents) {

        const active =
            students.filter(
                student =>
                    student.status === "Active"
            ).length;

        activeStudents.textContent =
            active.toLocaleString();
    }
}


/* =========================================================
   7. SEARCH STUDENTS
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchValue =
                this.value
                    .toLowerCase()
                    .trim();


            const filteredStudents =
                students.filter(student => {

                    return (

                        student.name
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        student.email
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        student.id
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        student.course
                            .toLowerCase()
                            .includes(searchValue)

                    );
                });


            renderStudents(filteredStudents);
        }
    );
}


/* =========================================================
   8. ADD STUDENT MODAL
   ========================================================= */

function openAddStudentModal() {

    const modal =
        document.createElement("div");

    modal.className =
        "student-modal-overlay";


    modal.innerHTML = `

        <div class="student-modal">

            <div class="modal-header">

                <div>
                    <h2>Add New Student</h2>

                    <p>
                        Enter student information below
                    </p>
                </div>

                <button
                    class="modal-close"
                    id="closeModal"
                >
                    ×
                </button>

            </div>


            <form id="studentForm">


                <div class="form-group">

                    <label>
                        Student Name
                    </label>

                    <input
                        type="text"
                        id="studentName"
                        placeholder="Enter full name"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="studentEmail"
                        placeholder="student@example.com"
                        required
                    >

                </div>


                <div class="form-row">

                    <div class="form-group">

                        <label>
                            Course
                        </label>

                        <select
                            id="studentCourse"
                            required
                        >

                            <option value="">
                                Select Course
                            </option>

                            <option>
                                Computer Science
                            </option>

                            <option>
                                Software Engineering
                            </option>

                            <option>
                                Information Technology
                            </option>

                            <option>
                                Web Development
                            </option>

                            <option>
                                Data Science
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            id="studentStatus"
                        >

                            <option value="Active">
                                Active
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                        </select>

                    </div>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        id="cancelModal"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="save-student-btn"
                    >
                        Add Student
                    </button>

                </div>

            </form>

        </div>
    `;


    document.body.appendChild(modal);


    /* Close modal */

    document
        .getElementById("closeModal")
        .addEventListener(
            "click",
            closeStudentModal
        );


    document
        .getElementById("cancelModal")
        .addEventListener(
            "click",
            closeStudentModal
        );


    /* Submit */

    document
        .getElementById("studentForm")
        .addEventListener(
            "submit",
            addStudent
        );


    /* Close when clicking outside */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeStudentModal();

            }

        }
    );
}


/* =========================================================
   9. CLOSE MODAL
   ========================================================= */

function closeStudentModal() {

    const modal =
        document.querySelector(
            ".student-modal-overlay"
        );

    if (modal) {

        modal.remove();

    }
}


/* =========================================================
   10. ADD NEW STUDENT
   ========================================================= */

function addStudent(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("studentName")
            .value
            .trim();


    const email =
        document
            .getElementById("studentEmail")
            .value
            .trim();


    const course =
        document
            .getElementById("studentCourse")
            .value;


    const status =
        document
            .getElementById("studentStatus")
            .value;


    if (
        !name ||
        !email ||
        !course
    ) {

        alert(
            "Please complete all required fields."
        );

        return;
    }


    const newStudent = {

        id: generateStudentId(),

        name: name,

        email: email,

        course: course,

        status: status,

        joined:
            new Date()
                .toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    }
                ),

        initials:
            getInitials(name)
    };


    students.unshift(newStudent);


    closeStudentModal();


    renderStudents();


    showNotification(
        "Student added successfully!"
    );
}


/* =========================================================
   11. ACTION MENU
   ========================================================= */

function showStudentActions(index) {

    const student =
        students[index];


    const existingMenu =
        document.querySelector(
            ".student-action-menu"
        );


    if (existingMenu) {

        existingMenu.remove();

    }


    const menu =
        document.createElement("div");

    menu.className =
        "student-action-menu";


    menu.innerHTML = `

        <button
            onclick="editStudent(${index})"
        >
            ✏️ Edit Student
        </button>

        <button
            onclick="deleteStudent(${index})"
        >
            🗑️ Delete Student
        </button>

    `;


    document.body.appendChild(menu);


    /* Position menu */

    const button =
        event.currentTarget;

    const rect =
        button.getBoundingClientRect();


    menu.style.top =
        `${rect.bottom + 5}px`;

    menu.style.left =
        `${rect.left - 120}px`;


    /* Close menu */

    setTimeout(() => {

        document.addEventListener(
            "click",
            closeActionMenu,
            {
                once: true
            }
        );

    }, 0);
}


/* =========================================================
   12. CLOSE ACTION MENU
   ========================================================= */

function closeActionMenu(event) {

    const menu =
        document.querySelector(
            ".student-action-menu"
        );


    if (
        menu &&
        !menu.contains(event.target)
    ) {

        menu.remove();

    }
}


/* =========================================================
   13. EDIT STUDENT
   ========================================================= */

function editStudent(index) {

    const student =
        students[index];


    const menu =
        document.querySelector(
            ".student-action-menu"
        );


    if (menu) {

        menu.remove();

    }


    openEditModal(
        student,
        index
    );
}


/* =========================================================
   14. EDIT MODAL
   ========================================================= */

function openEditModal(
    student,
    index
) {

    const modal =
        document.createElement("div");

    modal.className =
        "student-modal-overlay";


    modal.innerHTML = `

        <div class="student-modal">

            <div class="modal-header">

                <div>
                    <h2>Edit Student</h2>

                    <p>
                        Update student information
                    </p>
                </div>

                <button
                    class="modal-close"
                    id="closeEditModal"
                >
                    ×
                </button>

            </div>


            <form id="editStudentForm">

                <div class="form-group">

                    <label>
                        Student Name
                    </label>

                    <input
                        type="text"
                        id="editName"
                        value="${student.name}"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        id="editEmail"
                        value="${student.email}"
                        required
                    >

                </div>


                <div class="form-group">

                    <label>
                        Course
                    </label>

                    <select
                        id="editCourse"
                        required
                    >

                        <option>
                            Computer Science
                        </option>

                        <option>
                            Software Engineering
                        </option>

                        <option>
                            Information Technology
                        </option>

                        <option>
                            Web Development
                        </option>

                        <option>
                            Data Science
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Status
                    </label>

                    <select id="editStatus">

                        <option value="Active">
                            Active
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                    </select>

                </div>


                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        id="cancelEdit"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="save-student-btn"
                    >
                        Save Changes
                    </button>

                </div>

            </form>

        </div>
    `;


    document.body.appendChild(modal);


    document.getElementById(
        "editCourse"
    ).value = student.course;


    document.getElementById(
        "editStatus"
    ).value = student.status;


    document
        .getElementById("closeEditModal")
        .onclick =
        closeStudentModal;


    document
        .getElementById("cancelEdit")
        .onclick =
        closeStudentModal;


    document
        .getElementById("editStudentForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                student.name =
                    document
                        .getElementById("editName")
                        .value
                        .trim();


                student.email =
                    document
                        .getElementById("editEmail")
                        .value
                        .trim();


                student.course =
                    document
                        .getElementById("editCourse")
                        .value;


                student.status =
                    document
                        .getElementById("editStatus")
                        .value;


                student.initials =
                    getInitials(
                        student.name
                    );


                closeStudentModal();

                renderStudents();

                showNotification(
                    "Student updated successfully!"
                );
            }
        );
}


/* =========================================================
   15. DELETE STUDENT
   ========================================================= */

function deleteStudent(index) {

    const student =
        students[index];


    const confirmed =
        confirm(
            `Are; you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    students.splice(index, 1);


    const menu =
        document.querySelector(
            ".student-action-menu"
        );


    if (menu) {

        menu.remove();

    }


    renderStudents();


    showNotification(
        "Student deleted successfully!"
    );
}


/* =========================================================
   16. NOTIFICATION
   ========================================================= */

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "dashboard-notification";


    notification.innerHTML = `

        <span class="notification-check">
            ✓
        </span>

        <span>
            ${message}
        </span>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add(
            "hide"
        );

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2500);
}


/* =========================================================
   17. ADD STUDENT BUTTON
   ========================================================= */

const addStudentButton =
    document.querySelector(
        ".add-student-btn"
    );


if (addStudentButton) {

    addStudentButton.addEventListener(
        "click",
        openAddStudentModal
    );
}


/* =========================================================
   18. QUICK ACTION - ADD STUDENT
   ========================================================= */

const quickActions =
    document.querySelectorAll(
        ".quick-action"
    );


if (quickActions.length > 0) {

    quickActions[0].addEventListener(
        "click",
        openAddStudentModal
    );
}


/* =========================================================
   19. MOBILE SIDEBAR
   ========================================================= */

function createMobileMenuButton() {

    if (
        window.innerWidth > 700
    ) {

        return;

    }


    const existing =
        document.querySelector(
            ".mobile-menu-btn"
        );


    if (existing) {

        return;

    }


    const button =
        document.createElement("button");

    button.className =
        "mobile-menu-btn";

    button.innerHTML =
        "☰";


    document.body.appendChild(
        button
    );


    button.addEventListener(
        "click",
        toggleSidebar
    );
}


function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (sidebar) {

        sidebar.classList.toggle(
            "open"
        );

    }
}


createMobileMenuButton();


/* =========================================================
   20. CLOSE MOBILE SIDEBAR
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const sidebar =
            document.querySelector(
                ".sidebar"
            );

        const menuButton =
            document.querySelector(
                ".mobile-menu-btn"
            );


        if (
            window.innerWidth <= 700 &&
            sidebar &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            event.target !== menuButton
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   21. WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 700
        ) {

            const sidebar =
                document.querySelector(
                    ".sidebar"
                );

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }

    }
);


/* =========================================================
   22. INITIAL RENDER
   ========================================================= */

renderStudents();
