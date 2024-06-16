export class Place {
  constructor(title, imageUri, location) {
    (this.title = title),
      (this.imageUri = imageUri),
      (this.location = location),
      (this.id = new Date().toString() + Math.random().toString());
  }
}
