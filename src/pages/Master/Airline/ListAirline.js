import React, { useMemo, useState, useEffect } from 'react';
import Table1 from '../../../components/tables/Table1';
import "jspdf-autotable";
import Moment from 'moment';
import GeneralButton from '../../../components/GeneralButton';
import CreateEditAirline from './CreateEditAirline';
import ButtonService from '../../../services/ButtonService';
import swal from 'sweetalert';
import { Box } from '@mui/system';
import { Button, Container, Stack } from '@mui/material';
import ApiService from '../../../services/ApiService';
import Swal from 'sweetalert2';

const ListAirline = () => {
    const [data, setData] = useState([]);
    const [titleModal, setTitleModal] = useState('');
    const title = 'Airlines'
    const [isModal, setIsModal] = useState(false);
    const param = "airline/";
    const [id, setId] = useState(0);
    const [masterCode, setMasterCode] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = React.useState(false);

    const toggleAdd = () => {
        setId(0);
        setMasterCode('');
        setAbbreviation('');
        setName('');
        handleClick();
        setTitleModal('Add');
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const toggleEdit = (id) => {
         
        setOpen(true);
         
        ApiService.getDataById(param, id).then((res) => {
            if (res !== null) {
                setMasterCode(res.data.masterCode);
                setAbbreviation(res.data.abbreviation);
                setName(res.data.name);
            }
        });
        setId(id);
        
        setIsModal(true);
        setTitleModal('Edit');

    }
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let timerInterval
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        ApiService.getAllWithPaging(param).then((res) => {
            var result = res.data.filter(obj => {
                return obj.rowStatus === 'ACT'
            })
            setData(result)
            swal.stopLoading();
        });
    }

    const ReloadData = () => {
        getData();
        swal({
            title: title,
            text: "Reload Data!",
            icon: "success",
            button: "Ok",
        });

    }

    const DeleteData = (id) => {
        ButtonService.DeleteData(param, id);
    }

    const PrintData = () => {
        var content = document.getElementById("tabel");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    const ExportPDF = () => {
        ButtonService.ExportPDF(data, title);
    }

    const ExportExcel = () => {
        ButtonService.ExportExcel(data, title);
    }


    const handleClick = () => {
        if (isModal === false) {
            setIsModal(true);
        } else {
            setIsModal(false);
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: title,
                Footer: "",
                columns: [
                    {
                        Header: "Master Code",
                        accessor: "masterCode"
                    },
                    {
                        Header: "Abbreviation",
                        accessor: "abbreviation"
                    },
                    {
                        Header: "Airline",
                        accessor: "name"
                    },
                    {
                        Header: "Entry Date",
                        accessor: "createdOn",
                        Cell: (props) => {
                            const custom_date = Moment(props.value).format('DD MMM YYYY');
                            return <span>{custom_date}</span>
                        }

                    },

                    {
                        Header: "Action",
                        accessor: "id",
                        Cell: (props) => {
                            return <>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" 
                                     onClick={() => toggleEdit(props.value)}
                                    
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="contained" color='error' onClick={() => DeleteData(props.value)}>
                                        Delete
                                    </Button>
                                </Stack>
                            </>
                        }

                    },

                ]
            }
        ],
        []
    );


    return (
        <>
            <Container maxWidth={false}>
                <h1 className='title is-2'>Master {title}</h1>
                <Box sx={{ border: 1, p: 2, borderRadius: 5, borderColor: "lightgrey", display: 'flex' }}>
                    <GeneralButton ReloadData={ReloadData} toggleAdd={toggleAdd} toggleEdit={toggleEdit}
                        DeleteData={DeleteData} PrintData={PrintData} ExportPDF={ExportPDF} ExportExcel={ExportExcel} />

                </Box>
                <br></br>
                <Box sx={{ border: 0, p: 0, borderRadius: 5, borderColor: "lightgrey" }} id='tabel'>
                    <Table1 columns={columns} data={data} />
                    <iframe id="ifmcontentstoprint" title='myFrame' style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>

                </Box>

            </Container>
            <CreateEditAirline isModal={isModal} handleClick={handleClick} titleModal={titleModal} title={title} param={param} id={id}
                masterCode={masterCode} abbreviation={abbreviation} name={name}
            />
        </>

    )
}

export default ListAirline