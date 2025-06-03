export const sendProgress: {
  isRunning: boolean;
  totalMessages: number;
  sentMessages: number;
  startTime: string;
  lastUpdated: string;
  endTime?: string;
  durationSeconds?: number;
} = {
  isRunning: false,
  totalMessages: 0,
  sentMessages: 0,
  startTime: '',
  lastUpdated: '',
};
