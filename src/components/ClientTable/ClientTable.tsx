
import { useReactTable, getCoreRowModel, getExpandedRowModel, flexRender } from '@tanstack/react-table';
import {useEffect} from 'react';
import { clientStore } from '../../store/сlientStore.ts';
import { observer } from 'mobx-react-lite';
import { columns } from "./Columns/Columns.tsx";
import type {Client} from "../../lib/types.ts";
import cls from './ClientTable.module.scss';
import ExpandedInformation from "../ExpandedInformation/ExpandedInformation.tsx";
import React from 'react';

const ClientTable = observer(() => {
  const table = useReactTable({
    data: clientStore.clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  useEffect(() => {
    clientStore.loadClients();
  }, []);

  return (
    <div className={cls.tableWrapper}>
      <table className={cls.table}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ width: header.getSize() }}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => {
          const client = row.original as Client;
          const isExpanded = clientStore.isExpanded(client.id);
          return (
            <React.Fragment key={row.id}>
              <tr
                key={row.id}
                className={cls.row}
                onClick={() => clientStore.toggleExpanded(client.id)}
                onMouseDown={(e) => {
                  if (window.getSelection()?.toString()) {
                    e.stopPropagation();
                  }
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={cls.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {isExpanded && (
                <tr className={cls.expandedRow}>
                  <td colSpan={columns.length}>
                    <ExpandedInformation client={client}/>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
        </tbody>
      </table>
    </div>
  );
});

export default ClientTable;
