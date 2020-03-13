import { ReminderPipe } from './reminder.datepipe';

describe('ReminderPipe', () => {
  it('create an instance', () => {
    const pipe = new ReminderPipe("");
    expect(pipe).toBeTruthy();
  });
});
