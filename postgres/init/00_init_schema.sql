CREATE TABLE "players" (
  "player_id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "height" int,
  "weigth" int,
  "birth_date" datetime,
  "position" int,
  "eligible" boolean,
  "program" varchar,
  "hometown" varchar,
  "profile_image_id" int
);

CREATE TABLE "awards" (
  "award_id" SERIAL PRIMARY KEY,
  "player_id" int,
  "award_name" varchar,
  "award_year" int
);

CREATE TABLE "media" (
  "image_id" SERIAL PRIMARY KEY,
  "image_url" varchar,
  "photographer" varchar,
  "title" varchar,
  "description" varchar
);

CREATE TABLE "founders" (
  "founder_id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "class_of" int,
  "tier" int
);

CREATE TABLE "schedule" (
  "game_id" SERIAL PRIMARY KEY,
  "other_team_id" int,
  "game_time" datetime,
  "laurier_score" int,
  "other_team_score" int
);

CREATE TABLE "teams" (
  "team_id" SERIAL PRIMARY KEY,
  "school_name" varchar,
  "team_name" varchar,
  "mascot" varchar,
  "homefield" varchar
);

CREATE TABLE "recruits" (
  "player_id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "height" int,
  "weigth" int,
  "birth_date" datetime,
  "high_school" varchar,
  "email" varchar,
  "interested_programs" varchar
);

ALTER TABLE "players" ADD FOREIGN KEY ("profile_image_id") REFERENCES "media" ("image_id");
ALTER TABLE "awards" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("player_id");
ALTER TABLE "schedule" ADD FOREIGN KEY ("other_team_id") REFERENCES "teams" ("team_id");