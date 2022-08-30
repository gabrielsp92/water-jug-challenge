import { CapacityExceededError } from "../errors/capacity-exceeded";

export class WaterBucket {
  currentAmount: number
  capacity: number
  identifier: string

  constructor(capacity: number, identifier: string) {
    this.identifier = identifier
    this.currentAmount = 0
    this.capacity = capacity
  }
  fill(amount?: number) {
    const desiredAmount = amount ? this.currentAmount + amount : this.capacity;
    if (this.capacity < desiredAmount) {
      this.currentAmount = this.capacity
    }
    this.currentAmount = desiredAmount
  }
  dump() {
    const currentAmount = this.currentAmount;
    this.currentAmount = 0;
    return currentAmount
  }
  pour(amount: number) {
    this.currentAmount -= amount
    if (this.currentAmount < 0) {
      const realAmount = amount + this.currentAmount
      this.currentAmount = 0
      return realAmount;
    }
    return amount
  }
  isEmpty() {
    return this.currentAmount === 0
  }
  getAvailableSpace() {
    return this.capacity - this.currentAmount
  }
}