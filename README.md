# Season Of Gifting
Company gift distribution tracker using Node.js and Typescript

Frameworks: 

* Endpoint:
    * express
    * prisma
* Testing:
    * jest
    * supertest

## Set Up Project

### Install dependencies

    $ npm i

### Set up prisma client and database

    $ npx prisma db push
    $ npx prisma db seed

### Running the project

    $ npm run dev

### Running tests

    $ npm run test

## Project Overview

This project has 3 main functionalities:

1. Get `employee` object details with `staff_pass_id`
2. Check if an employee's team is eligible with `staff_pass_id`
3. Create a new `redemption` object with `staff_pass_id`

PORT: `8000`

<br> 


#### 1. GET: Retrieve employee details

Endpoint route: `http://localhost:8000/api/employee/:staff_pass_id`

Expected input: `staff_pass_id` in params

Expected return: `employee` object

```
{
    staff_pass_id: string,
    team_name: string,
    created_at: Date,
}
```


<br> 


#### 2. GET: Check eligibility with staff_pass_id

Endpoint route: `http://localhost:8000/api/redemption/eligible/:staff_pass_id`

Expected input: `staff_pass_id` in params

Expected return: `true` if staff's `team_name` is not in `redemption` table, else `false`

Logic:
1. Find `employee` using `staff_pass_id`
2. Find `employee`'s `team_name` in `redemption`
   

<br> 


#### 3. POST: Create new redemption

Endpoint route: `http://localhost:8000/api/redemption/:staff_pass_id`

Expected input: `staff_pass_id` in params

Expected return: `redemption` object

```
{
    team_name: string,
    redeemed_at: Date,
}
```

Logic:
1. Find `employee` using `staff_pass_id`
2. Find `employee`'s `team_name` in `redemption`
3. Create new `redemption` if unique constraint for `team_name` is not violated


<br> 

## Testing Overview

The tests cover the possible scenarios encountered by the 3 functionalities stated above in Product Overview

Unfortunately the approach I adopted does not work on a few test cases which requires the `redemption` table to not have any conflicting `team_name`s.
I hope to continue to figure out how to use a testing database to run my tests, inject mock data and reset the data after each test instead of the production databse. However, the rest of the test cases still run successfully.

### Approach 1: Mocking Prisma (Unsuccessful)

Idea: To use `jest-mock-extension` to create a mock `Prisma Client` in order to use a separate database that I can add data to test specific cases. 

Problem: Could not get mock `Prisma Client` to work with services and send requests to database.

### Approach 2: Use Production database (Adopted)

Pitfalls: Affects the production database when running test
    
