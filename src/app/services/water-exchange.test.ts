import { NoSolutionError } from "../../domain/errors/no-solution";
import { WaterExchangeService } from "./water-exchange"

describe('WaterExchangeService', () => {
  it('Fill bucket x and transfer to bucket Y until it is solved', () => {
    const bucketXCapacity = 2
    const bucketYCapacity = 10
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    const amountWanted = 4
    const transactions = sut.measure(amountWanted)
    expect(transactions).toEqual([
      {
        bucketX: 2,
        bucketY: 0,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 0,
        bucketY: 2,
        explanation: 'Transfer bucket X to bucket Y'
      },
      {
        bucketX: 2,
        bucketY: 2,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 0,
        bucketY: 4,
        explanation: 'Transfer bucket X to bucket Y. Solved'
      },
    ])
  })

  it('Fill bucket Y and transfer to bucket X until it is solved', () => {
    const bucketXCapacity = 10
    const bucketYCapacity = 2
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    const amountWanted = 6
    const transactions = sut.measure(amountWanted)
    expect(transactions).toEqual([
      {
        bucketX: 0,
        bucketY: 2,
        explanation: 'Fill bucket Y'
      },
      {
        bucketX: 2,
        bucketY: 0,
        explanation: 'Transfer bucket Y to bucket X'
      },
      {
        bucketX: 2,
        bucketY: 2,
        explanation: 'Fill bucket Y'
      },
      {
        bucketX: 4,
        bucketY: 0,
        explanation: 'Transfer bucket Y to bucket X'
      },
      {
        bucketX: 4,
        bucketY: 2,
        explanation: 'Fill bucket Y'
      },
      {
        bucketX: 6,
        bucketY: 0,
        explanation: 'Transfer bucket Y to bucket X. Solved'
      },
    ])
  })

  it('should decrement the biggest bucket if its the best approach.', () => {
    const bucketXCapacity = 2
    const bucketYCapacity = 12
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    const amountWanted = 8
    const transactions = sut.measure(amountWanted)

    expect(transactions).toEqual([
      {
        bucketX: 0,
        bucketY: 12,
        explanation: 'Fill bucket Y'
      },
      {
        bucketX: 2,
        bucketY: 10,
        explanation: 'Transfer bucket Y to bucket X'
      },
      {
        bucketX: 0,
        bucketY: 10,
        explanation: 'Dump bucket X'
      },
      {
        bucketX: 2,
        bucketY: 8,
        explanation: 'Transfer bucket Y to bucket X. Solved'
      },
    ])
  })

  it('Should isolate the rest as space available in small bucket, and add it to Y before start incrementing, when amountWanted is not divisible by X or Y', () => {
    const bucketXCapacity = 3
    const bucketYCapacity = 5
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    const amountWanted = 4
    const transactions = sut.measure(amountWanted)
    expect(transactions).toEqual([
      {
        bucketX: 3,
        bucketY: 0,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 0,
        bucketY: 3,
        explanation: 'Transfer bucket X to bucket Y'
      },
      {
        bucketX: 3,
        bucketY: 3,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 1,
        bucketY: 5,
        explanation: 'Transfer bucket X to bucket Y'
      },
      {
        bucketX: 1,
        bucketY: 0,
        explanation: 'Dump bucket Y'
      },
      {
        bucketX: 0,
        bucketY: 1,
        explanation: 'Transfer bucket X to bucket Y'
      },
      {
        bucketX: 3,
        bucketY: 1,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 0,
        bucketY: 4,
        explanation: 'Transfer bucket X to bucket Y. Solved'
      },
    ])
  })

  it('Return No Solution Error when its impossible.', () => {
    const bucketXCapacity = 3
    const bucketYCapacity = 9
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    try {
      const amountWanted = 4
      sut.measure(amountWanted)
    } catch (err) {
      expect(err).toBeInstanceOf(NoSolutionError)
    }
  })

  it('get the measurement asked if the amountWanted equals to x * 2 - y', () => {
    const bucketXCapacity = 3
    const bucketYCapacity = 5
    const sut = new WaterExchangeService(bucketXCapacity, bucketYCapacity);
    const amountWanted = 1
    const result = sut.measure(amountWanted)
    expect(result).toEqual([
      {
        bucketX: 3,
        bucketY: 0,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 0,
        bucketY: 3,
        explanation: 'Transfer bucket X to bucket Y'
      },
      {
        bucketX: 3,
        bucketY: 3,
        explanation: 'Fill bucket X'
      },
      {
        bucketX: 1,
        bucketY: 5,
        explanation: 'Transfer bucket X to bucket Y. Solved'
      },
    ])
  })
})