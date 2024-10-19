# Book Scraper Project

This project scrapes book data from [Books to Scrape](http://books.toscrape.com/) and displays it in a React web application with pagination. The data is stored in Firebase Firestore and fetched to the frontend for display.

## **Technologies Used**
- **Python**: For web scraping using `requests` and `BeautifulSoup`.
- **Firebase Firestore**: For storing scraped book data.
- **React**: For building the frontend and displaying the data.
- **Bootstrap**: For styling the UI components.
- **Firebase Admin SDK**: For connecting to Firebase in Python.

## **Setup and Run Instructions**

### **Backend (Python Web Scraper)**
1. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
2. **Configure Firebase**:
    - Download your Firebase Admin SDK credentials and place the `firebase-adminsdk.json` file in the `backend` folder.
3. **Run the Scraper**:
    ```bash
    python scraper.py
    ```
    This will scrape the book data and store it in Firebase Firestore.

### **Frontend (React App)**
1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Configure Firebase in React**:
    - Add your Firebase web configuration in `src/firebase.js`.
4. **Run the React app**:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

## **Features**
- Scrapes book title, price, rating, and availability.
- Displays books in a responsive grid layout with pagination.
- Stores and fetches data from Firebase Firestore.

### **Folder Structure**
```bash
book-scraper-project/
├── backend/
│   ├── scraper.py
│   ├── firebase-adminsdk.json
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookList.jsx
│   │   ├── firebase.js
│   ├── public/
│   ├── package.json
├── README.md
