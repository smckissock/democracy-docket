USE lincoln_project
GO

SELECT * FROM Term

SELECT 'INSERT INTO MediaCloudCollection VALUES (' + collectionID + ', ''' + Name + ''')' FROM MediaCloudCollection 


USE democracy_docket
GO

INSERT INTO MediaCloudCollection VALUES (186572515, 'U.S. Top Digital Native Sources 2018')
INSERT INTO MediaCloudCollection VALUES (186572435, 'U.S. Top Newspapers 2018')
INSERT INTO MediaCloudCollection VALUES (9360520, 'Left')
INSERT INTO MediaCloudCollection VALUES (9360521, 'Center Left')
INSERT INTO MediaCloudCollection VALUES (9360522, 'Center')
INSERT INTO MediaCloudCollection VALUES (9360524, 'Right')
INSERT INTO MediaCloudCollection VALUES (9360523, 'Center Right')
INSERT INTO MediaCloudCollection VALUES (34411583, 'Canada - National')
INSERT INTO MediaCloudCollection VALUES (34412476, 'United Kingdom - National')
INSERT INTO MediaCloudCollection VALUES (31653006, 'Buzzfeed Hyperpartisan Sources')
INSERT INTO MediaCloudCollection VALUES (197610438, 'Top Talk Radio')
INSERT INTO MediaCloudCollection VALUES (196654054, 'Top Podcasts')
INSERT INTO MediaCloudCollection VALUES (8876474, 'Europe Media Monitor')
INSERT INTO MediaCloudCollection VALUES (38381390, 'North Carolina, United States - State & Local')


SELECT * FROM MediaCloudCollection


SELECT * FROM MediaCloudBatch


SELECT 'INSERT INTO MediaCloudBatch VALUES (''Democracy Docket'', ''2019-12-01'', ''2020-02-01'', NULL, ' + CAST(MediaCloudCollectionID AS VARCHAR(10)) + ', 1170)'
FROM  MediaCloudBatch WHERE ID < 1230




USE democracy_docket
GO

SELECT * fROM MediaCloudCollection

INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 40, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 41, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 42, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 43, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 44, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 45, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 46, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 47, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 48, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 49, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 50, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 51, 1170)
INSERT INTO MediaCloudBatch VALUES ('Democracy Docket', '2019-12-01', '2020-02-01', NULL, 52, 1170)


SELECT * fROM MediaCloudBatch


SELECT b.ID, b.Term, b.StartDate, EndDate, MediaCloudCollectionID, TermID, c.CollectionID 
                       FROM MediaCloudBatch b
                       JOIN MediaCloudCollection c ON b.MediaCloudCollectionID = c.ID
                       WHERE RunTime IS NULL ORDER BY TermID DESC


DELETE FROM PipelineError
SELECT * FROM PipelineError

SELECT * FROM MediaCloudStory