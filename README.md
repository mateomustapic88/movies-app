# Movie Application

This is a movie application built as part of an assignment to demonstrate the use of modern web technologies, including **Next.js**, **TypeScript**, and **Sass** (CSS framework). The app fetches movie data from the **OMDB API** and includes features like searching, favoriting, and filtering movies. The app is responsive, optimized, and dockerized using **Docker Compose**.

## Features

### Home Page

- Displays the following sections:
  - **Newest Movies**
  - **Top 3 Movies by Streaming Services**
  - **Popular Movies**
  - All horizontally scrollable
  - Option to **favorite** movies and store them in **local storage**.

### Most Watched Page

- Infinite scroll for movie lists.
- Filters to sort movies by:
  - **Release Year**
  - **Poster Image**

### Movie Details Page

- Detailed information about each movie, including:
  - **Banner Image**
  - **Poster Image**
  - **Title**
  - **Description**
  - **Score**
  - **Genre**
  - **Duration**
  - **Country**
  - **Cast**
- Option to **favorite** or **unfavorite** movies directly from the movie details page.
- The app reflects if the movie has already been favored elsewhere.

### Navbar

- Present across all pages.
- Contains a **search bar** for searching movies.
- A **favorites dropdown** showing the list of favorited movies.
- **Live search results** as the user types:
  - Dropdown with selectable results (using arrow keys).
  - Enter key redirects the user to the selected movie or the search results page.

### Favorites Page (Bonus)

- A dedicated page showing all favorited movies.
- Ability to **clear** all favorites from local storage.

## Technologies Used

- **Next.js** (framework)
- **TypeScript** (strongly typed JavaScript)
- **Sass** (CSS framework for styling)
- **OMDB API** (for fetching movie data)
- **Local Storage** (for managing favorites)

## Installation

### Prerequisites

- **Node.js** version 18 or above.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/movie-app.git
   cd movie-app
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Run the app
   ```sh
   npm run dev
   ```
4. Open app on http://localhost:3000/

5. Enjoy!
