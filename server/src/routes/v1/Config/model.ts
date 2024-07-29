import mongoose from 'mongoose';

export interface Config {
  rows: number;
  columns: number;
  ncards: number;
  rowSpan: number[];
  colSpan: number[];
  categories: string[];
  isDefault: boolean;
}

const configSchema = new mongoose.Schema<Config>({
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
  isDefault: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const ConfigModel = mongoose.model<Config>('config', configSchema);
