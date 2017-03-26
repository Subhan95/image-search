# Image Search

An API that gives links to images given the query and number of results desired. Uses google custom search API. 

## Getting Started

### Prerequisites

1. [node](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com)
3. [mongodb](https://www.mongodb.com/)

### Installation
Clone the project

```git
git clone https://github.com/khansubhan95/timestamp-microservice.git
```

run

```
npm install
```

to install the dependencies

### Development
Rename .env.template to .env

The project uses MongoDB to store data so make sure you have it installed. Use the MONGO_URI to make sure that the service has access to a DB

Also sign up for google custom search API and insert the API_KEY and CX in the .env file.

## Deployment
MONGO_URI Use a third party service like [mLab](https://mlab.com) to make a MongoDB database and note down the access point.

Remaining variables remain the same

## Usage

Given a valid url endpoint of the form /api/imagesearch/{query}?offset={number} , gives {number} images corresponding to the search term {query}.

[/api/latest/imagesearch](https://sleepy-savannah-14048.herokuapp.com/api/latest/imagesearch)

returns
An array of 10 objects with each object corresponding to a particular search query.

Given a valid url endpoint of the form /api/latest/imagesearch , gives the last 10 search queries and the time at which they were queried

[/api/imagesearch/cats?offset=10](https://sleepy-savannah-14048.herokuapp.com/api/imagesearch/cats?offset=10)

returns
An array of 10 objects with each object corresponding to a single image obtained from the query 'cats'

## Builtwith
1. [express](https://expressjs.com/)   
2. [mongoose](http://mongoosejs.com/)

View other dependencies in package.json

## Licensing
MIT
