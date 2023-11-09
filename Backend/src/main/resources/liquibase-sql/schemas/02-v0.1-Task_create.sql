-- liquibase formatted sql
-- changeset msal:1

create table task (
                      id CHAR(36) PRIMARY KEY,
                      title varchar NOT NULL,
                      description varchar,
                      priority integer,
                      task_date date,
                      finish_date date,
                      is_done boolean NOT NULL,
                      user_id CHAR(36),
                      FOREIGN KEY (user_id) REFERENCES user_account(id)
);