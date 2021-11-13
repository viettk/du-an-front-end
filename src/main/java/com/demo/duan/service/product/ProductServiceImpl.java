package com.demo.duan.service.product;

import com.demo.duan.entity.CategoryEntity;
import com.demo.duan.entity.PhotoEntity;
import com.demo.duan.entity.ProductEntity;
import com.demo.duan.repository.category.CategoryRepository;
import com.demo.duan.repository.photo.PhotoRepository;
import com.demo.duan.repository.product.ProductRepository;
import com.demo.duan.service.category.param.CategoryParam;
import com.demo.duan.service.product.dto.ProductDto;
import com.demo.duan.service.product.input.ProductCreateInput;
import com.demo.duan.service.product.input.ProductUpdateInput;
import com.demo.duan.service.product.mapper.ProductMapper;
import com.demo.duan.service.product.mapper.ProductUpdateMapper;
import com.demo.duan.service.product.param.ProductParam;
import com.demo.duan.service.upload.UpLoadService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    private final ProductMapper mapper;

    private final ProductUpdateMapper updateMapper;

    private final CategoryRepository categoryRepository;

    private final UpLoadService upLoadService;

    private final PhotoRepository photoRepository;

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchByAdmin(ProductParam param, Optional<String> field, Optional<String> known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchByAdmin(param, pageable).map(mapper::entityToDto);

            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchByAdmin(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchByAdmin(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchNewArrival() {
        Pageable pageable = PageRequest.of(0,10);
        Page<ProductDto> dto = this.productRepository.searchNewArrival(pageable).map(mapper::entityToDto);
        return ResponseEntity.ok().body(dto);
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchBySHF() {
        Pageable pageable = PageRequest.of(0,21);
        Page<ProductDto> dto = this.productRepository.searchBySHF(pageable).map(mapper::entityToDto);
        return ResponseEntity.ok().body(dto);
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchByModelKit() {
        Pageable pageable = PageRequest.of(0,4);
        Page<ProductDto> dto = this.productRepository.searchByModelKit(pageable).map(mapper::entityToDto);
        return ResponseEntity.ok().body(dto);
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchByStaticModel() {
        Pageable pageable = PageRequest.of(0,4);
        Page<ProductDto> dto = this.productRepository.searchByStaticModel(pageable).map(mapper::entityToDto);
        return ResponseEntity.ok().body(dto);
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchByKhac( ProductParam param, Optional<String> field, Optional<String> known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllKhac(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllKhac(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchAllKhac(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchAllByParent(CategoryParam cate, ProductParam param, Optional<String> field, String known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllSHF(cate, param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllSHF(cate, param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchAllSHF(cate,param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchAllModelKit(ProductParam param, Optional<String> field, String known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllModelKit(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllModelKit(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchAllModelKit(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchAllStactic( ProductParam param, Optional<String> field, String known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllStaticModel(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchAllStaticModel(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchAllStaticModel(param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchByCategoryName(Integer categoryId,ProductParam param, Optional<String> field, String known, Optional<Integer> limit, Optional<Integer> page) {
        if(known.equals("up")){
            Sort sort =Sort.by(Sort.Direction.ASC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchByCategoryName(categoryId, param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else if(!known.equals("up") || known.equals("")){
            Sort sort =Sort.by(Sort.Direction.DESC, field.orElse("id"));
            Pageable pageable = PageRequest.of(page.orElse(0), limit.orElse(5), sort);
            Page<ProductDto> dto = this.productRepository.searchByCategoryName(categoryId, param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
        else{
            Pageable pageable = PageRequest.of(0, 15);
            Page<ProductDto> dto = this.productRepository.searchByCategoryName(categoryId, param, pageable).map(mapper::entityToDto);
            return ResponseEntity.ok().body(dto);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<ProductDto> getOne(Integer id) {
        /* Kiểm tra id của sản phẩm có tồn tại hay ko */
        ProductEntity entity = this.productRepository.findByIdAndStatusIsTrue(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
       return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    @Override
    @Transactional
    public ResponseEntity<ProductDto> getOneAdmin(Integer id) {
        ProductEntity entity = this.productRepository.getById(id);
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    //    -------------------- Dũng  quản lý sản phẩm -------------------------------

    @Override
    @Transactional
    public ResponseEntity<ProductDto> createProduct(String folder, ProductCreateInput input, Optional<MultipartFile> photo1, Optional<MultipartFile> photo2, Optional<MultipartFile> photo3, Optional<MultipartFile> photo4) {
        ProductEntity product = mapper.inputToEntity(input);
        CategoryEntity category = categoryRepository.getById(input.getCategoryID());
        product.setCategory(category);
        System.out.println("1");
        //thêm ảnh vào sản phẩm
        if(!photo1.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo1.get(), folder);
            product.setPhoto(filePhoto.getName());
            System.out.println("2");
        }
        //thêm sản phẩm
        ProductEntity productSave = productRepository.save(product);
        System.out.println("3");
        if(!photo2.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo2.get(), folder);
            photoRepository.save(new PhotoEntity(null,filePhoto.getName(),productSave));
        }
        if(!photo3.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo3.get(), folder);
            photoRepository.save(new PhotoEntity(null,filePhoto.getName(),productSave));
        }
        if(!photo4.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo4.get(), folder);
            photoRepository.save(new PhotoEntity(null,filePhoto.getName(),productSave));
        }
        ProductEntity productFinal = productRepository.getById(product.getId());
        System.out.println("4");
        return ResponseEntity.ok(mapper.entityToDto(productFinal));
    }

    @Override
    @Transactional
    public ResponseEntity<ProductDto> updateProduct(String folder, Integer id, ProductUpdateInput input, Optional<MultipartFile> photo1, Optional<MultipartFile> photo2, Optional<MultipartFile> photo3, Optional<MultipartFile> photo4) {
        ProductEntity product = productRepository.getById(id);
        updateMapper.inputToEntity(input,product);
        CategoryEntity category = categoryRepository.getById(input.getCategoryID());
        product.setCategory(category);
        //thêm ảnh vào sản phẩm
        if(!photo1.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo1.get(), folder);
            product.setPhoto(filePhoto.getName());
        }
        //thêm sản phẩm
        productRepository.save(product);
        if(!photo2.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo2.get(), folder);
            photoRepository.save(new PhotoEntity(input.getIdPhoto2(),filePhoto.getName(),product));
        }
        if(!photo3.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo3.get(), folder);
            photoRepository.save(new PhotoEntity(input.getIdPhoto3(),filePhoto.getName(),product));
        }
        if(!photo4.isEmpty()) {
            File filePhoto = upLoadService.savePhoto(photo4.get(), folder);
            photoRepository.save(new PhotoEntity(input.getIdPhoto4(),filePhoto.getName(),product));
        }
        ProductEntity productFinal = productRepository.getById(product.getId());
        return ResponseEntity.ok(mapper.entityToDto(productFinal));
    }

    // Tìm kiếm sản phẩm
    @Override
    @Transactional
    public ResponseEntity<Page<ProductDto>> searchProduct(ProductParam param, Pageable page) {
        Page<ProductDto> lisProductDto = productRepository.searchProduct(param,page).map(mapper::entityToDto);
        return ResponseEntity.ok(lisProductDto);
    }
    // ẩn sản phẩm
    @Override
    @Transactional
    public ResponseEntity<List<ProductDto>> hideProduct(Integer[] ids) {
        List<ProductEntity> listProduct = productRepository.findByIdInAndStatusIsFalse(ids);
        listProduct.forEach(p->{
            p.setStatus(true);
            productRepository.save(p);
        });
        List<ProductDto> listProductDtos = listProduct.stream().map(mapper::entityToDto).collect(Collectors.toList());
        return ResponseEntity.ok(listProductDtos);
    }

    @Override
    @Transactional
    public ResponseEntity<List<ProductDto>> presentProduct(Integer[] ids) {
        List<ProductEntity> listProduct = productRepository.findByIdInAndStatusIsTrue(ids);
        listProduct.forEach(p->{
            p.setStatus(false);
            productRepository.save(p);
        });
        List<ProductDto> listProductDtos = listProduct.stream().map(mapper::entityToDto).collect(Collectors.toList());
        return ResponseEntity.ok(listProductDtos);
    }

    @Override
    @Transactional
    public ResponseEntity<List<ProductDto>> findAll(String name) {
        List<ProductEntity> lstenEntities = productRepository.search(name);
        List<ProductDto> lstProductDtos = mapper.EntitiesToDtos(lstenEntities);
        return ResponseEntity.ok().body(lstProductDtos);
    }


}
