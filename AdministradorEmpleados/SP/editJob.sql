CREATE PROCEDURE `editJob`(
IN idJob INT(11),
IN jobName varchar(45),
IN state BIT,
OUT result INT
)
BEGIN
	IF EXISTS (select idJob from job j where j.jobName LIKE jobName AND j.idJob <> idJob) THEN
		SET result = 1;
	ELSE
        UPDATE Job j
        SET j.jobName = jobName, j.state = state
        WHERE j.idJob = idJob;
		SET result = 0;
    END IF;
END