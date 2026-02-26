import type { ColumnDef } from "@tanstack/react-table";
import type { Character } from "@/api/character/types";

export const columns: ColumnDef<Character>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Strength',
    accessorKey: 'strength',
  },
  {
    header: 'Dexterity',
    accessorKey: 'dexterity',
  },
  {
    header: 'Endurance',
    accessorKey: 'endurance',
  },
  {
    header: 'Intelligence',
    accessorKey: 'intellect',
  },
  {
    header: 'Education',
    accessorKey: 'education',
  },
  {
    header: 'Social',
    accessorKey: 'social',
  },
]