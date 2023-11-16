INSERT INTO user_account (id, email, password) VALUES
                                                ('be6a551b-bbb1-4f9b-9833-9413caeba199', 'admin@a.a', '$2a$10$XqygxY0r59COpnQzEWDbA.fcZ45LGSMnnLMLWExZ83r/xGKvopcfC');

INSERT INTO task (id, title, description, priority, task_date, finish_date, is_done, user_id) VALUES
('1a7c7acf-2ab7-4add-8717-c4b81ce32418','Task 1','Description for Task 1',1,'2023-11-15','2023-11-05',false,'be6a551b-bbb1-4f9b-9833-9413caeba199'),
('f2b2d0cb-cc74-4eb5-a786-0a3e2616b1d1','Task 3','Description for Task 3',1,'2023-11-15','2023-11-07',true,'be6a551b-bbb1-4f9b-9833-9413caeba199'),
('5eaf69cf-0682-495f-be52-fcdee38dcb82','Task 5','Description for Task 5',2,'2023-11-15','2023-11-30',true,'be6a551b-bbb1-4f9b-9833-9413caeba199'),
('6e8b001d-6f99-4613-a324-f091f55988a5','Task 2','Description for Task 2',2,'2023-11-15','2023-11-30',false,'be6a551b-bbb1-4f9b-9833-9413caeba199'),
('5fc062ea-e91a-4f97-9e9e-4bdf2b9094c9','Task 4','Description for Task 4',3,'2023-11-15','2023-11-30',false,'be6a551b-bbb1-4f9b-9833-9413caeba199');