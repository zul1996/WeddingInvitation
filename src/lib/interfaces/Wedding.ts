

export interface IWedding extends Document {
  groomName: String;
  brideName: String;
  eventDate: Date;
  eventLocaltion: String;
  createdAt?: Date;
  updatedAt?: Date;
}