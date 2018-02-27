CREATE PROCEDURE `addJob`(
IN jobName varchar(45),
IN state BIT,
OUT result INT
)
BEGIN
	IF EXISTS (select idJob from job j where j.jobName LIKE jobName) THEN
		SET result = 1;
	ELSE
        INSERT INTO Job (jobName, state) 
        VALUES (jobName, state);
		SET result = 0;
    END IF;
END