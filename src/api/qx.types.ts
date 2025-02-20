// src/apis/qx.types.ts

export type Asset = {
    issuer: string
    name: string
  }
  
  export type AssetOrder = {
    entityId: string
    price: number
    numberOfShares: number
  }
  
  export type AveragePrice = {
    time: string
    averagePrice: number
  }
  
  export type EntityOrder = {
    issuerId: string
    assetName: string
    price: number
    numberOfShares: number
  }
  
  export type IssuedAsset = {
    tickTime: string
    hash: string
    source: string
    amount: number
    tick: number
    extraData: {
      name: string
      numberOfShares: number
      numberOfDecimalPlaces: number
    }
    moneyFlew: boolean
  }
  
  export type Trade = {
    tickTime: string
    transactionHash: string
    taker: string
    maker: string
    issuer: string
    assetName: string
    bid: boolean
    price: number
    numberOfShares: number
  }
  
  export type Transfer = {
    tickTime: string
    hash: string
    source: string
    amount: number
    tick: number
    extraData: {
      issuer: string
      name: string
      newOwner: string
      numberOfShares: number
    }
    moneyFlew: boolean
  }
  