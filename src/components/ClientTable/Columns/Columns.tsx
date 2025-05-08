import type {ColumnDef} from '@tanstack/react-table';
import type {Client, Offer} from '../../../lib/types.ts';
// import {clientStore} from "../../store/сlientStore.ts";
import '../../../styles/_vars.scss';
import cls from './Columns.module.scss'
import edit from '../../../assets/svg/edit.svg';
import view from '../../../assets/svg/view.svg';
import trash from '../../../assets/svg/trash.svg';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'status',
    header: '',
    size: 50,
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
    accessorKey: 'name',
    header: 'Client name',
    size: 250,
  },
  {
    accessorKey: 'start_date',
    header: 'Start date',
    size: 250
  },

  {
    accessorKey: 'balance_usd',
    header: 'Balance',
    size: 250,
    cell: ({ getValue }) => {
      const balance = getValue<number>();

      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(balance);
    }
  },
  {
    accessorKey: 'offers',
    header: 'Offers',
    size: 200,
    cell: ({getValue}) => {
      const offers = getValue<Offer[]>();
      return offers?.length ?? 0;
    }
  },
  {
    accessorKey: 'account_manager',
    header: 'Manager',
    size: 250,
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className={cls.manager}>
          <img
            src={client.account_manager_image || "/public/avatars/Userpic.jpg"}
            alt={client.account_manager}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span>{client.account_manager}</span>
        </div>
      );
    }
  },

  {
    id: 'actions',
    header: 'Actions',
    size: 250,
    cell: () => (
      <div className={cls.actionWrapper}>
        <div>
          <img
            src={view}
            alt="view"
            onClick={(e) => {
              e.stopPropagation()
              console.log('view')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
        <div>
          <img
            src={edit}
            alt="edit"
            onClick={(e) => {
              e.stopPropagation()
              console.log('edit')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
        <div>
          <img
            src={trash}
            alt="delete"
            onClick={(e) => {
              e.stopPropagation()
              console.log('delete')
            }}
            style={{width: 15, height: 15, cursor: 'pointer'}}
          />
        </div>
      </div>
    ),
  },
];
