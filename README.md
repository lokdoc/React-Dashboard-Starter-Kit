# React-Dashboard-Starter-Kit ( is not completed )

Welcome to React-Dashboard-Starter-Kit ! it's a boiler plate for Dashboard projects based on :

- Express JS ( As a Server )

- React JS ( Front-end WebApp )

- Postgres Database

# Getting Started 
## How to install it ? 
### Using Docker 
If you already have docker installed on your server/machine, you can run the project directly with this commands : 
### Using Docker ( Development mode )
```bash
git clone https://github.com/lokdoc/React-Dashboard-Starter-Kit
cd React-Dashboard-Starter-Kit
docker-compose up 
```
### Where to edit code ? 
The Dev-Containers are running in volumes mounted on  :
> **API-Server**: it's mounted in ***./api-server/*** and auto refreshing when editing via ***supervisor***.
> **Client WebApp**: it's mounted in ***./client/*** and auto refreshing when editing via ***react-scripts***.


### Using Docker ( Production mode )
```bash
git clone https://github.com/lokdoc/React-Dashboard-Starter-Kit
cd React-Dashboard-Starter-Kit
docker-compose -f docker-compose.production.yaml up
```
#### Run it !
To run it go to http://localhost:8080/
Default credentials are  :
> 
	Username : admin
	Password : admin

> **Note:**  if port 8080 is already in use, you can change it in docker-compose.production.yaml for ***Production mode*** OR docker-compose.yaml in ***Development mode***.



##  Native installation 

 React-Dashboard-Starter-Kit requires dependencies to be installed on your machine : 
 - NodeJS 10.xx or later 
 - Postgres 9 or later

### Windows 
>
Not Tested Yet 

### Linux 
>
Not Tested Yet 


### Mac Os  

>
Works Fine !




