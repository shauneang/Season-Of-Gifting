# Season Of Gifting
Company gift distribution tracker using Node.js and Typescript

---

## Install dependencies

    $ npm i

## Set up prisma client

    $ npx prisma db push
    $ npx prisma db seed

## Running the project

    $ npm run dev

## Running tests

    $ npm run test

## Project Overview

This project has 3 main functionalities:

1. Get `employee` object details with `staff_pass_id`
2. Check if an employee's team is eligible with `staff_pass_id`
3. Create a new `redemption` object with `staff_pass_id`

#### 1. GET: Retrieve employee details

Endpoint: `http://localhost:8000/api/employee/:staff_pass_id`

---

#### 2. GET: Check eligibility with staff_pass_id

Endpoint: `http://localhost:8000/api/redemption/eligible/:staff_pass_id`

---

#### 3. POST: Create new redemption

Endpoint: `http://localhost:8000/api/redemption/:staff_pass_id`

---

## Tests Overview


    
