import RowActions from '@/components/Tables/Actions/RowActions'
import TransactionsModal from '../components/TransactionsModal'

export const transactionsColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'client', header: 'Клиент', accessor: (r: any) => `${r.Clients?.family ?? ''} ${r.Clients?.name ?? ''}` },
    { id: 'phone', header: 'Номер', accessor: (r: any) => r.Phones?.number ?? '' },
    { id: 'amount', header: 'Сумма', accessor: 'amount' },
    { id: 'type', header: 'Тип', accessor: (r: any) => r.TransactionTypes?.name ?? '' },
    { id: 'date', header: 'Дата', accessor: (r: any) => r.transactionDate ? new Date(r.transactionDate).toLocaleDateString() : '' },
    { id: 'description', header: 'Описание', accessor: 'description' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={TransactionsModal} apiPath="/api/tables/transactions" successMessage="Транзакция успешно удалена!" /> },
]
