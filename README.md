\# Student Resource Finder



Student Resource Finder is a web application that helps students find useful learning resources for any programming or technology topic.



Instead of showing only normal search results, the application uses \*\*SerpApi\*\* to search the web and organizes the results into useful learning categories such as Tutorials, Documentation, GitHub Projects, Videos, Courses, and Practice.



It also provides a simple \*\*Recommended Learning Path\*\* and allows students to save useful resources for later.



\## Problem



Students often search different websites separately when learning a new technology.



For example, while learning JavaScript, a student may need:



\- Tutorials for learning the basics

\- Official documentation for concepts

\- GitHub projects for examples

\- Videos for visual learning

\- Courses for detailed learning

\- Practice questions for improving skills



Finding and organizing all these resources manually can take time.



\## Solution



Student Resource Finder brings these resources together in one place.



A student enters a topic such as:



```text

JavaScript

MongoDB

Python

Java

Node.js

```



The application searches the web using SerpApi and organizes the results into different categories.



The application also creates a simple learning path:



```text

Tutorial

&#x20;  ↓

Documentation

&#x20;  ↓

Practice

&#x20;  ↓

GitHub Projects

&#x20;  ↓

Advanced Courses

```



\## Main Features



\### 🔎 Smart Resource Search



Search for any programming or technology topic using SerpApi.



\### 📚 Resource Categories



Search results can be organized into:



\- Tutorials

\- Documentation

\- GitHub Projects

\- Videos

\- Courses

\- Practice



\### 🧠 Recommended Learning Path



The application suggests a simple order for learning:



1\. Start with a tutorial

2\. Read documentation

3\. Practice

4\. Explore GitHub projects

5\. Continue with advanced courses



\### 💾 Save Resources



Students can save useful resources and access them later from the Saved Resources page.



\### 🕘 Search History



The application stores recent searches so students can easily search the same topic again.



\### 🔐 API Key Protection



The SerpApi API key is stored in an environment variable and is not included in the public GitHub repository.



\## How SerpApi Is Used



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



SerpApi returns web search results, which are then processed by the backend and displayed in an organized format.



\## Technology Stack



\### Frontend



\- HTML

\- CSS

\- Vanilla JavaScript



\### Backend



\- Node.js

\- Express.js



\### Database



\- MongoDB

\- Mongoose



\### Search API



\- SerpApi Google Search API



\## Project Structure



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

&#x20;   ├── index.html

&#x20;   ├── results.html

&#x20;   ├── saved.html

&#x20;   │

&#x20;   ├── css/

&#x20;   │   └── style.css

&#x20;   │

&#x20;   └── js/

&#x20;       ├── index.js

&#x20;       ├── results.js

&#x20;       └── saved.js

```



\## How the Application Works



```text

Student

&#x20;  │

&#x20;  ▼

Enter Learning Topic

&#x20;  │

&#x20;  ▼

Select Category

&#x20;  │

&#x20;  ▼

Node.js + Express Backend

&#x20;  │

&#x20;  ▼

SerpApi Google Search

&#x20;  │

&#x20;  ▼

Process Search Results

&#x20;  │

&#x20;  ▼

Organize Resources

&#x20;  │

&#x20;  ├── Tutorials

&#x20;  ├── Documentation

&#x20;  ├── GitHub

&#x20;  ├── Videos

&#x20;  ├── Courses

&#x20;  └── Practice

&#x20;  │

&#x20;  ▼

Display Results

&#x20;  │

&#x20;  ├── Save Resource

&#x20;  └── Recommended Learning Path

&#x20;  │

&#x20;  ▼

MongoDB

```



\## Installation



\### 1. Clone the repository



```bash

git clone https://github.com/sufiyan-mujawar2006/student-resource-finder.git

```



\### 2. Open the project



```bash

cd student-resource-finder

```



\### 3. Install dependencies



```bash

npm install

```



\### 4. Create `.env`



Create a `.env` file in the project root:



```env

PORT=5000

SERPAPI\_KEY=YOUR\_SERPAPI\_KEY

MONGODB\_URI=mongodb://127.0.0.1:27017/student\_resource\_finder

```



Replace `YOUR\_SERPAPI\_KEY` with your own SerpApi API key.



\### 5. Start MongoDB



Make sure MongoDB is running on your computer.



\### 6. Start the application



```bash

node server.js

```



The server will run on:



```text

http://localhost:5000

```



Open this address in your browser.



\## Environment Variables



The application uses the following environment variables:



| Variable | Description |

|---|---|

| `PORT` | Port used by the Node.js server |

| `SERPAPI\_KEY` | SerpApi API key |

| `MONGODB\_URI` | MongoDB database connection string |



The `.env` file is excluded from Git using `.gitignore`.



\## Database Collections



The application uses MongoDB to store:



\### Search



Stores search history.



\### Resource



Stores searched resources and cached results.



\### SavedResource



Stores resources saved by the student.



\## Future Improvements



Possible future improvements include:



\- User accounts and personalized resources

\- More advanced recommendation logic

\- Better resource ranking

\- More learning categories

\- Progress tracking

\- Personalized learning paths

\- Mobile-friendly improvements

\- More search engines and resource sources



\## Hackathon



This project was developed for the \*\*SerpApi India Hackathon 2026\*\*.



The main idea is to use web search data to transform a normal search experience into an organized learning experience for students.



\## Project Repository



GitHub:



https://github.com/sufiyan-mujawar2006/student-resource-finder



\## License



This project is created for educational and hackathon purposes.

