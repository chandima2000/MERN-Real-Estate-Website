# Real Estate Marketplace

This is a full-stack website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows clients to buy, sell, and rent properties in desirable neighborhoods.

## Features

- User Authentication: Utilizes Google Firebase for secure user authentication, allowing users to create accounts and log in securely.
- Styling with Tailwind CSS: The website is styled using Tailwind CSS, providing a clean and modern user interface.
- CRUD Operations: Implements CRUD (Create, Read, Update, Delete) operations for managing property listings, enabling users to add, view, edit, and delete property listings.
- Firebase Storage: Utilizes Firebase Storage to store profile images, ensuring efficient and reliable image storage for user profiles.
  
## Installation

1. Clone the project:

   ```bash
   git clone https://github.com/chandima2000/Real-Estate-MarketPlace.git

2. Install dependencies for the client-side:

   ```bash
   cd front-end
    npm install

3. Install dependencies for the server-side:

   ```bash
   cd ..
    npm install

## Front-End Configuration

 - Go to the front end
 - create a new .env file
 - Add " VITE_FIREBASE_API_KEY = "

## Back-End Configuration

- Go to the root folder
- create a new .env file
- Add " MONGO = " , " JWT_SECRET = " 

## Usage

- Run both the front-end and back-end using :
  ```bash
      npm run dev

## Live Website
The website should now be accessible at `(https://real-estate-market-web.onrender.com/)`.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature`)
6. Create a new Pull Request
