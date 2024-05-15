/* SQLEditor (MySQL (2))*/


DROP TABLE IF EXISTS known_participant;

DROP TABLE IF EXISTS subscriber;

DROP TABLE IF EXISTS language;

DROP TABLE IF EXISTS recognizer;

DROP TABLE IF EXISTS synthesizer;

CREATE TABLE known_participant
(
participant_id CHAR(36) UNIQUE ,
phone_number VARCHAR(20) NOT NULL,
language_sid CHAR(36) NOT NULL,
PRIMARY KEY (participant_id)
);

CREATE TABLE recognizer
(
recognizer_sid CHAR(36) UNIQUE ,
vendor VARCHAR(64) NOT NULL,
language_code VARCHAR(12) NOT NULL UNIQUE ,
PRIMARY KEY (recognizer_sid)
);

CREATE TABLE subscriber
(
subscriber_sid CHAR(36) UNIQUE ,
phone_number VARCHAR(20),
language_sid CHAR(36) NOT NULL,
PRIMARY KEY (subscriber_sid)
);

CREATE TABLE synthesizer
(
synthesizer_sid CHAR(36) UNIQUE ,
vendor VARCHAR(64) NOT NULL,
voice_name VARCHAR(32) NOT NULL UNIQUE ,
PRIMARY KEY (synthesizer_sid)
);

CREATE TABLE language
(
language_sid CHAR(36),
name VARCHAR(20) NOT NULL UNIQUE ,
name_aliases VARCHAR(1024),
preferred_recognizer_sid CHAR(36) NOT NULL,
preferred_synthesizer_sid CHAR(36) NOT NULL,
PRIMARY KEY (language_sid)
);

CREATE INDEX participant_id_idx ON known_participant (participant_id);
ALTER TABLE known_participant ADD FOREIGN KEY language_sid_idxfk (language_sid) REFERENCES language (language_sid);

CREATE INDEX recognizer_sid_idx ON recognizer (recognizer_sid);
CREATE INDEX vendor_idx ON recognizer (vendor);
CREATE INDEX subscriber_sid_idx ON subscriber (subscriber_sid);
ALTER TABLE subscriber ADD FOREIGN KEY language_sid_idxfk_1 (language_sid) REFERENCES language (language_sid);

CREATE INDEX synthesizer_sid_idx ON synthesizer (synthesizer_sid);
CREATE INDEX vendor_idx ON synthesizer (vendor);
CREATE INDEX language_sid_idx ON language (language_sid);
ALTER TABLE language ADD FOREIGN KEY preferred_recognizer_sid_idxfk (preferred_recognizer_sid) REFERENCES recognizer (recognizer_sid);

ALTER TABLE language ADD FOREIGN KEY preferred_synthesizer_sid_idxfk (preferred_synthesizer_sid) REFERENCES synthesizer (synthesizer_sid);
