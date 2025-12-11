import { Skeleton } from "@/components/UI/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/UI/table";
import { ColumnDef } from "./types";

export function MainTableSkeleton({ labels, columns }: { labels?: any[], columns?: ColumnDef[] }) {
    return (
        <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">

            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        {(columns || labels || []).map((col: any, i) =>
                            <TableHead className={col?.style || col?.headerClass} key={col?.id ?? i}>{col?.header ?? col?.name}</TableHead>

                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            {(columns || labels || []).length ? (
                                (columns || labels || []).map((col: any) => (
                                    <TableCell key={col?.id ?? col?.name}>
                                        <Skeleton className="h-8" />
                                    </TableCell>
                                ))
                            ) : (
                                <TableCell colSpan={100}>
                                    <Skeleton className="h-8" />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
