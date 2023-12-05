import {useState} from 'react';
// @mui
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridRenderCellParams, GridRowId, GridRowSelectionModel,
  GridSortItem,
  GridSortModel,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
// utils
// components
import {CustomAvatar} from 'src/components/custom-avatar';
import {
  NurseSortType,
  NurseFilterType,
  NursesQueryResponseDataItem,
} from "src/_requests/Maja";
import CircularProgressWithLabel from "src/components/progress/CircularProgressWithLabel";
import {Badge, IconButton, MenuItem} from "@mui/material";
import Iconify from "src/components/iconify";
import {useRouter} from "next/router";
import {PATH_DASHBOARD} from "src/routes/paths";
import MenuPopover from "src/components/menu-popover";
import {CreateNurseStepsEnum} from "src/@types/redux/nurse";
import {CreateNurseSteps} from "src/sections/nurse/NurseNewFormSteps/steps";
import {NurseSortTypeKeys} from "src/_requests/keys/NurseSortTypeKeys";
import {NurseFilterTypeKeys} from "src/_requests/keys/NurseFilterTypeKeys";
import {useNursesQuery} from "src/api-hooks/nurse/useNursesQuery";

// ----------------------------------------------------------------------
const columns: GridColDef[] = [
  // {
  //   field: 'id',
  //   hideable: true,
  // },
  {
    field: 'avatarUrl',
    headerName: 'Avatar',
    align: 'center',
    headerAlign: 'center',
    width: 64,
    sortable: NurseSortTypeKeys.includes('avatarUrl'),
    filterable: NurseFilterTypeKeys.includes('avatarUrl'),
    disableColumnMenu: true,
    renderCell: ({row: {user}}: GridRenderCellParams<any, NursesQueryResponseDataItem>) =>
      <CustomAvatar src={user?.avatarUrl} name={user?.firstName} sx={{width: 36, height: 36}}/>,
  },
  {
    field: 'user.firstName',
    headerName: 'First Name',
    filterable: NurseFilterTypeKeys.includes('user.firstName'),
    sortable: NurseSortTypeKeys.includes('user.firstName'),
    valueGetter: (params: GridValueGetterParams<any, NursesQueryResponseDataItem>) => `${params.row.user?.firstName}`,
    flex: 1,
  },
  {
    field: 'user.lastName',
    headerName: 'Last Name',
    filterable: NurseFilterTypeKeys.includes('user.lastName'),
    sortable: NurseSortTypeKeys.includes('user.lastName'),
    valueGetter: (params: GridValueGetterParams<any, NursesQueryResponseDataItem>) => `${params.row.user?.lastName}`,
    flex: 1,
  },
  {
    field: 'user.role',
    headerName: 'Role',
    filterable: NurseFilterTypeKeys.includes('user.role'),
    sortable: NurseSortTypeKeys.includes('user.role'),
    valueGetter: (params: GridValueGetterParams<any, NursesQueryResponseDataItem>) => `${params.row.user?.role}`,
    flex: 1,
  },
  {
    field: 'user.phone',
    headerName: 'Phone Number',
    filterable: NurseFilterTypeKeys.includes('user.phone'),
    sortable: NurseSortTypeKeys.includes('user.phone'),
    valueGetter: (params: GridValueGetterParams<any, NursesQueryResponseDataItem>) => `${params.row.user?.phone}`,
    flex: 1,
  },
  {
    field: "grace",
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerName: 'Grace',
    filterable: NurseFilterTypeKeys.includes('grace'),
    sortable: NurseSortTypeKeys.includes('grace'),
    disableColumnMenu: true,
    renderCell: ({row: {grace}}: GridRenderCellParams<any, NursesQueryResponseDataItem>) => (
      <Badge color="success" showZero badgeContent={grace || 0}/>
    ),
  },
  {
    field: 'warning',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerName: 'Warning',
    filterable: NurseFilterTypeKeys.includes('warning'),
    sortable: NurseSortTypeKeys.includes('warning'),
    disableColumnMenu: true,
    renderCell: ({row: {warning}}: GridRenderCellParams<any, NursesQueryResponseDataItem>) => (
      <Badge color="warning" showZero badgeContent={warning || 0}/>
    ),
  },
  {
    field: 'progress',
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    headerName: 'Progress',
    filterable: NurseFilterTypeKeys.includes('progress'),
    sortable: NurseSortTypeKeys.includes('progress'),
    disableColumnMenu: true,
    renderCell: ({row: {progress}}: GridRenderCellParams<any, NursesQueryResponseDataItem>) => (
      <CircularProgressWithLabel size="small" value={progress || 20}/>
    ),
  },
  {
    field: 'Action',
    headerName: '',
    align: 'right',
    width: 40,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<any, NursesQueryResponseDataItem>) => (
      <ActionsMenu userId={params.row.user?.id?.toString()} nurseId={params.row.id?.toString()}/>
    )
  },
];

// ----------------------------------------------------------------------
type ActionsMenuProps = {
  userId: string | undefined;
  nurseId: string | undefined;
}

function ActionsMenu({userId, nurseId}: ActionsMenuProps) {
  const {push} = useRouter();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuAnchor(null);
  }

  const handleEdit = () => {
    push(PATH_DASHBOARD.nurse.edit(CreateNurseSteps[CreateNurseStepsEnum.PersonalInfo].path, userId, nurseId));
  };

  return (
    <>
      <IconButton onClick={openMenu}>
        <Iconify icon="eva:more-vertical-fill"/>
      </IconButton>
      <MenuPopover
        open={menuAnchor}
        onClose={closeMenu}
        arrow="right-top"
        sx={{width: 160}}
      >
        <MenuItem onClick={() => {
        }}>
          <Iconify icon="icon-park-outline:nurse-cap"/>
          View Profile
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Iconify icon="uil:edit"/>
          Edit Nurse
        </MenuItem>
        <MenuItem onClick={() => {
        }}>
          <Iconify icon="ph:user-list"/>
          Nurse Details
        </MenuItem>
      </MenuPopover>
    </>
  )
}

// ----------------------------------------------------------------------


export default function NurseDataGrid() {
  const [nurseFilters, setNurseFilters] = useState<NurseFilterType>({})
  const [nurseSorts, setNurseSorts] = useState<NurseSortType>({})

  const handleSorts = (model: GridSortModel) => {
    const newNurseSort = model.reduce((acc: NurseSortType, item: GridSortItem) => {
      return {...acc, [item.field]: {op: item.sort}}
    }, {})
    setNurseSorts(newNurseSort)
  }

  const handleFilter = (model: GridFilterModel) => {
    const newNurseFilters = model.items.reduce((acc: NurseFilterType, item: GridFilterItem) => {
      const _value = typeof item.value === 'object' ? item.value.join(",") : item.value
      return {...acc, [item.field]: {op: item.operator, value: _value}}
    }, {})
    setNurseFilters(newNurseFilters)
  }

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  const {data: nursesResult, isLoading} = useNursesQuery({
    filters: nurseFilters,
    sorts: nurseSorts,
    limit: pageSize,
    page: page + 1
  })

  const nurses = nursesResult?.data?.items || []
  const totalRows = nursesResult?.data?.totalRows || 0

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const selected = nurses?.filter((nurseRow: NursesQueryResponseDataItem) => selectionModel.includes(nurseRow.id as GridRowId));
  if (selected.length) console.log("selected nurses", selected)

  console.log(nurses)

  return (
    <DataGrid
      pagination
      paginationMode="server"
      pageSizeOptions={[25,11, 8, 5]}
      onPaginationModelChange={(newPage) => {
        setPage(newPage.page);
        setPageSize(newPage.pageSize);
      }}
      paginationModel={{page, pageSize}}
      rowCount={totalRows}
      loading={isLoading}
      // autoHeight
      // checkboxSelection
      disableRowSelectionOnClick
      rows={nurses}
      columns={columns}
      sortingMode='server'
      onSortModelChange={handleSorts}
      filterMode='server'
      onFilterModelChange={handleFilter}
      onRowSelectionModelChange={(newSelectionModel) => {
        setSelectionModel(newSelectionModel);
      }}
      // componentsProps={{Toolbar: GridToolbar}}
    />
  );
}

// ----------------------------------------------------------------------

// function RenderStatus(getStatus: string) {
//   const theme = useTheme();
//   const isLight = theme.palette.mode === 'light';
//   return (
//     <Label
//       variant={isLight ? 'soft' : 'filled'}
//       color={(getStatus === 'busy' && 'error') || (getStatus === 'away' && 'warning') || 'success'}
//       sx={{mx: 'auto'}}
//     >
//       {getStatus}
//     </Label>
//   );
// }
//
// // ----------------------------------------------------------------------
//
// function RatingInputValue({item, applyValue}: GridFilterInputValueProps) {
//   return (
//     <Box sx={{p: 1, height: 1, alignItems: 'flex-end', display: 'flex'}}>
//       <Rating
//         size="small"
//         precision={0.5}
//         placeholder="Filter value"
//         value={Number(item.value)}
//         onChange={(event, newValue) => {
//           applyValue({...item, value: newValue});
//         }}
//       />
//     </Box>
//   );
// }
