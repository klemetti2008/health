import {useCallback, useMemo, useState} from 'react';
// @mui
import {
  DataGrid,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridRenderCellParams, GridRowId, GridRowSelectionModel,
  GridSortItem,
  GridSortModel, GridValueGetterParams,
} from '@mui/x-data-grid';
// utils
// components
import {
  ApiError,
  UserSortType,
  AddressesQueryResponseDataItem,
  NursesQueryPermissionsFilterType,
  NursesQueryPermissionsResponseDataItem,
} from "src/_requests/Maja";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "src/components/iconify";
import useStepData from "src/sections/nurse/hooks/useStepData";
import TimeAgo from 'react-timeago'
// import {useAddressesDeleteMutation} from "src/api-hooks/address/useAddressesDeleteMutation";
import {useSnackbar} from "src/components/snackbar";
import {useNursesPermissionsDeleteMutation} from "src/api-hooks/nurse/useNursesPermissionsDeleteMutation";
import ConfirmDialog from "src/components/dialog/ConfirmDialog";
import {useNursesPermissionsQuery} from "src/api-hooks/nurse/useNursesPermissionsQuery";

// ----------------------------------------------------------------------

type ActionsMenuProps = {
  nursePermission: NursesQueryPermissionsResponseDataItem
  editNursePermission: (nursePermission: NursesQueryPermissionsResponseDataItem) => void
  deleteNursePermission: (nursePermission: NursesQueryPermissionsResponseDataItem) => void
}

function ActionsMenu({nursePermission, editNursePermission, deleteNursePermission}: ActionsMenuProps) {
  // const edit = () => {
  //   if (nursePermission) editNursePermission(nursePermission)
  // }

  const del = () => {
    if (nursePermission) deleteNursePermission(nursePermission)
  }
  return (
    <Stack direction="row">
      {/* <IconButton onClick={edit}> */}
      {/*   <Iconify icon="uil:edit"/> */}
      {/* </IconButton> */}

      <IconButton onClick={del}>
        <Iconify icon="ph:trash-bold"/>
      </IconButton>
    </Stack>
  )
}

// ----------------------------------------------------------------------

type NursePermissionsDataGridProps = {
  setCurrentNursePermissionForEditHandler: (nursePermission: NursesQueryPermissionsResponseDataItem) => void
}

export default function NursePermissionsDataGrid({setCurrentNursePermissionForEditHandler}: NursePermissionsDataGridProps) {
  const {enqueueSnackbar} = useSnackbar()
  const [permissionsFilter, setPermissionsFilter] = useState<NursesQueryPermissionsFilterType>({})
  const [permissionsSort, setPermissionsSort] = useState({})


  const [currentNursePermissionForDelete, setCurrentNursePermissionForDelete] = useState<NursesQueryPermissionsResponseDataItem | null>(null)

  const handleSetCurrentPermissionForDelete = (nursePermission: NursesQueryPermissionsResponseDataItem) => {
    setCurrentNursePermissionForDelete(nursePermission)
  }

  const closeDeleteDialog = () => {
    setCurrentNursePermissionForDelete(null)
  }

  const columns = useMemo(
    (): GridColDef[] => [
      // {
      //   field: 'id',
      //   hide: true,
      // },
      {
        width: 150,
        field: 'permission.name',
        valueGetter: (params: GridValueGetterParams<any, NursesQueryPermissionsResponseDataItem>) => `${params.row.permission?.name}`,
        headerName: 'Name',
      },
      {
        field: 'expire_date',
        headerName: 'Expire Date',
        renderCell: (params: GridRenderCellParams<any, NursesQueryPermissionsResponseDataItem>) => (
          params.row.expire_date ?
            <Typography variant="body1" color={new Date(params.row.expire_date) < new Date() ? 'error' : 'initial'}>
              <TimeAgo date={params.row.expire_date}/>
            </Typography> : <Typography variant="body1">Unlimited</Typography>
        ),
        flex: 1,
      },
      {
        field: 'Action',
        headerName: '',
        align: 'right',
        width: 50,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any, AddressesQueryResponseDataItem>) => (
          <ActionsMenu
            nursePermission={params.row}
            editNursePermission={setCurrentNursePermissionForEditHandler}
            deleteNursePermission={handleSetCurrentPermissionForDelete}
          />
        ),
      },
    ],
    [setCurrentNursePermissionForEditHandler]
  )

  const {mutateAsync: deletePermission, isLoading: isDeleteAddressLoading} = useNursesPermissionsDeleteMutation()

  const {nurseId} = useStepData()

  const handleDeleteAddress = useCallback(async () => {
    if (!currentNursePermissionForDelete) return
    try {
      await deletePermission({requestBody: {nurseId: Number(nurseId), ids:`${currentNursePermissionForDelete.id}`}})
      enqueueSnackbar('Nurse Permission Deleted Successfully', {variant: 'success'});
    } catch (error) {
      if (error instanceof ApiError) {
        console.dir(error.body);
        enqueueSnackbar(error.body.message, {variant: 'error'});
      } else {
        enqueueSnackbar('Deleting Permission Failed. Please Contact Support', {variant: 'error'});
      }
    }

    closeDeleteDialog()
  }, [currentNursePermissionForDelete, deletePermission, enqueueSnackbar, nurseId])

  const handleSorts = (model: GridSortModel) => {
    const newSort = model.reduce((acc: UserSortType, item: GridSortItem) => {
      return {...acc, [item.field]: {op: item.sort}}
    }, {})
    setPermissionsSort(newSort)
  }

  const handleFilter = (model: GridFilterModel) => {
    const newFilter = model.items.reduce((acc: NursesQueryPermissionsFilterType, item: GridFilterItem) => {
      const _value = typeof item.value === 'object' ? item.value.join(",") : item.value
      return {...acc, [item.field]: {op: item.operator, value: _value}}
    }, {})
    setPermissionsFilter(newFilter)
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {data: nursePermissionsResult, isLoading} = useNursesPermissionsQuery({
    filters: permissionsFilter,
    nurseId: Number(nurseId),
    sorts: permissionsSort,
    limit,
    page
  })

  const nursePermissions = nursePermissionsResult?.data?.items || []
  const rowCount = nursePermissionsResult?.data?.totalPages || 0

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const selected = nursePermissions?.filter((nurseRow: NursesQueryPermissionsResponseDataItem) => selectionModel.includes(nurseRow.id as GridRowId));
  if (selected.length) console.log("selected nurse permissions", selected)

  return (
    <Box>
      <DataGrid
        pagination
        pageSizeOptions={[5, 10, 20]}
        paginationModel={{page: page - 1, pageSize: limit}}
        onPaginationModelChange={(newPage) => {
          setPage(newPage.page + 1);
          setLimit(newPage.pageSize);
        }}
        rowCount={rowCount}
        loading={isLoading}
        autoHeight
        checkboxSelection={false}
        rows={nursePermissions}
        columns={columns}
        sortingMode='server'
        onSortModelChange={handleSorts}
        filterMode='server'
        onFilterModelChange={handleFilter}
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
      <ConfirmDialog
        btnColor="error"
        dismiss={closeDeleteDialog}
        confirm={handleDeleteAddress}
        loading={isDeleteAddressLoading}
        open={Boolean(currentNursePermissionForDelete)}
        confirmPhrase={currentNursePermissionForDelete?.permission?.name}
        title={`Delete ${currentNursePermissionForDelete?.permission?.name} Permission`}
        confirmText={`Delete ${currentNursePermissionForDelete?.permission?.name} Permission`}
      >
        Are you sure you want to delete {currentNursePermissionForDelete?.permission?.name} permission?
        <br/>
        <br/>
        To Delete this Permission, type &nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          color="primary.main"
        >
          {currentNursePermissionForDelete?.permission?.name}
        </Typography>
        &nbsp; in the field below:
      </ConfirmDialog>
    </Box>
  );
}
