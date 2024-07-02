import mongoose from 'mongoose';

export interface Preference {
  type: 'default' | 'normal';
  rows: number;
  columns: number;
  ncards: number;
  rowSpan: number[];
  colSpan: number[];
  categories: string[];
}

export interface Preferences {
  user: string;
  preferences: Preference[];
}

export interface PreferencesProps {
  preferences: Preference[];
}

const preferenceSchema = new mongoose.Schema<Preference>({
  type: {
    type: String,
    enum: ['default', 'normal'],
    required: true,
    default: 'normal',
  },
  rows: {
    type: Number,
    required: true,
  },
  columns: {
    type: Number,
    required: true,
  },
  ncards: {
    type: Number,
    required: true,
  },
  rowSpan: {
    type: [Number],
    required: true,
  },
  colSpan: {
    type: [Number],
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

const preferencesSchema = new mongoose.Schema<Preferences>(
  {
    user: {
      type: String,
      required: true,
    },
    preferences: {
      type: [preferenceSchema],
      required: true,
    },
  },
  { timestamps: true }
);


export const PreferenceModel = mongoose.model<Preferences>('Preference', preferencesSchema);
