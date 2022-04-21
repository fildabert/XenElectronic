# XenElectronic

XenElectronic is one of electronics and home appliance store. To improve customers’ growth for their
business, the manager of the store plans to build a web application where customers can purchase their
products online.

### Prerequisites

Please make sure that these dependencies are installed in your system

```
node.js
npm
```

### Installing

Make sure you have a terminal opened at the root directory of this project

If you have a unix system

```
sh setup.sh
```

If you are operating on a windows system please go into these 2 directories and run `npm install` in each of them

```
client
server
```

## Prerequisites before running the program in your local machine

create a file named `.env` inside `server` directory and insert these variables

```
PORT={YOUR_PORT}
MONGO_URL={YOUR_MONGO_URL}
XENDIT_SECRET_KEY={YOUR_XENDIT_API_KEY}
```

## Running the program in your local machine

To run the program, run `npm start` in both directories below

```
client
server
```

## Running the tests with coverage

```
npm run test:cov
```

## Deployment

client deployed to https://xenelectronic.fildabert.com/
\
server deployed to https://xenelectronic-filbert.herokuapp.com
