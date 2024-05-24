# Rentify

## Introduction

Rentify is a property management platform that allows users to register, login, and manage property listings. This platform provides features for creating, updating, deleting, and retrieving properties, as well as expressing interest in properties and sending emails to buyers and sellers.

## Table of Contents

- [Rentify](#rentify-api)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Deployment](#deployment)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
      - [Register](#register)
      - [Login](#login)
    - [Properties](#properties)
      - [Create Property](#create-property)
      - [Get Properties by Seller](#get-properties-by-seller)
      - [Update Property](#update-property)
      - [Delete Property](#delete-property)
      - [Get All Properties](#get-all-properties)
      - [Express Interest in a Property](#express-interest-in-a-property)
      - [Get Filtered Properties](#get-filtered-properties)
      - [Send Email](#send-email)


## Deployment
 [Deployment Link](https://master.d3g6avp78xl18j.amplifyapp.com/)
 
## Getting Started

### Prerequisites

- Node.js
- React.js
- Express
- npm
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rakeshbabu23/Rentify.git
   cd Rentify
   ```
Frontend
```sh
   cd client
   ```
 Install the dependencies:
   ```sh
   npm install
   ```
Backend
```sh
   cd backend
   ```
 Install the dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables for backend.
 ```sh
PORT
JWT_SECRET
USERNAME(mongodb username)
PASSWORD(mongodb password)
EMAIL_USER
EMAIL_PASS
   ```
### Running the Application

1. Start the server:
   ```sh
   nodemon index
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "firstName": "name",
    "lastName": "lastname",
    "email": "me@example.com",
    "phoneNumber": "1234567890",
    "password": "password",
    "role": "buyer"
  }
  ```
#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Login a user.
- **Request Body**:
  ```json
  {
    "email": "me@example.com",
    "password": "password"
  }
  ```

### Properties

#### Create Property

- **URL**: `/properties`
- **Method**: `POST`
- **Description**: Create a new property.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "address": "123 st",
    "area": 1500,
    "numberOfBedrooms": 3,
    "numberOfBathrooms": 2,
    "nearbyHospitals": ["Hospital A", "Hospital B"],
    "nearbyColleges": ["College A", "College B"],
    "price": 250000,
    "image": "image-url"
  }
  ```

#### Get Properties by Seller

- **URL**: `/properties`
- **Method**: `GET`
- **Description**: Get all properties posted by the authenticated seller.
- **Headers**: `Authorization: Bearer <token>`

#### Update Property

- **URL**: `/properties/:propertyId`
- **Method**: `PUT`
- **Description**: Update an existing property.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Any property field to update.

#### Delete Property

- **URL**: `/properties/:propertyId`
- **Method**: `DELETE`
- **Description**: Delete an existing property.
- **Headers**: `Authorization: Bearer <token>`

#### Get All Properties

- **URL**: `/properties/all-properties`
- **Method**: `GET`
- **Description**: Get all properties.
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**: `page`, `limit`

#### Express Interest in a Property

- **URL**:  `/properties/:propertyId/interested`
- **Method**: `GET`
- **Description**: Express interest in a property and get seller details
- **Headers**: `Authorization: Bearer <token>`

#### Get Filtered Properties

- **URL**:  `/properties/filter`
- **Method**: `GET`
- **Description**: Get properties with filters.
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**: `minPrice, maxPrice, numberOfBathrooms, numberOfBedrooms`

#### Send Email

- **URL**:  `/properties/emails`
- **Method**: `POST`
- **Description**: Send an email to the seller and buyer about property interest.
- **Headers**: `Authorization: Bearer <token>`
