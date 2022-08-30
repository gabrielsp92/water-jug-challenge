export interface WaterExchange {
  measure: (bucketXCapacity: number, bucketYCapacity: number, amountWanted: number) => Transaction[]
}

export type Transaction = {
  bucketX: number,
  bucketY: number,
  explanation: string,
}