CREATE PROCEDURE `searchUserName`(
IN userName VARCHAR(45),
OUT result INT
)
BEGIN
    IF EXISTS (SELECT p.userName FROM person p WHERE p.userName LIKE userName)
	THEN
		SET result = 1;
        
        SELECT p.firstName, p.secondName, p.firstLastName, p.secondLastName, p.address, p.cellphone,
		   p.housephone, p.email, j.jobName, p.birthDate, p.identification
		FROM person p 
		INNER JOIN job j
			ON j.idJob = p.job
		WHERE p.userName LIKE userName;
    ELSE
		SET result = 0;
    END IF
END