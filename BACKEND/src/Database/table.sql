CREATE TABLE NOTES2 (
    note_id VARCHAR(200),
    title VARCHAR(200),
    description VARCHAR(200),
    content VARCHAR (300),
    created_at DATETIME DEFAULT GETDATE(),
    modified_at  DATETIME DEFAULT GETDATE()

)