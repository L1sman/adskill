import React, {useState} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnFiltersState,
  type ColumnFilter
} from '@tanstack/react-table';
import {observer} from 'mobx-react-lite';
import {columns} from "./TermsTableColumns/TermsTableColumns.tsx";
import type {Client} from "../../../lib/types.ts";
import cls from '../OffersTable/OffersTable.module.scss';
import SearchIcon from '../../../assets/svg/search.svg?react';
import Arrow from '../../../assets/svg/arrow.svg?react';
import Plus from '../../../assets/svg/plus.svg?react';


const TermsTable = observer(({client}: { client: Client }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: client.payment_terms,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  const titleFilter = columnFilters.find((filter: ColumnFilter) => filter.id === 'title')?.value as string || '';
  const statusFilter = columnFilters.find((filter: ColumnFilter) => filter.id === 'status')?.value as string || '';

  const updateFilter = (id: string, value: string) => {
    setColumnFilters((old) => {
      const newFilters = old.filter((filter) => filter.id !== id);
      if (value) {
        newFilters.push({id, value});
      }
      return newFilters;
    });
  };

  return (
    <div className={cls.subTableContainer}>
      <h3 className={cls.tableTitle}>Payment Terms</h3>
      <div className={cls.tableHandlers}>
        <div className={cls.offerAddWrapper}>
          <button type={"button"} className={cls.offerAdd}>
            <span>New Terms</span>
            <Plus className={cls.plus}/></button>
        </div>
        <div className={cls.filters}>
          <div className={cls.searchWrapper}>
            <SearchIcon className={cls.searchIcon}/>
            <input
              type="text"
              placeholder="Search offers"
              value={titleFilter}
              onChange={(e) => updateFilter('title', e.target.value)}
              className={cls.filterInput}
            />
          </div>
          <div className={cls.selectWrapper}>
            <select
              value={statusFilter}
              onChange={(e) => updateFilter('status', e.target.value)}
              className={cls.filterSelect}
            >
              <option value="">Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <Arrow className={cls.arrowIcon}/>
          </div>
        </div>
      </div>
      <div className={cls.tableWrapper}>
        <table className={cls.table}>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{width: header.getSize()}}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <React.Fragment key={row.id}>
                <tr
                  key={row.id}
                  className={cls.row}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={cls.cell}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default TermsTable;
