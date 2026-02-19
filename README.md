# Student Results Management System

A simple, responsive web application to manage student results, calculate grades, and persist data using Local Storage. Built with HTML, Bootstrap 5, and Vanilla JavaScript.

## Features

-   **Add Student Results**: Input scores for various subjects (English, French, Arabic, Math, History, ICT).
-   **Automatic Calculation**: Automatically calculates Total Score, Percentage, and assigns a Grade.
-   **Data Persistence**: Uses browser `localStorage` to save student data, so it survives page reloads.
-   **Search Functionality**: Filter the student list by name in real-time.
-   **Input Validation**:
    -   Real-time visual feedback (Green for valid, Red for invalid).
    -   Strictly enforces scores between 0 and 100.
    -   Prevents form submission if inputs are invalid.
-   **Responsive Design**: Mobile-friendly layout using Bootstrap.

## Technologies Used

-   **HTML5**
-   **CSS3** (Custom styles + Bootstrap 5)
-   **JavaScript** (ES6+)
-   **Bootstrap 5** (CDN)

## Setup and Usage

1.  **Clone or Download** the repository.
2.  Open `list.html` in your web browser.
3.  **To Add a Student**:
    -   Enter the Student Name.
    -   Enter scores for all subjects (0-100).
    -   Click the **Add & New** button.
4.  **To Search**:
    -   Type a name in the search bar above the table to filter results.
5.  **To Clear Form**:
    -   Click the **Clear** button to reset the input fields.

## Project Structure

-   `list.html`: Main application file.
-   `app.js`: Application logic (Validation, Calculation, Local Storage).
-   `css/app.css`: Custom styling.
-   `img/`: Images assets.

## Validation Rules

-   **Name**: Cannot be empty.
-   **Scores**: Must be numbers between 0 and 100.
