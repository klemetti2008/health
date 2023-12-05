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
  GridRenderCellParams, GridRowSelectionModel,
} from '@mui/x-data-grid';
// utils
// components
import {
  AddressSortType,
  AddressFilterType,
  AddressesQueryResponseDataItem,
  ApiError,
  NursesQueryPermissionsResponseDataItem,
  NursesQueryAbsencesResponseDataItem,
  NursesQueryAbsencesSortType, NursesQueryAbsencesFilterType,
} from "src/_requests/Maja";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "src/components/iconify";
import ConfirmDialog from "src/components/dialog/ConfirmDialog";
import {useAddressesDeleteMutation} from "src/api-hooks/address/useAddressesDeleteMutation";
import {useSnackbar} from "src/components/snackbar";
import useStepData from "src/sections/nurse/hooks/useStepData";
import {useAddressesQuery} from "src/api-hooks/address/useAddressesQuery";
import TimeAgo from "react-timeago";
import {useNursesAbsencesDeleteMutation} from "src/api-hooks/nurse/useNursesAbsencesDeleteMutation";
import {useNursesAbsencesQuery} from "src/api-hooks/nurse/useNursesAbsencesQuery";


// ----------------------------------------------------------------------

type ActionsMenuProps = {
  absence: NursesQueryAbsencesResponseDataItem | null
  editAbsence: (absence: NursesQueryAbsencesResponseDataItem) => void
  deleteAbsence: (absence: NursesQueryAbsencesResponseDataItem) => void
}

function ActionsMenu({absence, editAbsence, deleteAbsence}: ActionsMenuProps) {
  const edit = () => {
    if (absence) editAbsence(absence)
  }

  const del = () => {
    if (absence) deleteAbsence(absence)
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

interface NurseAbsencesDataGridProps {
  setCurrentAbsenceForEditHandler: (absence: NursesQueryAbsencesResponseDataItem) => void
}

export default function NurseAbsencesDataGrid({setCurrentAbsenceForEditHandler}: NurseAbsencesDataGridProps) {
  const {enqueueSnackbar} = useSnackbar();

  const [absenceSort, setAbsenceSort] = useState<NursesQueryAbsencesSortType>({})
  const [absenceFilter, setAbsenceFilter] = useState<NursesQueryAbsencesFilterType>({})

  const [currentAbsenceForDelete, setCurrentAbsenceForDelete] = useState<NursesQueryAbsencesResponseDataItem | null>(null)

  const handleSetCurrentAbsenceForDelete = (absence: NursesQueryAbsencesResponseDataItem) => {
    setCurrentAbsenceForDelete(absence)
  }

  const closeDeleteDialog = () => {
    setCurrentAbsenceForDelete(null)
  }

  const columns = useMemo(
    (): GridColDef[] => [
      // {
      //   field: 'id',
      //   hide: true,
      // },

      {
        flex: 1,
        field: 'start_date',
        headerName: 'Start Date',
        renderCell: (params: GridRenderCellParams<any, NursesQueryAbsencesResponseDataItem>) => (
          params.row.start_date ?
            <Typography variant="body1" color={new Date(params.row.start_date) < new Date() ? 'error' : 'initial'}>
              <TimeAgo date={params.row.start_date}/>
            </Typography> : <Typography variant="body1">Unlimited</Typography>
        ),
      },
      {
        flex: 1,
        field: 'end_date',
        headerName: 'End Date',
        renderCell: (params: GridRenderCellParams<any, NursesQueryAbsencesResponseDataItem>) => (
          params.row.end_date ?
            <Typography variant="body1" color={new Date(params.row.end_date) < new Date() ? 'error' : 'initial'}>
              <TimeAgo date={params.row.end_date}/>
            </Typography> : <Typography variant="body1">Unknown</Typography>
        ),
      },
      {
        flex: 1,
        field: 'reason',
        headerName: 'Reason',
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
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
          <ActionsMenu
            absence={params.row}
            editAbsence={setCurrentAbsenceForEditHandler}
            deleteAbsence={handleSetCurrentAbsenceForDelete}
          />
        ),
      }
    ],
    [setCurrentAbsenceForEditHandler]
  )

  const {mutateAsync: deleteAbsence, isLoading: isDeleteAbsenceLoading} = useNursesAbsencesDeleteMutation()

  const handleDeleteAddress = useCallback(async () => {
    if (!currentAbsenceForDelete) return
    try {
      await deleteAbsence({requestBody: {ids: `${currentAbsenceForDelete.id}`}})
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
  }, [currentAbsenceForDelete, deleteAbsence, enqueueSnackbar])

  const handleSorts = (model: GridSortModel) => {
    const newSort = model.reduce((acc: NursesQueryAbsencesSortType, item: GridSortItem) => {
      return {...acc, [item.field]: {op: item.sort}}
    }, {})
    setAbsenceSort(newSort)
  }

  const handleFilter = (model: GridFilterModel) => {
    const newFilter = model.items.reduce((acc: NursesQueryAbsencesFilterType, item: GridFilterItem) => {
      const _value = typeof item.value === 'object' ? item.value.join(",") : item.value
      return {...acc, [item.field]: {op: item.operator, value: _value}}
    }, {})
    setAbsenceFilter(newFilter)
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {nurseId} = useStepData()

  const {data: absencesResult, isLoading} = useNursesAbsencesQuery({
    filters: absenceFilter,
    sorts: absenceSort,
    nurseId: Number(nurseId),
    limit,
    page
  })

  const absences = absencesResult?.data?.items || []
  const rowCount = absencesResult?.data?.totalPages || 0

  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const selected = absences?.filter((nurseRow: AddressesQueryResponseDataItem) => selectionModel.includes(nurseRow.id as GridRowId));
  if (selected.length) console.log("selected nurses", selected)

  return (
    <Box>
      <DataGrid
        pagination
        autoHeight
        paginationModel={{page: page - 1, pageSize: limit}}
        rows={absences}
        columns={columns}
        rowCount={rowCount}
        loading={isLoading}
        disableRowSelectionOnClick
        checkboxSelection={false}
        pageSizeOptions={[5, 10, 20]}
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
        loading={isDeleteAbsenceLoading}
        open={Boolean(currentAbsenceForDelete)}
        confirmPhrase="confirm"
        title="Delete Absence"
        confirmText="Delete Absence"
      >
        Are you sure you want to delete absence?
        <br/>
        <br/>
        To Delete this Address, type &nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          color="primary.main"
        >
          confirm
        </Typography>
        &nbsp; in the field below:
      </ConfirmDialog>
    </Box>
  );
}

