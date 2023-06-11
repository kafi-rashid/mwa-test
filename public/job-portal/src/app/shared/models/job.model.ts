export class Job {
  "_id": string;
  "title": string;
  "salary": number;
  "location": Location;
  "description": string;
  "experience": number;
  "skills": [string];
  "postDate": string;
}

export class Location {
  "_id": string;
  "lat": number;
  "lng": number;
}