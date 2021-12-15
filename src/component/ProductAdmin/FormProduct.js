import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextareaAutosize } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Add from "@mui/icons-material/Add";

const Input = styled('input')({
    display: 'none',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const Validation = yup.object().shape({
    name: yup.string().max(100, "Tên sản phẩm Không được dài quá 100 ký tự.").required("Tên sản phẩm không được để trống!"),
    price: yup.string().required("Giá sản phẩm không được để trống!"),
    number: yup.string().required("Số lượng sản phẩm không được để trống!"),
    category: yup.string().required("Danh mục không được để trống!"),
    length: yup.string().required("Chiều dài không được để trống!"),
    width: yup.string().required("Chiều rộng không được để trống!"),
    height: yup.string().required("Chiều cao không được để trống!"),
    weight: yup.string().required("Cân nặng không được để trống!"),
    describe: yup.string().required("Mô tả sản phẩm không được để trống!"),
    trait: yup.string().required("Chi tiết sản phẩm không được để trống!"),
});

export default function FormProduct({
    category,
}) {
    const [open, setOpen] = React.useState(false);
    const imagesNull = { photo1: null, photo2: null, photo3: null, photo4: null }
    const [images, setImages] = React.useState(imagesNull);
    const [imagesUpdate, setImagesUpdate] = React.useState(imagesNull);
    const [detail] = React.useState({ 'status': true });
    ///form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(Validation)
    });
    const onSubmit = (data) => {
        alert(data);
        console.log(data);
        // hàm thêm mới trong này
        
        // update: data= {...formData, data,}, cretate: data
        reset({
            name: '',
            price: '',
            number: '',
            category: '',
            length: '',
            width: '',
            height: '',
            weight: '',
            describe: '',
            trait: '',
        });
        handleClose();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangeImage = (event) => {
        const { name } = event.target;
        var selectedFile = event.target.files[0];
        if (selectedFile) {
            if (detail.id) {
                setImagesUpdate({ ...imagesUpdate, [name]: selectedFile })
            }
            setImages({ ...images, [name]: selectedFile })
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(name).src = e.target.result;
                document.getElementById(name).style.display = 'block';
            }
            reader.readAsDataURL(selectedFile);
        }
    }
    return (
        <div>
            <Button variant="outlined" size='small' onClick={handleClickOpen}>
                Thêm mới <Add />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>Thêm mới sản phẩm</DialogTitle>
                <DialogContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="sku"
                                label="Mã sản phẩm"
                                disabled={true}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Tên sản phẩm"
                                type="text"
                                fullWidth
                                variant="standard"
                                required
                                {...register("name")}
                                error={errors.name ? true : false}
                                helperText={errors.name ? errors.name.message : false}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Danh mục"
                                        defaultValue={''}
                                        required
                                        {...register("category")}
                                        error={errors.category ? true : false}
                                    >
                                        {category.map ((item, index)=>(
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errors.category ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.category.message}</span> : false}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                            <FormLabel component="legend">Ảnh</FormLabel>
                            <Stack direction="row" alignItems="center" textAlign="center" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }} >
                                <label htmlFor="button-image-1" >
                                    <Input accept="image/*" id="button-image-1" onChange={onChangeImage} name="photo1" multiple type="file" />
                                    {images.photo1 == null && (
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <StyledBadge badgeContent={1} color="secondary">
                                                <PhotoCamera />
                                            </StyledBadge>
                                        </IconButton>
                                    )}
                                    <img src="" alt='ảnh' id="photo1" style={{ width: 100, display: "none" }} />
                                </label>
                                <label htmlFor="button-image-2">
                                    <Input accept="image/*" id="button-image-2" onChange={onChangeImage} name="photo2" type="file" />
                                    {images.photo2 == null && (
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <StyledBadge badgeContent={2} color="secondary">
                                                <PhotoCamera />
                                            </StyledBadge>
                                        </IconButton>
                                    )}
                                    <img src="" alt='ảnh' id="photo2" style={{ width: 100, display: "none" }} />
                                </label>
                                <label htmlFor="button-image-3">
                                    <Input accept="image/*" id="button-image-3" onChange={onChangeImage} name="photo3" type="file" />
                                    {images.photo3 == null && (
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <StyledBadge badgeContent={3} color="secondary">
                                                <PhotoCamera />
                                            </StyledBadge>
                                        </IconButton>
                                    )}
                                    <img src="" alt='ảnh' id="photo3" style={{ width: 100, display: "none" }} />
                                </label>
                                <label htmlFor="button-image-4">
                                    <Input accept="image/*" id="button-image-4" onChange={onChangeImage} name="photo4" type="file" />
                                    {images.photo4 == null && (
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <StyledBadge badgeContent={4} color="secondary">
                                                <PhotoCamera />
                                            </StyledBadge>
                                        </IconButton>
                                    )}
                                    <img src="" alt='ảnh' id="photo4" style={{ width: 100, display: "none" }} />
                                </label>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="dense"
                                id="price"
                                label="Giá"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                                }}
                                required
                                {...register("price")}
                                error={errors.price ? true : false}
                                helperText={errors.price ? errors.price.message : false}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="dense"
                                id="number"
                                label="Số lượng"
                                type="number"
                                fullWidth
                                variant="standard"
                                required
                                {...register("number")}
                                error={errors.number ? true : false}
                                helperText={errors.number ? errors.number.message : false}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl component="fieldset">
                                <FormLabel component="status">Trạng thái</FormLabel>
                                <RadioGroup defaultValue={"female"} {...register("status")}>
                                    <FormControlLabel value="female" control={<Radio />} label="Đang bán" />
                                    <FormControlLabel value="male" control={<Radio />} label="Chưa bán" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="weight"
                                label="Cân nặng"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                }}
                                required
                                {...register("weight")}
                                error={errors.weight ? true : false}
                                helperText={errors.weight ? errors.weight.message : false}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="height"
                                label="Chiều cao"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                required
                                {...register("height")}
                                error={errors.height ? true : false}
                                helperText={errors.height ? errors.height.message : false}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="width"
                                label="Chiều rộng"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                required
                                {...register("width")}
                                error={errors.width ? true : false}
                                helperText={errors.width ? errors.width.message : false}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="length"
                                label="Chiều dài"
                                type="number"
                                fullWidth
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                required
                                {...register("length")}
                                error={errors.length ? true : false}
                                helperText={errors.length ? errors.length.message : false}
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <FormLabel component="legend">Mô tả</FormLabel>
                            <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Mô tả"
                                style={{ width: "100%", height: 100 }}
                                required
                                {...register("describe")}
                            />
                            {errors.describe ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.describe.message}</span> : false}
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 2 }}>
                            <FormLabel component="legend">Chi tiết</FormLabel>
                            <TextareaAutosize
                                maxRows={4}
                                aria-label="maximum height"
                                placeholder="Chi tiết"
                                style={{ width: "100%", height: 100 }}
                                required
                                {...register("trait")}
                            />
                            {errors.trait ? <span style={{ color: 'red', fontSize: '12px' }}>{errors.trait.message}</span> : false}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
