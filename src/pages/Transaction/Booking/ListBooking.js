// import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Table1 from '../../../components/tables/Table1';
import { SelectColumnFilter } from '../../../components/tables/Filter';
import BookingButton from '../../../components/BookingButton';
import { Box, Container } from '@mui/material';

const ListBooking = () => {

  const [data, setData] = useState([]);
  const history = useNavigate()

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    const data1 = [];
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const tgl = new Date().toLocaleDateString("en-US", options);
    for (var i = 0; i < 30; i++) {
      var dummy = "Dummy " + (i + 1);
      var angka = 1000;
      data1.push({
        id: i,
        bcSts: dummy,
        bookingNo: dummy,
        bookingDate: tgl,
        job: dummy,
        ship: dummy,
        volume: angka,
        cstName: dummy,
        receipt: dummy,
        delivery: dummy,
        approvalDate: tgl
      });
    }
    setData(data1);
  }

  const AddBc = () => {
    history('/booking/_add');
  }

  const EditBc = () => {
    history('/booking/_add');
  }

  const ReloadData = () => {
    swal({
      title: "Booking Confirmation",
      text: "Reload Data!",
      icon: "success",
      button: "Ok",
    });
  }

  const DeleteData = () => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Delete!',
          text: 'Data deleted',
          icon: 'success'
        }).then(function () {
          //Delete
        });
      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  const PrintData = () => {
    swal({
      title: "Are you sure?",
      text: "Print",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Print',
          text: 'Printed!',
          icon: 'success'
        }).then(function () {
          //cetak
        });
      } else {
        swal("Cancelled", "Batal cetak", "error");
      }
    });
  }

  const ApprovalData = () => {
    swal({
      title: "Are you sure?",
      text: "Approve Data",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Approve',
          text: 'Approved!',
          icon: 'success'
        }).then(function () {
          //cetak
        });
      } else {
        swal("Cancelled", "Cancel Approve", "error");
      }
    });
  }

  const UnApprovalData = () => {
    swal({
      title: "Are you sure?",
      text: "Un-Approve Data",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Un-Approval',
          text: 'Un-Approved!',
          icon: 'success'
        }).then(function () {
          //cetak
        });
      } else {
        swal("Cancelled", "Cancel Un-Approval", "error");
      }
    });
  }

  const CopyData = () => {
    swal({
      title: "Are you sure?",
      text: "Copy Data",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Copy',
          text: 'Copied',
          icon: 'success'
        }).then(function () {
          //cetak
        });
      } else {
        swal("Cancelled", "Cancel copy", "error");
      }
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "Booking Confirmation",
        Footer: 'Name',
        columns: [
          {
            Header: "BC Sts",
            accessor: "bcSts",
            Filter: SelectColumnFilter,
            filter: "includes",
            footer: "",
          },
          {
            Header: "Booking No",
            accessor: "bookingNo",
            footer: "",
          },
          {
            Header: "Booking Date",
            accessor: "bookingDate",
            footer: "",
          },
          {
            Header: "Job",
            accessor: "job",
            footer: "",
          }
          ,
          {
            Header: "Ship",
            accessor: "ship",
            Footer: 'Test Footer',
          },
          {
            Header: "Volume",
            accessor: "volume",
            Footer: info => {
              const total = React.useMemo(
                () =>
                  info.rows.reduce((sum, row) => row.values.volume + sum, 0),
                [info.rows]
              )

              return <>Total: {total}</>
            },
          },
          {
            Header: "Customer Name",
            accessor: "cstName",
            footer: "",
          },
          {
            Header: "Receipt Place",
            accessor: "receipt",
            footer: "",
          },
          {
            Header: "Delivery Place",
            accessor: "delivery",
            footer: "",
          },
          {
            Header: "Approval Date",
            accessor: "approvalDate",
            footer: "",
          }
        ]
      }
    ],
    []
  );

  return (
    <div>
        <Container maxWidth={false}>
          <h1>Booking Confirmation</h1>
          <Box sx={{ border: 1, p: 2, borderRadius: 5, borderColor: "lightgrey", display: 'flex' }}>
            <BookingButton AddBc={AddBc} EditBc={EditBc} ReloadData={ReloadData} DeleteData={DeleteData} PrintData={PrintData} ApprovalData={ApprovalData}
              UnApprovalData={UnApprovalData} CopyData={CopyData} />

          </Box>
          <br></br>
          <Box sx={{ border: 1, p: 2, borderRadius: 5, borderColor: "lightgrey", display:'flex' }} id='tabel'>
            <Table1 columns={columns} data={data} />

          </Box>

        </Container>
    </div>
  )
}

export default ListBooking