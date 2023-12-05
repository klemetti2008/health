import {useCallback, useMemo, useState} from 'react';
// @mui
import {
  DataGrid,
  GridRowId,
  GridColDef,
  GridSortItem,
  GridSortModel,
  GridFilterItem,
  GridFilterModel,
  GridRenderCellParams,
  GridValueGetterParams, GridRowSelectionModel,
} from '@mui/x-data-grid';
// utils
// components
import {
  AddressSortType,
  AddressFilterType,
  AddressesQueryResponseDataItem, ApiError,
} from "src/_requests/Maja";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "src/components/iconify";
import ConfirmDialog from "src/components/dialog/ConfirmDialog";
import {useAddressesDeleteMutation} from "src/api-hooks/address/useAddressesDeleteMutation";
import {useSnackbar} from "src/components/snackbar";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {useAddressesQuery} from "src/api-hooks/address/useAddressesQuery";


// ----------------------------------------------------------------------

type ActionsMenuProps = {
  address: AddressesQueryResponseDataItem | null
  editAddress: (address: AddressesQueryResponseDataItem) => void
  deleteAddress: (address: AddressesQueryResponseDataItem) => void
}

function ActionsMenu({address, editAddress, deleteAddress}: ActionsMenuProps) {
  const edit = () => {
    if (address) editAddress(address)
  }

  const del = () => {
    if (address) deleteAddress(address)
  }

  return (
    <Stack direction="row" spacing={1}>
      <IconButton onClick={edit}>
        <Iconify icon="uil:edit"/>
      </IconButton>

      <IconButton onClick={del}>
        <Iconify icon="ph:trash-bold"/>
      </IconButton>
    </Stack>
  )
}

// ----------------------------------------------------------------------

interface AddressesDataGridProps {
  setCurrentAddressForEditHandler: (address: AddressesQueryResponseDataItem) => void
}

export default function NurseAddressesDataGrid({setCurrentAddressForEditHandler}: AddressesDataGridProps) {
  const {enqueueSnackbar} = useSnackbar();

  const [addressSort, setAddressSort] = useState<AddressSortType>({})
  const [addressFilter, setAddressFilter] = useState<AddressFilterType>({})

  const [currentAddressForDelete, setCurrentAddressForDelete] = useState<AddressesQueryResponseDataItem | null>(null)

  const handleSetCurrentAddressForDelete = (address: AddressesQueryResponseDataItem) => {
    setCurrentAddressForDelete(address)
  }

  const closeDeleteDialog = () => {
    setCurrentAddressForDelete(null)
  }

  const columns = useMemo(
    (): GridColDef[] => [
      // {
      //   field: 'id',
      //   hide: true,
      // },
      {
        field: 'name',
        headerName: 'Name',
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
      },
      {
        field: 'city',
        headerName: 'City',
        valueGetter: (params: GridValueGetterParams<any, AddressesQueryResponseDataItem>) => `${params.row.city?.name}`,
        flex: 1,
      },
      {
        field: 'street',
        headerName: 'Street Name',
        valueGetter: (params: GridValueGetterParams<any, AddressesQueryResponseDataItem>) => `${params.row.street?.name}`,
        flex: 1,
      },
      {
        field: 'buildingNumber',
        headerName: 'Building Number',
        valueGetter: (params: GridValueGetterParams<any, AddressesQueryResponseDataItem>) => `${params.row.buildingNumber}`,
        flex: 1,
      },
      {
        field: 'postalCode',
        headerName: 'Postal Code',
        valueGetter: (params: GridValueGetterParams<any, AddressesQueryResponseDataItem>) => `${params.row.postalCode}`,
        flex: 1,
      },
      {
        width: 100,
        headerName: '',
        align: 'right',
        field: 'Action',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any, AddressesQueryResponseDataItem>) => (
          <ActionsMenu address={params.row} editAddress={setCurrentAddressForEditHandler}
                       deleteAddress={handleSetCurrentAddressForDelete}/>
        ),
      }
    ],
    [setCurrentAddressForEditHandler]
  )

  const {mutateAsync: deleteAddress, isLoading: isDeleteAddressLoading} = useAddressesDeleteMutation()

  const handleDeleteAddress = useCallback(async () => {
    if (!currentAddressForDelete) return
    try {
      await deleteAddress({requestBody: {ids: `${currentAddressForDelete.id}`}})
      enqueueSnackbar('Nurse Address Deleted Successfully', {variant: 'success'});
    } catch (error) {
      if (error instanceof ApiError) {
        console.dir(error.body);
        enqueueSnackbar(error.body.message, {variant: 'error'});
      } else {
        enqueueSnackbar('Deleting Address Failed. Please Contact Support', {variant: 'error'});
      }
    }

    closeDeleteDialog()
  }, [currentAddressForDelete, deleteAddress, enqueueSnackbar])

  const handleSorts = (model: GridSortModel) => {
    const newSort = model.reduce((acc: AddressSortType, item: GridSortItem) => {
      return {...acc, [item.field]: {op: item.sort}}
    }, {})
    setAddressSort(newSort)
  }

  const handleFilter = (model: GridFilterModel) => {
    const newFilter = model.items.reduce((acc: AddressFilterType, item: GridFilterItem) => {
      const _value = typeof item.value === 'object' ? item.value.join(",") : item.value
      return {...acc, [item.field]: {op: item.operator, value: _value}}
    }, {})
    setAddressFilter(newFilter)
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {nurseId} = useStepData()

  const {data: addressesResult, isLoading} = useAddressesQuery({
    filters: addressFilter,
    sorts: addressSort,
    nurseId: Number(nurseId),
    limit,
    page
  })

  const addresses = addressesResult?.data?.items || []
  const rowCount = addressesResult?.data?.totalPages || 0

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const selected = addresses?.filter((nurseRow: AddressesQueryResponseDataItem) => selectionModel.includes(nurseRow.id as GridRowId));
  if (selected.length) console.log("selected nurses", selected)


  return (
    <Box>
      <DataGrid
        pagination
        autoHeight
        paginationModel={{page: page - 1, pageSize: limit}}
        pageSizeOptions={[5, 10, 20]}
        rows={addresses}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        disableRowSelectionOnClick
        checkboxSelection={false}
        sortingMode='server'
        onSortModelChange={handleSorts}
        filterMode='server'
        onFilterModelChange={handleFilter}
        onPaginationModelChange={(newPage) => {
          setPage(newPage.page + 1);
          setLimit(newPage.pageSize);
        }}
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
        open={Boolean(currentAddressForDelete)}
        confirmPhrase={currentAddressForDelete?.name}
        title={`Delete ${currentAddressForDelete?.name} Address`}
        confirmText={`Delete ${currentAddressForDelete?.name} Address`}
      >
        Are you sure you want to delete {currentAddressForDelete?.name} address?
        <br/>
        <br/>
        To Delete this Address, type &nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          color="primary.main"
        >
          {currentAddressForDelete?.name}
        </Typography>
        &nbsp; in the field below:
      </ConfirmDialog>
    </Box>
  );
}

