import { Button, Stack } from '@mui/material'
import React from 'react'

const BookingButton = ({ AddBc, ReloadData, EditBc, DeleteData, PrintData, ApprovalData, UnApprovalData, CopyData }) => {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={ReloadData}>
                Reload Data
            </Button>
            <Button variant="outlined" onClick={AddBc}>
                Add New
            </Button>
            <Button variant="outlined" onClick={EditBc}>
                Edit Data
            </Button>
            <Button variant="outlined" onClick={DeleteData}>
                Delete
            </Button>
            <Button variant="outlined" onClick={PrintData}>
                Print
            </Button>
            <Button variant="outlined" onClick={ApprovalData}>
                Approval
            </Button>
            <Button variant="outlined" onClick={UnApprovalData}>
                Un-Approval
            </Button>
            <Button variant="outlined" onClick={CopyData}>
                Copy BC
            </Button>
        </Stack>

    )
}

export default BookingButton