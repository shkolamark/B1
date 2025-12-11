import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/UI/table";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ColumnDef, TableProps } from "./types";

async function fetchData(url?: string) {
    console.log('Fetching ', url);
    if (!url) return null
    const res = await fetch(url, { cache: 'no-store' })
    console.log('Fetch response', res);
    if (!res.ok) throw new Error('Failed to fetch')
    console.log('Fetch data', await res.clone().json());
    return await res.json()
}

export async function MainTable<T = any>({ className, columns, data, fetchUrl, }: TableProps<T> & { labels?: any[] }) {
    let rows: T[] | null = data ?? null

    if (!rows) {
        try {
            rows = fetchUrl ?? await fetchData(fetchUrl)
        } catch (e) {
            rows = []
        }
    }

    // normalize { items, total } response from list API
    if (rows && (rows as any).items) rows = (rows as any).items


    const labels = (arguments[0] as any)?.labels
    columns = columns ?? (labels ? labels.map((l: any) => ({ id: l.id ?? l.name, header: l.name, accessor: l.name.toLowerCase?.() })) : (rows && rows.length ? Object.keys(rows[0] as unknown as Record<string, any>).map(k => ({ id: k, header: String(k), accessor: String(k) })) : [{ id: 'empty', header: 'No data', accessor: () => '' }]))

    return (
        <div
            className={cn(
                "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase">
                        {columns.map((col: ColumnDef<T>) => (
                            <TableHead className={col.headerClass} key={col.id}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rows && rows.length ? rows.map((row: any, i: number) => (
                        <TableRow
                            className="text-base font-medium text-dark dark:text-white"
                            key={(row.id ?? row.name ?? i).toString() + ':' + i}
                        >
                            {columns!.map((col: ColumnDef<T>) => {
                                const accessor = col.accessor
                                let value: any = ''
                                if (typeof accessor === 'function') {
                                    value = accessor(row)
                                } else if (typeof accessor === 'string') {
                                    if (accessor.includes('.')) {
                                        value = accessor.split('.').reduce((acc: any, k: string) => acc?.[k], row)
                                    } else {
                                        value = row?.[accessor]
                                    }
                                } else {
                                    value = row[col.id]
                                }
                                const content = col.render ? col.render(value, row, i) : value
                                return (
                                    <TableCell key={String(col.id)} className={col.className}>
                                        {content}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
