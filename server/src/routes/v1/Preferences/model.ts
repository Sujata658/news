import mongoose from 'mongoose';

export interface Preferences {
  user: string;
  categories: string[];
  rows: number;
  columns: number;
  ncards: number;
  rowSpan: number[];
  colSpan: number[];
}

export interface PreferencesProps {
  categories: string[];
  rows: number;
  columns: number;
  ncards: number;
  rowSpan: number[];
  colSpan: number[];
}

const preferenceSchema = new mongoose.Schema<Preferences>(
  {
    user: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    rows: {
      type: Number,
      required: true,
    },
    ncards: {
      type: Number,
      required: true,
    },
    columns: {
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
  },
  { timestamps: true }
);

export const PreferenceModel = mongoose.model<Preferences>('preference', preferenceSchema);
