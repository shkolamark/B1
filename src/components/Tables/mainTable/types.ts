import { ReactNode } from 'react'

export type ColumnDef<T = any> = {
    id: string
    header: string
    accessor?: string | ((row: T) => any)
    render?: (value: any, row: T, index: number) => ReactNode
    className?: string
    headerClass?: string
    width?: string
}

export type TableProps<T = any> = {
    data?: T[]
    columns: ColumnDef<T>[]
    fetchUrl?: string
    className?: string
}

export type TableLabel = {
    id: number
    name: string
    style?: string
}

export type RowData = Record<string, any>

export default {} as unknown as void
export interface ILabel {
    id: number;
    name: string;
    style?: string;
}