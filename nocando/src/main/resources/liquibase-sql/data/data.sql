INSERT INTO user_account (id, username, password) VALUES
                                                ('c3fa8e02-03b0-4b0c-96ce-f68e3a6b2f2a', 'john_doe', 'password123'),
                                                ('a8722d1a-08ae-4e47-bf23-df82a870c7c8', 'jane_smith', 'secure_password');

INSERT INTO task (id, title, description, priority, is_exact_date, is_done, finish_date, user_id) VALUES
                                                ('9370a45d-7de7-4684-b6ab-89f4e9b16667', 'Buy groceries', 'Milk, eggs, and bread', 2, true, false, NULL, 'c3fa8e02-03b0-4b0c-96ce-f68e3a6b2f2a'),
                                                ('bc49c6ab-5e8d-4b0b-9b3f-21c0ecbba5ed', 'Finish project', 'Complete the report', 1, false, false, NULL, 'a8722d1a-08ae-4e47-bf23-df82a870c7c8');
