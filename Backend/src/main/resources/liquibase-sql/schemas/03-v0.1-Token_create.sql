-- liquibase formatted sql
-- changeset msal:1

create table token (
    id CHAR(36) primary key,
    token varchar unique not null,
    token_type varchar not null,
    expired bool not null,
    revoked bool not null,
    user_id char(36) not null,
    foreign key (user_id) references user_account(id)
);