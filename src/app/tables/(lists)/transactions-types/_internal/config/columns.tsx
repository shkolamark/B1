import RowActions from '@/components/Tables/Actions/RowActions'
import TransactionTypesModal from '../components/TransactionTypesModal'

export const transactionTypesColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={TransactionTypesModal} apiPath="/api/tables/transactions-types" successMessage="Тип транзакции успешно удален!" /> },
]
