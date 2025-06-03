import mongoose, { Document, Schema } from "mongoose";

interface IAnswer extends Document {
  question_id: mongoose.Types.ObjectId | null;
  answer: string | null;
  status: number;
  created_at: Date;
}

const mcqSchema = new Schema<IAnswer>({
  question_id: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  answer: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model<IAnswer>("answer", mcqSchema);
export default Answer;
