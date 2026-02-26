import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import type { Character } from '@/api/character/types'
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable, type FilterFn } from '@tanstack/react-table';
import { columns } from '@/table/character/view';
import { rankItem } from '@tanstack/match-sorter-utils';
import { characterApi } from '@/api/character/character.api';

export const Route = createFileRoute('/character/view')({
  component: RouteComponent,
})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function RouteComponent() {

  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    characterApi.getAll().then((data) => {
      setData(data);
    });
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
  })
  
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl pb-2 font-bold">View Characters</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm">
          <thead className="text-md bg-gray-200 border-b border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-200 transition-colors divide-x divide-gray-700">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
