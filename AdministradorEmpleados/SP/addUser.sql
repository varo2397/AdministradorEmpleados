CREATE PROCEDURE `addUser`(
IN accountNumber decimal(20),
IN firstName varchar(45),
IN secondName varchar(45),
IN firstLastName varchar(45),
IN secondLastName varchar(45),
IN address varchar(1000),
IN cellphone decimal(8),
IN housephone decimal(8),
IN email varchar(45),
IN jobName varchar(45),
IN birthDate date,
IN startAtCompany date,
IN userName varchar(45),
IN password varchar(200),
IN identification decimal(9),
IN administrator tinyint(1),
OUT result INT
)
BEGIN
	IF EXISTS (select id from person p where p.userName LIKE username OR p.email LIKE email OR p.accountNumber LIKE accountNumber OR p.identification LIKE identification) THEN
		SET result = 1;
	ELSE
		SET @idJob = (SELECT idJob FROM job j WHERE j.jobName LIKE jobName);
        INSERT INTO person (accountNumber, firstName, secondName, firstLastName, secondLastName, address, cellphone, housephone, email, job, birthDate, startAtCompany, userName, password, administrator, identification) 
        VALUES (accountNumber, firstName, secondName, firstLastName, secondLastName, address, cellphone, housephone, email, @idJob, birthDate, startAtCompany, username, password, administrator, identification);
		SET result = 0;
    END IF;
END
