import RowActions from '@/components/Tables/Actions/RowActions'
import PhoneTypesModal from '../components/PhoneTypesModal'

export const phoneTypesColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={PhoneTypesModal} apiPath="/api/tables/phones-types" successMessage="Тип телефона успешно удален!" /> },
]
