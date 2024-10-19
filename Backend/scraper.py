import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate('firebase-adminsdk.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to scrape book data from a single page
def scrape_books_from_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    books = []
    for article in soup.find_all('article', class_='product_pod'):
        title = article.h3.a['title']
        price = article.find('p', class_='price_color').text
        rating = article.find('p', class_='star-rating')['class'][1]
        availability = article.find('p', class_='instock availability').text.strip()

        books.append({
            'title': title,
            'price': price,
            'rating': rating,
            'availability': availability
        })
    
    return books

# Function to handle pagination and scrape all pages
def scrape_all_books():
    base_url = "http://books.toscrape.com/catalogue/page-{}.html"
    page_number = 1
    all_books = []

    while True:
        print(f"Scraping page {page_number}...")
        url = base_url.format(page_number)
        books = scrape_books_from_page(url)
        
        if not books:  # If no books are found on the page, stop
            break

        all_books.extend(books)
        page_number += 1  # Move to the next page

    return all_books

# Save scraped data into Firestore
def save_to_firestore(books):
    for book in books:
        db.collection('books').add(book)

# Main function to run the scraper
def main():
    books = scrape_all_books()  # Scrape data from all pages
    save_to_firestore(books)

if __name__ == "__main__":
    main()
