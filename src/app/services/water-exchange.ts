import { WaterBucket } from "../../domain/entities/water-bucket"
import { WaterExchange, Transaction } from "../../domain/use-cases/water-exchange"
import { NoSolutionError } from "../../domain/errors/no-solution"

export enum ActionsAllowed {
  Fill = 'Fill',
  Transfer = 'Transfer',
  Dump = 'Dump'
}

export class WaterExchangeService implements WaterExchange {
  buckets: Array<WaterBucket>
  transactions: Array<Transaction>

  constructor(bucketXCapacity: number, bucketYCapacity: number) {
    this.buckets = [
      new WaterBucket(bucketXCapacity, 'X'),
      new WaterBucket(bucketYCapacity, 'Y')
    ].sort((a, b) => a.capacity > b.capacity ? 0 : -1)
  }

  private validateRules(amountWanted: number) {
    const [smallBucket, bigBucket] = this.buckets
    if (
      amountWanted < smallBucket.capacity
      && amountWanted < smallBucket.capacity + bigBucket.capacity
      && amountWanted % smallBucket.capacity > 0
      && amountWanted % bigBucket.capacity > 0
      && amountWanted % (bigBucket.capacity + smallBucket.capacity) > 0
      && amountWanted % (bigBucket.capacity % smallBucket.capacity) != 0
      && amountWanted !== smallBucket.capacity * 2 - bigBucket.capacity
    ) {
      throw new NoSolutionError()
    }
  }

  private commitTransaction(action: ActionsAllowed, sourceBucket: WaterBucket, targetBucket?: WaterBucket) {
    let explanation = `${action} bucket ${sourceBucket.identifier}`
    if (targetBucket) {
      explanation = `${explanation} to bucket ${targetBucket?.identifier}`
    }
    const transactionStrategy = {
      [ActionsAllowed.Fill]: () => sourceBucket.fill(),
      [ActionsAllowed.Dump]: () => sourceBucket.dump(),
      [ActionsAllowed.Transfer]: () => {
        const availableSpace = targetBucket?.getAvailableSpace() || 0
        const leftOver = availableSpace || 0 < sourceBucket.currentAmount
          ? sourceBucket.currentAmount - availableSpace || 0
          : 0
        targetBucket?.fill(sourceBucket.pour(sourceBucket.currentAmount - leftOver))
      },
    }
    transactionStrategy[action]()
    this.transactions.push({
      bucketX: this.buckets[0].identifier === 'X' ? this.buckets[0].currentAmount : this.buckets[1].currentAmount,
      bucketY: this.buckets[0].identifier === 'Y' ? this.buckets[0].currentAmount : this.buckets[1].currentAmount,
      explanation
    })
  }

  private getSummary() {
    const { transactions } = this
    const latestTransactionIndex = transactions.length - 1
    const { explanation } = transactions[latestTransactionIndex]
    this.transactions[latestTransactionIndex].explanation = `${explanation}. Solved`
    return this.transactions
  }

  measure(amountWanted: number) {
    this.validateRules(amountWanted);
    this.transactions = []
    const [smallBucket, bigBucket] = this.buckets

    if (smallBucket.capacity === amountWanted) {
      this.commitTransaction(ActionsAllowed.Fill, smallBucket)
      return this.getSummary()
    }

    if (bigBucket.capacity === amountWanted) {
      this.commitTransaction(ActionsAllowed.Fill, bigBucket)
      return this.getSummary()
    }

    if (bigBucket.capacity + smallBucket.capacity === amountWanted) {
      this.commitTransaction(ActionsAllowed.Fill, smallBucket)
      this.commitTransaction(ActionsAllowed.Fill, bigBucket)
      return this.getSummary()
    }

    if (
      amountWanted % (bigBucket.capacity % smallBucket.capacity) === 0
      || amountWanted === smallBucket.capacity * 2 - bigBucket.capacity
    ) {
      const rest = bigBucket.capacity % smallBucket.capacity
      while (smallBucket.capacity - smallBucket.currentAmount !== rest) {
        if (smallBucket.isEmpty()) {
          this.commitTransaction(ActionsAllowed.Fill, smallBucket)
        }
        this.commitTransaction(ActionsAllowed.Transfer, smallBucket, bigBucket)
        if (bigBucket.currentAmount === amountWanted) return this.getSummary()
        if (bigBucket.currentAmount + smallBucket.currentAmount === amountWanted) return this.getSummary()
      }
      if (amountWanted === smallBucket.currentAmount) return this.getSummary();
      this.commitTransaction(ActionsAllowed.Dump, bigBucket)
    }

    const amountWantedIsCloserToBigBucketCapacity = Math.abs(amountWanted - bigBucket.capacity) < Math.abs(amountWanted - smallBucket.capacity)
    if (amountWantedIsCloserToBigBucketCapacity) {
      this.commitTransaction(ActionsAllowed.Fill, bigBucket)
    }

    while (bigBucket.currentAmount > amountWanted) {
      if (!smallBucket.isEmpty()) {
        this.commitTransaction(ActionsAllowed.Dump, smallBucket)
      }
      this.commitTransaction(ActionsAllowed.Transfer, bigBucket, smallBucket)
    }

    while (bigBucket.currentAmount < amountWanted) {
      if (smallBucket.isEmpty()) {
        this.commitTransaction(ActionsAllowed.Fill, smallBucket)
      }
      this.commitTransaction(ActionsAllowed.Transfer, smallBucket, bigBucket)
    }

    return this.getSummary()
  }
}