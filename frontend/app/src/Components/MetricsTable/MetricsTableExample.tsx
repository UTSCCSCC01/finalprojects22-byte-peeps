import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MetricsTable from "./MetricsTable";

const data = [
  { id: 1, firstName: 'Melisandre', lastName: null },
  { id: 2, firstName: 'Clifford', lastName: 'Ferrara' },
  { id: 3, firstName: 'Frances', lastName: 'Rossini' },
  { id: 4, firstName: 'Roxie', lastName: 'Harvey' },
  { id: 5, firstName: 'Jane', lastName: 'Eyre' },
  { id: 6, firstName: 'John', lastName: 'Doe' },
  { id: 7, firstName: 'Jason', lastName: 'Bateman' },
  { id: 8, firstName: 'Katy', lastName: 'Perry' },
  { id: 9, firstName: 'Taylor', lastName: 'Swift' },
  { id: 10, firstName: 'Bassel', lastName: 'Ashi' },
  { id: 11, firstName: 'Hugh', lastName: 'Jackman' },
  { id: 12, firstName: 'Kim', lastName: 'Kardashian' },
  { id: 13, firstName: 'Alan', lastName: 'Walker' },
  { id: 14, firstName: 'David', lastName: 'Guetta' }
]

const getPage = async (page: number, pageSize: number): Promise<{ count: number; data: any }> => {
  return new Promise<{ count: number; data: any }>((resolve) => {
    setTimeout(() => {
      const result = data.slice(page * pageSize, page * pageSize + pageSize);
      resolve({ count: data.length, data: result});
    }, 500);
  });
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

export default function MetricsTableExample() {
  return (
    <MetricsTable
      key="example"
      columns={columns}
      dataLoader={getPage}
    />
  );
}
