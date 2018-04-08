/*用户资料表*/
CREATE TABLE IF NOT EXISTS `user_info`(
	`open_id` 			VARCHAR(100) 	NOT NULL,
	`user_name` 		VARCHAR(30) 	NOT NULL 			COMMENT '用户名',	
	`icon_url` 			VARCHAR(255) 	NOT NULL 			COMMENT '头像URL',
	`introduction` 		VARCHAR(100) 	NOT NULL			COMMENT '一句话简介',
	`sex`				TINYINT DEFAULT 0 					COMMENT '性别，1为男，2为女'
	`fans_number`		INT UNSIGNED DEFAULT 0 				COMMENT '粉丝数量',
	`info_visible`		TINYINT DEFAULT 1 					COMMENT '个人信息他人是否可见，1为可见，0为不可见',
	`memory_visible`	TINYINT DEFAULT 1 					COMMENT '回忆长廊他人是否可见，1为可见，0为不可见',
	`create_time`		timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建用户时间',		
	PRIMARY KEY ( `open_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*城市*/
CREATE TABLE IF NOT EXISTS `city`(
	`id`				VARCHAR(6) 		NOT NULL 	COMMENT '城市id(用邮编)',
	`city_name` 		VARCHAR(50) 	NOT NULL 	COMMENT '城市名',
	`user_name` 		VARCHAR(30) 	NOT NULL 	COMMENT '用户名',
	`brief_introduction`VARCHAR(100) 	NOT NULL 	COMMENT '简介,用于放在推荐页',
	`introduction` 		VARCHAR(100) 	NOT NULL 	COMMENT '具体简介',
	`next_scenic_spot_id` VARCHAR(4) 	NOT NULL ZEROFILL COMMENT '该城市下一个景点4位编号'
	`brief_pic_url`		VARCHAR(255) 				COMMENT '推荐页图片URL',
	`first_pic`			VARCHAR(255) 				COMMENT '照片集第一张照片URL',
	`second_pic`		VARCHAR(255) 				COMMENT '照片集第二张照片URL',
	`third_pic`			VARCHAR(255) 				COMMENT '照片集第三张照片URL',
	PRIMARY KEY ( `city_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*景点*/
CREATE TABLE IF NOT EXISTS `scenic_spot`(
	`id`	VARCHAR(10) NOT NULL 					COMMENT '景点id(城市id+景点4位编号)',
	`scenic_spot_name` 	VARCHAR(50) 	NOT NULL 	COMMENT '景点名',
	`belong_city_id` 	VARCHAR(6) 		NOT NULL 	COMMENT '归属城市的id',
	`brief_introduction` VARCHAR(100) 	NOT NULL 	COMMENT '简介,用于放在推荐页',
	`introduction` 		VARCHAR(100) 	NOT NULL 	COMMENT '一句话简介',
	`brief_pic_url`		VARCHAR(255) 				COMMENT '推荐页图片URL',
	`first_pic`			VARCHAR(255) 				COMMENT '照片集第一张照片URL',
	`second_pic`		VARCHAR(255) 				COMMENT '照片集第二张照片URL',
	`third_pic`			VARCHAR(255) 				COMMENT '照片集第三张照片URL',
	INDEX(belong_city_id),
	PRIMARY KEY ( `scenic_spot_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*景点评论*/
CREATE TABLE IF NOT EXISTS `scene_comment`(
	`id`				int NOT NULL AUTO_INCREMENT COMMENT '评论ID',
	`user_id` 			VARCHAR(100) 	NOT NULL 	COMMENT '评论用户open_id',
	`content` 			VARCHAR(255) 	NOT NULL 	COMMENT '内容',
	`scenic_spot_id` 	VARCHAR(10) 	NOT NULL 	COMMENT '景点id',
	`evaluation` 		TINYINT 		NOT NULL 	COMMENT '评价（好评为1，差评为0)',
	`agree` 			INT UNSIGNED DEFAULT 0 		COMMENT '好评量',
	`disagree` 			INT UNSIGNED DEFAULT 0 		COMMENT '差评量',
	`timestamp`			timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
	INDEX(scenic_spot_id),
	PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*回忆长廊*/
CREATE TABLE IF NOT EXISTS `memory_gallery`(
	`id`				int NOT NULL AUTO_INCREMENT COMMENT '回忆项ID',
	`user_id` 			VARCHAR(100) 	NOT NULL 	COMMENT '用户open_id',
	`pic_url`			VARCHAR(255) 				COMMENT '照片URL',
	`memory_visible`	TINYINT 		DEFAULT 1 	COMMENT '该回忆项他人是否可见，1为可见，0为不可见',
	`like`				int 			DEFAULT 0 	COMMENT '点赞数',
	INDEX(user_id),
	PRIMARY KEY ( `id `)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*文章*/
CREATE TABLE IF NOT EXISTS `article`(
	`id`				int NOT NULL AUTO_INCREMENT COMMENT '文章ID',
	`user_id` 			VARCHAR(100) 	NOT NULL 	COMMENT '创建用户open_id',
	`cover_pic_url`		VARCHAR(255) 				COMMENT '封面照片URL',
	`visible`			TINYINT 		DEFAULT 1 	COMMENT '文章他人是否可见，1为可见，0为不可见',
	`like`				int 			DEFAULT 0 	COMMENT '点赞数',
	`timestamp`			timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	INDEX(user_id),
	PRIMARY KEY ( `id ` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*文章评论*/
CREATE TABLE IF NOT EXISTS `article_comment`(
	`id`				int NOT NULL AUTO_INCREMENT COMMENT '评论ID',
	`article_id`		int 			NOT NULL 	COMMENT '文章ID',
	`user_id` 			VARCHAR(100) 	NOT NULL 	COMMENT '评论用户open_id',
	`content` 			VARCHAR(255) 	NOT NULL 	COMMENT '内容',
	`agree` 			INT UNSIGNED 	DEFAULT 0 	COMMENT '好评量',
	`disagree` 			INT UNSIGNED 	DEFAULT 0 	COMMENT '差评量',
	`timestamp`			timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
	INDEX(article_id),
	PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;