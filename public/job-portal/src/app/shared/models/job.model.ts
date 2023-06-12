export class Job {
  "_id": string;
  "title": string;
  "salary": number;
  "location": Location;
  "description": string;
  "experience": number;
  "skills": [string];
  "postDate": Date;
}

export class Location {
  "_id": string;
  "coordinates": [number];
}