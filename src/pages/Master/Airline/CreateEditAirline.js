import { Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ButtonService from '../../../services/ButtonService';
// import {useNavigate}from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f5fcff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    spacing: 2,
    borderRadius: 5
};

const CreateEditAirline = ({ isModal, handleClick, titleModal, title, param, id ,masterCode,abbreviation,name }) => {

    const [masterCode2, setMasterCode2] = useState('');
    const [abbreviation2, setAbbreviation2] = useState('');
    const [name2, setName2] = useState('');

    React.useEffect(() => {
        setMasterCode2(masterCode);
        setAbbreviation2(abbreviation);
        setName2(name);
    }, [masterCode,abbreviation,name])

    const Simpan = () => {
        var data;
            data = {
                rowStatus:'ACT',
                id:id,
                masterCode: masterCode2,
                abbreviation: abbreviation2,
                name: name2,
                userBy: 'wahyu'
            };
        ButtonService.Simpan(titleModal, title, param, data);
        handleClick();
        window.location.reload();
    }

    return (
        <Modal
            open={isModal}
            onClose={handleClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box display="flex" alignItems="center"
                    justifyContent="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2" justifyContent='center'>
                        {titleModal} {title}
                    </Typography>
                </Box>
                <br></br>
                <form onSubmit={Simpan}>
                    <Box>
                        <TextField
                            name="masterCode"
                            label="Master Code"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={masterCode2}
                            onChange={(e) => setMasterCode2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="abbreviation"
                            label="Abbreviation"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={abbreviation2}
                            onChange={(e) => setAbbreviation2(e.target.value)}
                        /><br></br><br></br>
                        <TextField
                            name="name"
                            label="Airline"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        />
                    </Box>
                    <br></br>
                    <Box display="flex" alignItems="center"
                        justifyContent="right">
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" type='submit'>Save</Button>
                            <Button variant="contained" onClick={handleClick} color='error'>Cancel</Button>
                        </Stack>

                    </Box>

                </form>


            </Box>
        </Modal>
    )
}

export default CreateEditAirline