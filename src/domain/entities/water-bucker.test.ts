import { CapacityExceededError } from "../errors/capacity-exceeded";
import { WaterBucket } from "./water-bucket"

describe('WaterBucket', () => {
  it('should create an instance', () => {
    const capacity = 10;
    const sut = new WaterBucket(capacity, 'x');
    expect(sut).toBeInstanceOf(WaterBucket);
    expect(sut.capacity).toEqual(10);
  })
  it('should be filled with water', () => {
    const capacity = 10;
    const sut = new WaterBucket(capacity, 'x');
    sut.fill(10);
    expect(sut.currentAmount).toEqual(10);
  })
  it('should throw a new error when capacity is exceeded', () => {
    const capacity = 10;
    const sut = new WaterBucket(capacity, 'x');
    try {
      sut.fill(11)
    } catch (error) {
      expect(error).toBeInstanceOf(CapacityExceededError);
    }
  })
  it('should be dumped and return its latest amount', () => {
    const capacity = 10;
    const sut = new WaterBucket(capacity, 'x');
    sut.fill(10);
    const latestAmount = sut.dump();
    expect(sut.currentAmount).toEqual(0);
    expect(latestAmount).toEqual(10);
  })
})