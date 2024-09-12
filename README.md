# User Authentication and Authorization Demo

A full stack CRUD application compromised of an Angular frontend (this repository) and a Spring Boot
REST API ([repo](https://github.com/peteryn/ComputerStore)). Users are able to:

1. Create an account
2. Log in
3. View profile information
4. Update profile
5. Change password
6. Delete account

## Authentication

Users register an acount with an email and password. The email and password are used to authenticate a user. When
changing a password or deleting an account, users must enter their password again.

### Persistence

User information is stored in a PostgreSQL database managed by Spring Data. Passwords are securely encrypted using
the Bcrypt encoder. The Bcrypt encoder handles the hashing and salting.

## Authorization

Authorization is handled using JSON Web Tokens (JWT). The JWT's expire after 5 minutes and this causes the user to have
to manually reauthenticate. This expiry time can be adjusted.

# Goals

-   [ ] Deploy backend on AWS
-   [ ] Deploy frontend on AWS
-   [ ] Add more functionality to showcase REST API naming conventions
