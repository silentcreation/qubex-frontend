import { envConfig } from '../config/envConfig'
import { useQuery } from '@tanstack/react-query'
import type {
    Asset,
    AssetOrder,
    AveragePrice,
    EntityOrder,
    IssuedAsset,
    Trade,
    Transfer
} from './qx.types'

export const BASE_URL = `${envConfig.QX_API_URL}/v1/qx`

async function fetcher<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`)
    if (!res.ok) {
        throw new Error('Network error')
    }
    return res.json()
}

export const getAssets = async (): Promise<Asset[]> =>
    fetcher<Asset[]>('/assets')

export const getTrades = async (): Promise<Trade[]> =>
    fetcher<Trade[]>('/trades')

export const getTransfers = async (): Promise<Transfer[]> =>
    fetcher<Transfer[]>('/transfers')

export const getIssuedAssets = async (): Promise<IssuedAsset[]> =>
    fetcher<IssuedAsset[]>('/issued-assets')

export const getEntityAskOrders = async ({ entity }: { entity: string }): Promise<EntityOrder[]> =>
    fetcher<EntityOrder[]>(`/entity/${entity}/asks`)

export const getEntityBidOrders = async ({ entity }: { entity: string }): Promise<EntityOrder[]> =>
    fetcher<EntityOrder[]>(`/entity/${entity}/bids`)

export const getEntityTrades = async ({ entity }: { entity: string }): Promise<Trade[]> =>
    fetcher<Trade[]>(`/entity/${entity}/trades`)

export const getEntityTransfers = async ({ entity }: { entity: string }): Promise<Transfer[]> =>
    fetcher<Transfer[]>(`/entity/${entity}/transfers`)

export const getAssetAskOrders = async ({ issuer, asset }: { issuer: string; asset: string }): Promise<AssetOrder[]> =>
    fetcher<AssetOrder[]>(`/issuer/${issuer}/asset/${asset}/asks`)

export const getAssetBidOrders = async ({ issuer, asset }: { issuer: string; asset: string }): Promise<AssetOrder[]> =>
    fetcher<AssetOrder[]>(`/issuer/${issuer}/asset/${asset}/bids`)

export const getAssetTrades = async ({ issuer, asset }: { issuer: string; asset: string }): Promise<Trade[]> =>
    fetcher<Trade[]>(`/issuer/${issuer}/asset/${asset}/trades`)

export const getAssetTransfers = async ({ issuer, asset }: { issuer: string; asset: string }): Promise<Transfer[]> =>
    fetcher<Transfer[]>(`/issuer/${issuer}/asset/${asset}/transfers`)

export const getAssetChartAveragePrice = async ({ issuer, asset }: { issuer: string; asset: string }): Promise<AveragePrice[]> =>
    fetcher<AveragePrice[]>(`/issuer/${issuer}/asset/${asset}/chart/average-price`)

// React Query Hooks
export function useGetAssets() {
    return useQuery({
        queryKey: ['assets'],
        queryFn: getAssets
    })
}

export function useGetTrades() {
    return useQuery({
        queryKey: ['trades'],
        queryFn: getTrades
    })
}

export function useGetTransfers() {
    return useQuery({
        queryKey: ['transfers'],
        queryFn: getTransfers
    })
}

export function useGetIssuedAssets() {
    return useQuery({
        queryKey: ['issuedAssets'],
        queryFn: getIssuedAssets
    })
}

export function useGetEntityAskOrders(entity: string) {
    return useQuery({
        queryKey: ['entityAskOrders', entity],
        queryFn: () => getEntityAskOrders({ entity }),
        enabled: !!entity
    })
}

export function useGetEntityBidOrders(entity: string) {
    return useQuery({
        queryKey: ['entityBidOrders', entity],
        queryFn: () => getEntityBidOrders({ entity }),
        enabled: !!entity
    })
}

export function useGetEntityTrades(entity: string) {
    return useQuery({
        queryKey: ['entityTrades', entity],
        queryFn: () => getEntityTrades({ entity }),
        enabled: !!entity
    })
}

export function useGetEntityTransfers(entity: string) {
    return useQuery({
        queryKey: ['entityTransfers', entity],
        queryFn: () => getEntityTransfers({ entity }),
        enabled: !!entity
    })
}

export function useGetAssetAskOrders(issuer: string, asset: string) {
    return useQuery({
        queryKey: ['assetAskOrders', issuer, asset],
        queryFn: () => getAssetAskOrders({ issuer, asset }),
        enabled: !!issuer && !!asset
    })
}

export function useGetAssetBidOrders(issuer: string, asset: string) {
    return useQuery({
        queryKey: ['assetBidOrders', issuer, asset],
        queryFn: () => getAssetBidOrders({ issuer, asset }),
        enabled: !!issuer && !!asset
    })
}

export function useGetAssetTrades(issuer: string, asset: string) {
    return useQuery({
        queryKey: ['assetTrades', issuer, asset],
        queryFn: () => getAssetTrades({ issuer, asset }),
        enabled: !!issuer && !!asset
    })
}

export function useGetAssetTransfers(issuer: string, asset: string) {
    return useQuery({
        queryKey: ['assetTransfers', issuer, asset],
        queryFn: () => getAssetTransfers({ issuer, asset }),
        enabled: !!issuer && !!asset
    })
}

export function useGetAssetChartAveragePrice(issuer: string, asset: string) {
    return useQuery({
        queryKey: ['assetChartAveragePrice', issuer, asset],
        queryFn: () => getAssetChartAveragePrice({ issuer, asset }),
        enabled: !!issuer && !!asset
    })
}
