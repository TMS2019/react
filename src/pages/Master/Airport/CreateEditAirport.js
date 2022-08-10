import { Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import ApiService from '../../../services/ApiService';
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

const CreateEditAirport = ({ isModal, handleClick, titleModal, title, param, id, masterCode, abbreviation, name, cityId, countryId }) => {

    const [masterCode2, setMasterCode2] = useState('');
    const [abbreviation2, setAbbreviation2] = useState('');
    const [name2, setName2] = useState('');
    const [dataCity, setDataCity] = useState([]);
    const [dataCountry, setDatacountry] = useState([]);
    const [countryId2, setCountryId2] = useState('');
    const [cityId2, setCityId2] = useState('');

    React.useEffect(() => {
        GetData();
        // eslint-disable-next-line 
    }, [countryId, cityId, masterCode, abbreviation, name])

    const GetData = () => {
        var result;
        if (titleModal !== 'Add') {
            setMasterCode2(masterCode);
            setAbbreviation2(abbreviation);
            setName2(name);
            ApiService.getAllWithPaging('country/').then((res) => {
                result = res.data.filter(obj => {
                    return obj.rowStatus === 'ACT'
                })
                setDatacountry(result);
            }).then(() => {
                setCountryId2(countryId);
                ApiService.getAllWithPaging('city/').then((res) => {
                    var result2 = res.data.filter(obj => {
                        return obj.rowStatus === 'ACT' && obj.countryId === countryId
                    })
                    setDataCity(result2);
                }).then(() => {
                    setCityId2(cityId);
                })
            })
        } else {
            setCityId2('');
            setCountryId2('');
            setName2('');
            setMasterCode2('');
            setAbbreviation2('');
            setDataCity([]);
            setDatacountry([]);
            ApiService.getAll('country/').then((res) => {
                result = res.data.filter(obj => {
                    return obj.rowStatus === 'ACT'
                })
                setDatacountry(result);
            })
        }
    }

    const Simpan = () => {
        var data;
        data = {
            rowStatus: 'ACT',
            id: id,
            masterCode: masterCode2,
            abbreviation: abbreviation2,
            name: name2,
            cityId: cityId2,
            countryId: countryId,
            userBy: 'wahyu'
        };
        ButtonService.Simpan(titleModal, title, param, data);
        handleClick();
        window.location.reload();
    }

    const GetCity = (e) => {
        e.preventDefault();
        var result;
        ApiService.getAll('city/').then((res) => {
            result = res.data.filter(obj => {
                return obj.rowStatus === 'ACT' && obj.countryId === e.target.value
            })
            setDataCity(result);
            setCountryId2(e.target.value);
        })
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
                            label="Airport"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                        /><br></br><br></br>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="select-label">Country</InputLabel>
                            <Select
                                labelId="lblCountry"
                                id="country"
                                value={countryId2}
                                label="Country"
                                onChange={(e) => GetCity(e)}>
                                {dataCountry.map((data) => (
                                    <MenuItem key={data.id} value={data.id}>
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br></br><br></br>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="select-label">City</InputLabel>
                            <Select
                                labelId="lblCity"
                                id="city"
                                value={cityId2}
                                label="City"
                                onChange={(e) => setCityId2(e.target.value)}>
                                {dataCity.map((data) => (
                                    <MenuItem key={data.id} value={data.id}>
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

export default CreateEditAirport