import mongoose from 'mongoose';

export interface Preferences {
  user: string;
  configs: mongoose.Types.ObjectId[];
}

const userPreferencesSchema = new mongoose.Schema<Preferences>(
  {
    user: {
      type: String,
      required: true,
    },
    configs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'config',
      required: true,
    }],
  },
  { timestamps: true }
);

export const PreferencesModel = mongoose.model<Preferences>('preferences', userPreferencesSchema);
