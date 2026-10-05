# Student Resource Finder

Student Resource Finder is a web application that helps students find useful learning resources for programming and technology topics.

Instead of showing only normal search results, the application uses **SerpApi** to search the web and organizes resources into useful categories such as Tutorials, Documentation, GitHub Projects, Videos, Courses, and Practice.

It also provides a simple **Recommended Learning Path** and allows students to save useful resources for later.

## Problem

Students often need to search different websites separately when learning a new technology.

For example, while learning JavaScript, a student may need:

- Tutorials for learning the basics
- Official documentation
- GitHub projects and examples
- Videos
- Online courses
- Practice questions

Finding and organizing all these resources manually can take time.

## Solution

Student Resource Finder brings these resources together in one place.

A student enters a topic such as:

```text
JavaScript
MongoDB
Python
Java
Node.js
```

The application searches the web using **SerpApi** and organizes the results into different categories.

It also provides a simple learning path:

```text
Tutorial
   ↓
Documentation
   ↓
Practice
   ↓
GitHub Projects
   ↓
Advanced Courses
```

## Main Features

### 🔎 Smart Resource Search

Search for any programming or technology topic using SerpApi.

### 📚 Resource Categories

Resources are organized into:

- Tutorials
- Documentation
- GitHub Projects
- Videos
- Courses
- Practice

### 🧠 Recommended Learning Path

The application suggests a simple learning order:

1. Start with a tutorial
2. Read documentation
3. Practice
4. Explore GitHub projects
5. Continue with advanced courses

### 💾 Save Resources

Students can save useful resources and access them later from the **Saved Resources** page.

### 🕘 Search History

The application stores recent searches so students can easily search the same topic again.

### 🔐 API Key Protection

The SerpApi API key is stored in an environment variable and is not included in the public GitHub repository.

## How SerpApi Is Used

SerpApi is the core search component of this project.

When a student searches for a topic, the Node.js backend sends a search request to SerpApi.

Different search queries are created depending on the selected category.

For example:

```text
JavaScript tutorial

JavaScript official documentation

site:github.com JavaScript project

JavaScript tutorial video

JavaScript online course

JavaScript practice questions exercises
```

SerpApi returns web search results. The backend processes these results and displays them in an organized format.

## Technology Stack

### Frontend

- HTML
- CSS
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Search API

- SerpApi Google Search API

## Project Structure

```text
student-resource-finder/
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
├── config/
│   └── db.js
│
├── models/
│   ├── Search.js
│   ├── Resource.js
│   └── SavedResource.js
│
├── services/
│   └── serpApiService.js
│
├── routes/
│   ├── searchRoutes.js
│   └── resourceRoutes.js
│
└── public/
    ├── index.html
    ├── results.html
    ├── saved.html
    │
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── index.js
        ├── results.js
        └── saved.js
```

## How the Application Works

```text
Student
   │
   ▼
Enter Learning Topic
   │
   ▼
Select Category
   │
   ▼
Node.js + Express Backend
   │
   ▼
SerpApi Google Search
   │
   ▼
Process Search Results
   │
   ▼
Organize Resources
   │
   ├── Tutorials
   ├── Documentation
   ├── GitHub
   ├── Videos
   ├── Courses
   └── Practice
   │
   ▼
Display Results
   │
   ├── Save Resource
   └── Recommended Learning Path
   │
   ▼
MongoDB
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sufiyan-mujawar2006/student-resource-finder.git
```

### 2. Open the Project

```bash
cd student-resource-finder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the project root:

```env
PORT=5000
SERPAPI_KEY=YOUR_SERPAPI_KEY
MONGODB_URI=mongodb://127.0.0.1:27017/student_resource_finder
```

Replace `YOUR_SERPAPI_KEY` with your own SerpApi API key.

### 5. Start MongoDB

Make sure MongoDB is running on your computer.

### 6. Start the Application

```bash
node server.js
```

The server will run at:

```text
http://localhost:5000
```

Open the address in your browser.

## Environment Variables

The application uses the following environment variables:

| Variable | Description |
|---|---|
| `PORT` | Port used by the Node.js server |
| `SERPAPI_KEY` | SerpApi API key |
| `MONGODB_URI` | MongoDB database connection string |

The `.env` file is excluded from Git using `.gitignore`.

## Database Collections

The application uses MongoDB to store:

### Search

Stores search history.

### Resource

Stores searched resources and cached results.

### SavedResource

Stores resources saved by the student.

## Future Improvements

Possible future improvements include:

- User accounts and personalized resources
- More advanced recommendation logic
- Better resource ranking
- More learning categories
- Progress tracking
- Personalized learning paths
- Improved mobile experience
- More resource sources

## Hackathon

This project was developed for the **SerpApi India Hackathon 2026**.

The main idea is to use web search data to transform a normal search experience into an organized learning experience for students.

## Project Repository

GitHub:

https://github.com/sufiyan-mujawar2006/student-resource-finder

## License

This project is created for educational and hackathon purposes.