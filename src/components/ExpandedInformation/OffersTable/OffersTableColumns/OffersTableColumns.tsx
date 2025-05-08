import type {ColumnDef} from '@tanstack/react-table';
import type {Offer} from '../../../../lib/types.ts';
import edit from '../../../../assets/svg/edit.svg';
import view from '../../../../assets/svg/view.svg';
import trash from '../../../../assets/svg/trash.svg';
import cls from '../../../ClientTable/Columns/Columns.module.scss';
import facebook from '../../../../assets/svg/facebook.svg';
import google from '../../../../assets/svg/google.svg';
import tiktok from '../../../../assets/svg/tiktok.svg';




export const columns: ColumnDef<Offer>[] = [
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
    accessorKey: 'title',
    header: 'Title',
    size: 250,
    filterFn: 'includesString',
    cell: ({ row, getValue }) => {
      const title = getValue<string>();
      const id = row.original.id;
      return (
        <div>
          <div style={{textAlign: 'start'}}>{title}</div>
          <div style={{ fontSize: '12px', color: '#333333', opacity: '0.7', textAlign: 'start' }}>ID {id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'sources',
    header: 'Sources',
    size: 250,
    cell: ({ getValue }) => {
      const sources = getValue<string[]>();
      const maxIcons = 3;
      const displayedSources = sources.slice(0, maxIcons);
      const extraCount = sources.length - maxIcons;

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' , justifyContent: 'center'}}>
          {displayedSources.map((source, index) => {
            let iconSrc = '';
            switch (source.toLowerCase()) {
              case 'google':
                iconSrc = google;
                break;
              case 'facebook':
                iconSrc = facebook;
                break;
              case 'tiktok':
                iconSrc = tiktok
                break;
              default:
                iconSrc = view;
            }
            return (
              <img
                key={index}
                src={iconSrc}
                alt={`${source} icon`}
                style={{ width: '15px', height: '15px', borderRadius: '50%' }}
                onError={(e) => {
                  e.currentTarget.src = view;
                }}
              />
            );
          })}
          {extraCount > 0 && (
            <div
              style={{
                width: '23px',
                height: '23px',
                borderRadius: '50%',
                backgroundColor: '#2A32ED',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                lineHeight: '12px'
              }}
            >
              {extraCount}
              <span style={{ fontSize: '12px', lineHeight: '12px', marginBottom: '1px' }}>+</span>
            </div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: 'spend',
    header: 'Spend',
    size: 250,
    cell: ({ getValue }) => {
      const amount = getValue<number>();

      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
  },
  {
    accessorKey: 'profit',
    header: 'Profit',
    size: 200,
    cell: ({ getValue }) => {
      const profit = getValue<number>();

      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(profit);
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
