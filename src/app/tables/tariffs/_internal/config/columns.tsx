import RowActions from '@/components/Tables/Actions/RowActions'
import TariffsModal from '../components/TariffsModal'

export const tariffsColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'name', header: 'Название', accessor: 'name' },
    { id: 'monthlyFee', header: 'Ежемесячная плата', accessor: 'monthlyFee' },
    { id: 'minutesIncluded', header: 'Включённые минуты', accessor: 'minutesIncluded' },
    { id: 'pricePerMinOver', header: 'Цена за минуту', accessor: 'pricePerMinOver' },
    { id: 'description', header: 'Описание', accessor: 'description' },
    { id: 'actions', header: 'Действия', render: (_v: any, r: any) => <RowActions row={r} modalComponent={TariffsModal} apiPath="/api/tables/tariffs" successMessage="Тариф успешно удален!" /> },
]
