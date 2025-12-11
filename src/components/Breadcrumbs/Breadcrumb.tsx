import Link from "next/link";
import ExportButton from './ExportButton'

interface BreadcrumbProps {
    pageName: string;
    exportable?: boolean;
    exportPath?: string;
    exportFileName?: string;
}

const Breadcrumb = ({ pageName, exportable, exportPath, exportFileName }: BreadcrumbProps) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white flex items-center gap-3">
                {pageName}
                {exportable && (
                    <span className="ml-3">
                        <ExportButton exportPath={exportPath} fileName={exportFileName} />
                    </span>
                )}
            </h2>
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium" href="/">
                            Панель /
                        </Link>
                    </li>
                    <li className="font-medium text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
