-- liquibase formatted sql
-- changeset msal:1

create table user_account (
    id CHAR(36) primary key,
    username varchar unique not null,
    password varchar not null
);