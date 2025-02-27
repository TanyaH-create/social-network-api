[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)] 


Social Network API is an application built using MongoDB, Express.js, and Mongoose ODM. The API allows users to share their thoughts, react to friends' thoughts, and manage a friend list. It is designed to handle large amounts of unstructured data efficiently.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)


## Features
- User Management: Create, ipdate, delete and retrieve user information.
- Friend System: Add and remove friends from the users friends list.
- Thought Sharing: Users can create, update, modify and delete thoughts.
- Reactions to Thoughts: Users can add and remove reactions to the thughts of other users.
- Dynamically calculated friend count and reaction count.
- Uses a NOSQL database for flexible and efficient data storage.

## Installation
If you'd like to run Social Network API locally, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:TanyaH-create/social-network-api.git
   
2. Navigate to the project directory 
   ```bash
   cd social-network-api

3. Install required dependencies:
   ```bash
   npm install

4. Ensure MongoDB is installed and running on your local machine.
   
5. Build and Run the development application, there is an optional seed file included
   ~~~bash
   npm run build && npm run seed && npm start

   
## Usage
Use Insomnia or Postman to test the API endpoints

**API Routes**

**User Routes**

- GET /api/users - Retrieve all users.

- GET /api/users/:userId - Retrieve a single user by ID.

- POST /api/users - Create a new user.

- PUT /api/users/:userId - Update a user by ID.

- DELETE /api/users/:userId - Remove a user by ID.

**Friend Routes**

- POST /api/users/:userId/friends/:friendId - Add a friend to a user’s friend list.

- DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user’s friend list.

**Thought Routes**

- GET /api/thoughts - Retrieve all thoughts.

- GET /api/thoughts/:thoughtId - Retrieve a single thought by ID.

- POST /api/thoughts - Create a new thought and associate it with a user.

- PUT /api/thoughts/:thoughtId - Update a thought by ID.

- DELETE /api/thoughts/:thoughtId - Remove a thought by ID.

**Reaction Routes**

- POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought.

- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought.

## Walkthrough Video
Check out the walkthourgh video of the application [here](https://drive.google.com/file/d/1miIFseOapcndOhxYJCL-vvo6robPhwkn/view?usp=drive_link)   


## GitHub Repository
The source code for this project can be found here [GitHub Repository](https://github.com/TanyaH-create/social-network-api) .

## Technologies Used
- MongoDB
- Express.js
- Mongoose
- Node.js 

## Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
3.	Commit your changes:
    ```bash
    git commit -m "Add feature-name"
4.	Push your branch:
    ```bash
    git push origin feature-name
5.	Submit a pull request.

  
## License
This project is licensed under the MIT license. A complete version of the MIT license is available at [MIT](https://opensource.org/licenses/MIT).
Any contribution made to this project will be icense under the MIT.
 



