#include "crow.h"

#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

// =========================
// Student Structure
// =========================

struct Student
{
    int id;
    string name;
    string email;
    string course;
    string status;
    string joined;
};

// =========================
// Student Data
// =========================

vector<Student> students =
{
    {1001, "Ahmed Hassan", "ahmed@example.com", "Computer Science", "Active", "Oct 02, 2026"},
    {1002, "Sara Ali", "sara@example.com", "Software Engineering", "Active", "Sep 28, 2026"},
    {1003, "Usman Ahmed", "usman@example.com", "Information Technology", "Pending", "Sep 25, 2026"},
    {1004, "Maria Noor", "maria@example.com", "Web Development", "Active", "Sep 20, 2026"}
};

// =========================
// Read Frontend Files
// =========================

string readFile(const string& filePath)
{
    ifstream file(filePath);

    if (!file.is_open())
    {
        return "";
    }

    stringstream buffer;
    buffer << file.rdbuf();

    return buffer.str();
}

// =========================
// Main
// =========================

int main()
{
    crow::SimpleApp app;

    // =====================================
    // FRONTEND
    // =====================================

    // HTML
    CROW_ROUTE(app, "/")
    ([]()
    {
        string html = readFile("../frontend/index.html");

        if (html.empty())
        {
            return crow::response(404, "index.html not found");
        }

        crow::response res(html);
        res.set_header("Content-Type", "text/html");

        return res;
    });


    // CSS
    CROW_ROUTE(app, "/style.css")
    ([]()
    {
        string css = readFile("../frontend/style.css");

        if (css.empty())
        {
            return crow::response(404, "style.css not found");
        }

        crow::response res(css);
        res.set_header("Content-Type", "text/css");

        return res;
    });


    // JavaScript
    CROW_ROUTE(app, "/script.js")
    ([]()
    {
        string js = readFile("../frontend/script.js");

        if (js.empty())
        {
            return crow::response(404, "script.js not found");
        }

        crow::response res(js);
        res.set_header("Content-Type", "application/javascript");

        return res;
    });


    // =====================================
    // GET ALL STUDENTS
    // =====================================

    CROW_ROUTE(app, "/students")
    .methods(crow::HTTPMethod::GET)
    ([]()
    {
        crow::json::wvalue result;

        for (size_t i = 0; i < students.size(); i++)
        {
            result[i]["id"] = students[i].id;
            result[i]["name"] = students[i].name;
            result[i]["email"] = students[i].email;
            result[i]["course"] = students[i].course;
            result[i]["status"] = students[i].status;
            result[i]["joined"] = students[i].joined;
        }

        return crow::response(result);
    });


    // =====================================
    // ADD STUDENT
    // =====================================

    CROW_ROUTE(app, "/add-student")
    .methods(crow::HTTPMethod::POST)
    ([](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON data");
        }

        Student newStudent;

        // Generate ID
        if (students.empty())
        {
            newStudent.id = 1001;
        }
        else
        {
            newStudent.id = students.back().id + 1;
        }

        newStudent.name = body["name"].s();
        newStudent.email = body["email"].s();
        newStudent.course = body["course"].s();
        newStudent.status = body["status"].s();
        newStudent.joined = body["joined"].s();

        students.push_back(newStudent);

        crow::json::wvalue response;

        response["message"] = "Student added successfully";
        response["id"] = newStudent.id;

        return crow::response(201, response);
    });


    // =====================================
    // UPDATE STUDENT
    // =====================================

    CROW_ROUTE(app, "/update-student")
    .methods(crow::HTTPMethod::PUT)
    ([](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(400, "Invalid JSON data");
        }

        int id = body["id"].i();

        for (auto& student : students)
        {
            if (student.id == id)
            {
                student.name = body["name"].s();
                student.email = body["email"].s();
                student.course = body["course"].s();
                student.status = body["status"].s();

                crow::json::wvalue response;

                response["message"] = "Student updated successfully";

                return crow::response(200, response);
            }
        }

        return crow::response(404, "Student not found");
    });


    // =====================================
    // DELETE STUDENT
    // =====================================

   CROW_ROUTE(app, "/delete-student")
.methods(crow::HTTPMethod::Delete)
([](const crow::request& req)
{
    auto body = crow::json::load(req.body);

    if (!body)
    {
        return crow::response(400, "Invalid JSON data");
    }

    int id = body["id"].i();

    for (auto it = students.begin(); it != students.end(); ++it)
    {
        if (it->id == id)
        {
            students.erase(it);

            crow::json::wvalue response;
            response["message"] = "Student deleted successfully";

            return crow::response(200, response);
        }
    }

    return crow::response(404, "Student not found");
});


    // =====================================
    // SERVER
    // =====================================

    cout << "====================================\n";
    cout << " Student Management System\n";
    cout << "====================================\n";
    cout << "Server running at:\n";
    cout << "http://localhost:18080\n";
    cout << "====================================\n";

    app.port(18080).multithreaded().run();

    return 0;
}