create database EmployeeTrackerDB;

use EmployeeTrackerDB;

create table Department (
ID INT not null primary key,
Name varchar(30) NULL 
);

CREATE TABLE Role(
ID INT not null primary key,
Title VARCHAR(30) not null,
Salary DECIMAL(10,2) not null,
Department_ID INT not null
);

create TABLE Employee (
ID INT PRIMARY KEY,
First_Name  VARCHAR(30) not null,
Last_Name  VARCHAR(30) not null,
Role_ID  INT not null,
Manager_ID  INT null
)