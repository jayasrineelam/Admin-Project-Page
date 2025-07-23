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

    const [editMode, setEditMode] = useState({
        personal: false,
        address: false
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = (section) => {
        setEditMode((prev) => ({...prev, [section]: !prev[section]}));
    };

     const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // 🆕 set image preview
            };
            reader.readAsDataURL(file);
        }
    };

    const renderField = (label, name, section, type = 'text') => (
        <Grid item size = {4}>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            {editMode[section] ? (
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

            <Typography variant="h6" sx={{ mb: 2, color: 'purple', textAlign: 'left' }}>My Profile</Typography>

            <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src={ profileImage || "https://via.placeholder.com/120"}
                        alt="Profile"
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                     <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange}
                        id="profile-image-upload"
                    />
                    <label htmlFor="profile-image-upload">
                        <IconButton
                            color="primary"
                            component="span"
                            sx={{ position: 'absolute', top: 180, left: 200 }}
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>    
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
                        startIcon={editMode.personal ? <Save /> : <Edit />}
                        onClick={() => toggleEdit('personal')}
                    >
                        {editMode.personal ? 'Save' : 'Edit'}
                    </Button>
                </Box>

                <Grid container spacing={3}>

                    {renderField('First Name', 'firstname','personal')}
                    {renderField('Last Name', 'lastname', 'personal')}
                    {renderField('Date of Birth', 'dob', 'personal')}
                    {renderField('Email Address', 'email', 'personal')}
                    {renderField('Phone Number', 'phone', 'personal')}
                    {renderField('User Role', 'role', 'personal')}
                </Grid>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, color: 'purple' }}>
                    <Typography variant="h6">Address</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={editMode.address ? <Save /> : <Edit/>}
                        onClick = {() => toggleEdit('address')}
                    >
                        {editMode.address ? 'Save' : 'Edit'}
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {renderField('Country', 'country', 'address')}
                    {renderField('City', 'city', 'address')}
                    {renderField('Postal Code', 'postalcode', 'address')}
                </Grid>
            </Paper>
        </Box>
    );
}

export default ProfilePage1MUI;
