import { Racer } from '../../types/racer.interface';

describe('Racer interface', () => {
  it('should create a racer with required properties', () => {
    const racer: Racer = {
      name: 'John Doe',
      colorTag: '#ff0000',
      timeStamp: '1:30.000',
    };

    expect(racer.name).toBe('John Doe');
    expect(racer.colorTag).toBe('#ff0000');
    expect(racer.timeStamp).toBe('1:30.000');
  });

  it('should create a racer with all properties including optional id', () => {
    const racer: Racer = {
      id: 1,
      name: 'Jane Doe',
      colorTag: '#00ff00',
      timeStamp: '1:35.500',
    };

    expect(racer.id).toBe(1);
    expect(racer.name).toBe('Jane Doe');
    expect(racer.colorTag).toBe('#00ff00');
    expect(racer.timeStamp).toBe('1:35.500');
  });

  it('should allow racer creation without id', () => {
    const racer: Racer = {
      name: 'Test Racer',
      colorTag: '#0000ff',
      timeStamp: '1:40.000',
    };

    expect(racer.id).toBeUndefined();
    expect(racer.name).toBe('Test Racer');
  });

  it('should accept different time formats', () => {
    const times = ['1:33.643', '2:15.500', '0:59.999'];
    
    times.forEach((time) => {
      const racer: Racer = {
        name: 'Test',
        colorTag: '#fff',
        timeStamp: time,
      };
      
      expect(racer.timeStamp).toBe(time);
    });
  });

  it('should accept different hex color formats', () => {
    const colors = ['#fff', '#ffffff', '#ffa500', '#2244ff'];
    
    colors.forEach((color) => {
      const racer: Racer = {
        name: 'Test',
        colorTag: color,
        timeStamp: '1:30.000',
      };
      
      expect(racer.colorTag).toBe(color);
    });
  });
});
