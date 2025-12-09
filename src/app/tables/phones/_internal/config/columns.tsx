import RowActions from '@/components/Tables/Actions/RowActions'
import PhonesModal from '../components/PhonesModal'

export const phonesColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'number', header: 'Номер', accessor: 'number' },
    { id: 'client', header: 'Клиент', accessor: (r: any) => `${r.Clients?.family ?? ''} ${r.Clients?.name ?? ''}` },
    { id: 'type', header: 'Тип', accessor: (r: any) => r.PhoneTypes?.name ?? '' },
    { id: 'tariff', header: 'Тариф', accessor: (r: any) => r.Tariffs?.name ?? '' },
    { id: 'notes', header: 'Примечания', accessor: 'notes' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={PhonesModal} apiPath="/api/tables/phones" successMessage="Телефон успешно удален!" /> },
]
