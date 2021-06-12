DROP TABLE unit;
DROP TABLE teacher;
DROP TABLE schoolclass;

CREATE TABLE teacher
(
    id        INT NOT NULL,
    firstName VARCHAR(20),
    lastName  VARCHAR(20),
    room      VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE schoolclass
(
    id   VARCHAR(20) NOT NULL,
    room VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE unit
(
    id            INT NOT NULL AUTO_INCREMENT,
    day           INT,
    unit          INT,
    subject       VARCHAR(20),
    teacherID     INT,
    schoolclassID VARCHAR(20),
    PRIMARY KEY (id),
    CONSTRAINT FK_Teacher_Unit FOREIGN KEY (teacherID) REFERENCES teacher (id),
    CONSTRAINT FK_Schoolclass_Unit FOREIGN KEY (schoolclassID) REFERENCES schoolclass (id)
);


select *
from teacher;
