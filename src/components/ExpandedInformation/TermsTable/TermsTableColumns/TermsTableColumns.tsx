import type {ColumnDef} from '@tanstack/react-table';
import type {PaymentTerm} from '../../../../lib/types.ts';
import edit from '../../../../assets/svg/edit.svg';
import view from '../../../../assets/svg/view.svg';
import trash from '../../../../assets/svg/trash.svg';
import cls from '../../../ClientTable/Columns/Columns.module.scss';


export const columns: ColumnDef<PaymentTerm>[] = [
  {
    accessorKey: 'status',
    header: '',
    size: 50,
    filterFn: "equals",
    cell: ({getValue}) => {
      const status = getValue<string>();
      const isActive = status === 'ACTIVE';
      return (
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isActive ? '#68DB3B' : '#717378',
            margin: '0 auto'
          }}
        />
      );
    },
  },
  {
    accessorKey: 'payment_method',
    header: 'Payment method',
    size: 250,
    filterFn: 'includesString',
    cell: ({ row, getValue }) => {
      const title = getValue<string>();
      const id = row.original.id;
      return (
        <div>
          <div style={{textAlign: 'start'}}>{title}</div>
          <div style={{ fontSize: '10px', color: '#333333', opacity: '0.7', textAlign: 'start' }}>ID {id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'exchange_extras',
    header: 'Exchange extras',
    size: 250,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `${(value).toFixed(2)}%`;
    }
  },

  {
    accessorKey: 'vat',
    header: 'Vat',
    size: 250,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return `${(value).toFixed(2)}%`;
    }
  },
  {
    accessorKey: 'start_date',
    header: 'Start date',
    size: 200,
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 250,
    cell: () => (
      <div className={cls.actionWrapper}>
        <div>
          <img
            src={edit}
            alt="edit"
            onClick={() => {
              console.log('edit')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
        <div>
          <img
            src={view}
            alt="view"
            onClick={() => {
              console.log('view')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
        <div>
          <img
            src={trash}
            alt="delete"
            onClick={() => {
              console.log('delete')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
      </div>
    ),
  },
];
