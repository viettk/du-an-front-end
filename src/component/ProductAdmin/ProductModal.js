import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import ProductApi from "../../api/ProductApi";
import CategoryApi from "../../api/CategoryApi";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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

function ProductModal({ show, setShow, ma, setMa, onLoad ,setOpen}) {
    //biến lưu thông tin sản phẩm
    const [detail, setDetail] = useState({ 'status': true });

    const imagesNull = { photo1: null, photo2: null, photo3: null, photo4: null }
    // biến lưu danh sách ảnh
    const [images, setImages] = useState(imagesNull);
    const [imagesUpdate, setImagesUpdate] = useState(imagesNull);

    const dong = () => {
        setImagesUpdate(imagesNull);
        setDetail({ 'status': true });
        setLoi({});
        setMess({});
        setImages(imagesNull);
        setMa(0);
        setShow(false);
    }

    const [parent, setParent] = useState([]);

    //Thông báo lỗi
    const [mess, setMess] = useState({});
    const [loi, setLoi] = useState({});

    const onChangeDetail = (event) => {
        const { name, value } = event.target;
        setDetail({ ...detail, [name]: value })
    }

    const radioChange = (event) => {
        const { name, value } = event.target;
        value === '0' ? setDetail({ ...detail, [name]: false }) : setDetail({ ...detail, [name]: true })
    }

    
    // hiển thị ảnh và thêm ảnh vào result
    const onChangeImage = (event) => {
        const { name } = event.target;
        var selectedFile = event.target.files[0];
        if (selectedFile) {
            if(detail.id){
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
        // console.log(images)
    }
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await CategoryApi.getListAll();
                setParent(response);
                if (ma !== 0 && ma !== undefined) {
                    const resp = await ProductApi.getIdProduct(ma);
                    // let releaseDate = resp.releaseDate.substr(0, 10);
                    if(resp.releaseDate){
                        resp.releaseDate = resp.releaseDate.split('T')[0]
                    }
                    setDetail({ ...resp, categoryID: resp.category.id,releaseDate:resp.releaseDate});
                    // hiển thị ảnh lên
                    let photos = imagesNull;
                    photos.photo1 = resp.photo;
                    for (var i = 0; i < resp.photos.length; i++) {
                        let key = Object.keys(photos)[i + 1];
                        photos = { ...photos, [key]: resp.photos[i].name }
                    }
                    setImages(photos);
                    for (var k in photos) {
                        if (photos[k] !== null) {
                            document.getElementById(k).src = 'https://tranhoangmaianh.herokuapp.com/images/' + photos[k];
                            document.getElementById(k).style.display = 'block';
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [ma]);

    const create = async () => {
        //    điều kiện 
        // console.log(detail)
        await ProductApi.postProduct(detail).then(resp => {
            let id = resp;
            let data = new FormData();
            for (var i in images) {
                data.append(i, images[i])
            }
            ProductApi.postImage(id,data).then(response=>{
                onLoad();
                dong();
                setOpen(true);
            })
        }).catch((error) => {
            if (error.response) {
                setLoi(error.response.data);
                console.log(error.response)
                setMess(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    }
    const vdPrice = /^[0-9]+$/;
    // const vdPrice = /^[1-9]?[0-9]+$/;
    //Thêm mới hoặc Cập nhật Sản phẩm
    const update = async () => {
        let detailUpdate = {...detail,category:null};
        if(!detail.categoryID){
             detailUpdate =  {...detailUpdate,categoryID: detail.category.id};
        }
        await ProductApi.putProduct(detailUpdate).then(resp => {
            let id = resp.id;
            let data = new FormData();
            for (var i in imagesUpdate) {
                data.append(i, imagesUpdate[i])
            }
            ProductApi.putImage(id,data).then(resp => {
                onLoad();
                dong();
                setOpen(true);
            })
        }).catch((error) => {
            if (error.response) {
                setLoi(error.response.data);
                console.log(error.response)
                setMess(error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    }
    return (
        <div>
            <Modal show={show} onHide={() => dong()}   >
                <Modal.Header>
                    {
                        ma == 0 || ma == undefined ? <span>Thêm Sản phẩm mới</span> : <span>Cập nhật Sản phẩm {detail.name}</span>
                    }
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => dong()}></button>
                </Modal.Header>

                <Modal.Body>
                    <form>

                        <div className="form-group">
                            <label>Tên Sản phẩm</label>
                            <input className="form-control" type="text" name="name" onChange={onChangeDetail} value={detail.name} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.name}</span>
                        </div>
                        <div className="form-group">
                            <label>Danh mục</label>
                            <select class="form-select form-select-sm" aria-label=".form-select-sm example" name="categoryID" value={detail.categoryID} onChange={onChangeDetail}  >
                                <option value={null}>Chọn</option>
                                {
                                    parent.map(parent => (
                                        <option value={parent.id} >{parent.name} - {parent.parent_name}</option>
                                    ))
                                }
                            </select>
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.categoryID}</span>
                        </div>

                        {/* button ảnh */}
                        <div className="form-group">
                            <label>Ảnh</label>
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
                                    <img src="" id="photo1" style={{ width: 100, display: "none" }} />
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
                                    <img src="" id="photo2" style={{ width: 100, display: "none" }} />
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
                                    <img src="" id="photo3" style={{ width: 100, display: "none" }} />
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
                                    <img src="" id="photo4" style={{ width: 100, display: "none" }} />
                                </label>
                            </Stack>
                        </div>
                        {/* button ảnh */}

                        <div className="form-group">
                            <label>Miêu tả</label>
                            <textarea className="form-control" type="text" onChange={onChangeDetail} name="describe" value={detail.describe} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.describe}</span>
                        </div>

                        <div className="form-group">
                            <label>Giá bán</label>
                            <input className="form-control" type="number" onChange={onChangeDetail} name="price_extra" value={detail.price_extra}/>
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.price_extra}</span>
                        </div>

                        <div className="form-group">
                            <label>Trạng thái</label>
                            <RadioGroup value={detail.status ? '1' : '0'} row aria-label="gender" onChange={radioChange} name="status">
                                <FormControlLabel value='1' control={<Radio />} label="Đang bán" />
                                <FormControlLabel value='0' control={<Radio />} label="Chưa bán" />
                            </RadioGroup>
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.status}</span>
                        </div>

                        <div className="form-group">
                            <label>Mã SKU</label>
                            <input className="form-control" type="text" onChange={onChangeDetail} name="sku" value={detail.sku} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.sku}</span>
                        </div>

                        <div className="form-group">
                            <label>Chi tiết</label>
                            <textarea className="form-control" type="text" onChange={onChangeDetail} name="trait" value={detail.trait} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.trait}</span>
                        </div>

                        <div className="form-group">
                            <label>Ngày phát hành</label>
                            <input type="date" className="form-control" onChange={onChangeDetail} name="releaseDate" value={detail.releaseDate} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.releaseDate}</span>
                        </div>

                        <div className="form-group">
                            <label>Giá phát hành</label>
                            <input className="form-control" type="number" onChange={onChangeDetail} name="price_release" value={detail.price_release} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.price_release}</span>
                        </div>

                        <div className="form-group">
                            <label>Cân nặng</label>
                            <input className="form-control" type="number"  name="weight" onChange={onChangeDetail} value={detail.weight} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.weight}</span>
                        </div>

                        <div className="form-group">
                            <label>Chiều cao</label>
                            <input className="form-control" type="number"  name ="height" onChange={onChangeDetail} value={detail.height} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.height}</span>
                        </div>

                        <div className="form-group">
                            <label>Chiều rộng</label>
                            <input className="form-control" type="number"  name="width" onChange={onChangeDetail} value={detail.width} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.width}</span>
                        </div>

                        <div className="form-group">
                            <label>Length</label>
                            <input className="form-control" type="number"  name="length" onChange={onChangeDetail} value={detail.length} />
                            <span style={{ color: "red", fontSize: "13px" }}>{loi.length}</span>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    {
                        detail.id != null ? <button type="button" class="btn btn-primary" onClick={() => update()} >Update</button> : <button type="button" class="btn btn-primary" onClick={() => create()} >Save</button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ProductModal;