import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  codeword: { type: String, required: true },
  students: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  }],
});

GroupSchema.index({ codeword: 1, name: 1 }, { unique: true });
