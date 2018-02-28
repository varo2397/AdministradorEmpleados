CREATE PROCEDURE `searchIdentification`(
IN identification DECIMAL(9,0),
OUT result INT
)
BEGIN
    IF EXISTS (SELECT p.identifacation FROM person p WHERE p.identifacation LIKE identification)
	THEN
		SET result = 1;
        
        SELECT p.firstName, p.secondName, p.firstLastName, p.secondLastName, p.address, p.cellphone,
		   p.housephone, p.email, j.jobName, p.birthDate, p.identification
		FROM person p 
		INNER JOIN job j
			ON j.idJob = p.job
		WHERE p.identification LIKE identification;
	ELSE
		SET result = 0;
    END IF
END