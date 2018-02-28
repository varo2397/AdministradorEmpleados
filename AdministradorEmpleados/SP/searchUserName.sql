CREATE PROCEDURE `searchUserName`(
IN userName VARCHAR(45),
OUT firstName VARCHAR(45),
OUT secondName VARCHAR(45),
OUT firstLastName VARCHAR(45),
OUT secondLastName VARCHAR(45),
OUT address VARCHAR(1000),
OUT cellphone DECIMAL(8,0),
OUT housephone DECIMAL(8,0),
OUT email VARCHAR(45),
OUT jobName VARCHAR(45),
OUT birthDate DATE,
OUT identification DECIMAL(9, 0)
)
BEGIN
	SELECT p.firstName INTO firstName FROM person p WHERE p.userName = userName;
    SELECT p.secondName INTO secondName FROM person p WHERE p.userName = userName;
    SELECT p.firstLastName INTO firstLastName FROM person p WHERE p.userName = userName;
    SELECT p.secondLastName INTO secondLastName FROM person p WHERE p.userName = userName;
    SELECT p.address INTO address FROM person p WHERE p.userName = userName;
    SELECT p.cellphone INTO cellphone FROM person p WHERE p.userName = userName;
    SELECT p.housephone INTO housephone FROM person p WHERE p.userName = userName;
    SELECT p.email INTO email FROM person p WHERE p.userName = userName;
    SELECT p.jobName INTO jobName FROM person p INNER JOIN job j ON p.job = j.idJob WHERE p.userName = userName;
    SELECT p.birthName INTO birthName FROM person p WHERE p.userName = userName;
    SELECT p.identificaction INTO identificaction FROM person p WHERE p.userName = userName;
END