-- liquibase formatted sql
-- changeset msal:1

create table task (
                      id CHAR(36) PRIMARY KEY,
                      title varchar NOT NULL,
                      description varchar,
                      priority integer,
                      is_exact_date boolean NOT NULL,
                      is_done boolean NOT NULL,
                      finish_date date,
                      user_id CHAR(36),
                      FOREIGN KEY (user_id) REFERENCES user_account(id)
);