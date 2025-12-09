import RowActions from '@/components/Tables/Actions/RowActions'
import ServicesModal from '../components/ServicesModal'

export const servicesColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'serviceFee', header: 'Абонентская плата', accessor: 'serviceFee' },
    { id: 'description', header: 'Описание', accessor: 'description' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={ServicesModal} apiPath="/api/tables/services" successMessage="Услуга успешно удалена!" /> },
]
