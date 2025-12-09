import RowActions from '@/components/Tables/Actions/RowActions'
import ClientsModal from '../components/ClientsModal'

export const clientColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    {
        id: 'name',
        header: 'ФИО',
        accessor: (r: any) => `${r.family ?? ''} ${r.name ?? ''} ${r.secname ?? ''}`,
    },
    {
        id: 'birthday',
        header: 'День рождения',
        accessor: (r: any) =>
            r.birthday ? new Date(r.birthday).toLocaleDateString() : '',
    },
    { id: 'sex', header: 'Пол', accessor: 'sex' },
    {
        id: 'balance',
        header: 'Баланс',
        accessor: 'balance',
        render: (v: any) => `${Number(v).toFixed(2)}`,
    },
    { id: 'notes', header: 'Примечания', accessor: 'notes' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={ClientsModal} apiPath="/api/tables/clients" successMessage="Клиент успешно удален!" /> },
]
