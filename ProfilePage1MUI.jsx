import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { PhotoCamera, Edit, Save } from '@mui/icons-material';

function ProfilePage1MUI() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        dob: '',
        email: '',
        phone: '',
        role: '',
        country: '',
        city: '',
        postalcode: '',
    });

    const [editMode, setEditMode] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        setEditMode((prev) => !prev);
    };

    const renderField = (label, name, type = 'text') => (
        <Grid item xs={4}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            {editMode ? (
                <TextField
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    InputLabelProps={type === 'date' ? { shrink: true } : {}}
                />
            ) : (
                <Typography variant="body1" sx={{ mt: 1 }}>{formData[name] || '-'}</Typography>
            )}
        </Grid>
    );

    return (
        <Box sx={{ maxWidth: 1000, mx:'auto', mt: 5, p: 2 }}>

            <Typography variant="h6" sx={{ mb: 2, color: 'purple' textAlign: 'left' }}>My Profile</Typography>

            <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src="https://via.placeholder.com/120"
                        alt="Profile"
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{ position: 'absolute', top: 150, left:150 }}
                    >
                        <PhotoCamera />
                        <input hidden accept="image/*" type="file" />
                    </IconButton>
                    <Box>
                        <Typography variant="h6">{formData.firstname} {formData.lastname}</Typography>
                        <Typography variant="body2">{formData.role}</Typography>
                        <Typography variant="body2">{formData.city && `${formData.city}, `}{formData.country}</Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, color: 'purple' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Personal Information</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={editMode ? <Edit /> : <Save />}
                        onClick={toggleEdit}
                    >
                        {editMode ? 'Edit' : 'Save'}
                    </Button>
                </Box>

                <Grid container spacing={3}>

                    {renderField('First Name', 'firstname')}
                    {renderField('Last Name', 'lastname')}
                    {renderField('Date of Birth', 'dob')}
                    {renderField('Email Address', 'email')}
                    {renderField('Phone Number', 'phone')}
                    {renderField('User Role', 'role')}
                </Grid>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, color: 'purple' }}>
                    <Typography variant="h6">Address</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={editMode ? <Edit /> : <Save />}
                        onClick={toggleEdit}
                    >
                        {editMode ? 'Edit' : 'Save'}
                    </Button>
                </Box>

                <Grid container spacing={3}>
                    {renderField('Country', 'country')}
                    {renderField('City', 'city')}
                    {renderField('Postal Code', 'postalcode')}
                </Grid>
            </Paper>
        </Box>
    );
}

export default ProfilePage1MUI;
