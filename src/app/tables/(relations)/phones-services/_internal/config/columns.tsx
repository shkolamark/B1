import RowActions from '@/components/Tables/Actions/RowActions'
import PhonesServicesModal from '../components/PhonesServicesModal'

export const phonesServicesColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'phone', header: 'Номер', accessor: (r: any) => r.Phones?.number ?? '' },
    { id: 'service', header: 'Услуга', accessor: (r: any) => r.Services?.name ?? '' },
    { id: 'connectDate', header: 'Дата подключения', accessor: (r: any) => r.connectDate ? new Date(r.connectDate).toLocaleDateString() : '' },
    { id: 'notes', header: 'Примечания', accessor: 'notes' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={PhonesServicesModal} apiPath="/api/tables/phones-services" successMessage="Услуга успешно удалена!" /> },
]
