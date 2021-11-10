package com.demo.duan.service.cartdetail;

import com.demo.duan.entity.CartDetailEntity;
import com.demo.duan.entity.CartEntity;
import com.demo.duan.entity.ProductEntity;
import com.demo.duan.repository.cart.CartRepository;
import com.demo.duan.repository.cartdetail.CartDetailRepository;
import com.demo.duan.repository.product.ProductRepository;
import com.demo.duan.service.cartdetail.dto.CartDetailDto;
import com.demo.duan.service.cartdetail.input.CartDetailInput;
import com.demo.duan.service.cartdetail.input.CartDetalInputDelete;
import com.demo.duan.service.cartdetail.mapper.CartDetailMapper;
import com.demo.duan.service.cartdetail.param.CartDetailParam;
import com.demo.duan.service.product.dto.ProductDto;
import com.demo.duan.service.product.param.ProductParam;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class CartDetailServiceImpl implements CartDetailService{

    private final CartDetailRepository repository;

    private final CartDetailMapper mapper;

    private final ProductRepository productRepository;

    private final CartRepository cartRepository;

    @Override
    @Transactional
    public ResponseEntity<List<CartDetailDto>> find(CartDetailParam param) {
        List<CartDetailEntity> lst = repository.find(param);
        List<CartDetailDto> lstDto =mapper.EntitiesToDtos(lst);
        return ResponseEntity.ok().body(lstDto);
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> addToCartDetail(CartDetailInput input) {

        /* Lấy thông tin sản phẩm */
        ProductEntity product = productRepository.getById(input.getProductId());
        /* Lấy thông tin Giỏ hàng */
        CartEntity cartEntity = cartRepository.getById(input.getCartId());

        /* Lấy giá sản phẩm */
        BigDecimal price = product.getPrice();
        BigDecimal total= BigDecimal.ZERO;

        /* Kiểm tra trong kho có đủ sp ko */
        if(product.getNumber() < input.getNumber()){
            throw new RuntimeException("Sản phẩm không đủ");
        }

        /* Kiểm tra sản phẩm đã có sẵn trong Giỏ hàng chưa */
        Integer count = repository.countAllByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());

        /* Nếu có r thì cập nhật số lượng và tổng tiền */
        if(count > 0){
            /* Lấy thông tin giỏ hàng chi tiết */
            CartDetailEntity entity = repository.findByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());
            /* Tăng số lượng trong giỏ hàng chi tiết */
            int number = input.getNumber() ;
            Integer checkNumOfCartDetail = repository.checkNumberOfCartDetail(input.getCartId());
            if(number+checkNumOfCartDetail >= 15){
                throw new RuntimeException("Giỏ hàng không được quá 15 sản phẩm");
            }

            int newNum = number + entity.getNumber();
            /* Tính lại tổng tiền từng sản phẩm */
            total = price.multiply(BigDecimal.valueOf(newNum));
            mapper.inputToEntity(input, entity);

            /* Lưu thông tin giỏ hàng chi tiết */
            entity.setTotal(total);
            entity.setNumber(newNum);
            repository.save(entity);
            totalOfCart(cartEntity.getId());
            return ResponseEntity.ok().body(mapper.entityToDto(entity));
        }

        /* Thêm sản phẩm mới vào giỏ */
        else{
            /* Kiểm tra số lượng sp trong giỏ hàng phải <=15 */
            Integer checkNumberOfCartDetail = repository.checkNumberOfCartDetail(input.getCartId());
            if(checkNumberOfCartDetail == null){
                checkNumberOfCartDetail =0;
            } else if(checkNumberOfCartDetail > 15){
                throw new RuntimeException("Giỏ hàng không được quá 15 sản phẩm");
            }


            /* input -> entity */
            CartDetailEntity entity = mapper.inputToEntity(input);
            entity.setProduct(product);
            entity.setCart(cartEntity);

            /* Tính tổng tiền sản phẩm vừa thêm vào */
            total= price.multiply(BigDecimal.valueOf(input.getNumber()));

            /* Lưu giỏ hàng chi tiết */
            entity.setTotal(total);
            repository.save(entity);
            totalOfCart(cartEntity.getId());
            return ResponseEntity.ok().body(mapper.entityToDto(entity));
        }
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> updateNumberUp(CartDetailInput input) {

        int checkNumOfCartDetail = repository.checkNumberOfCartDetail(input.getCartId());
        System.out.println(checkNumOfCartDetail);
        if(checkNumOfCartDetail >=15){
            throw new RuntimeException("Số lượng trong giỏ hàng không vượt quá 15 sản phẩm");
        }


        CartDetailEntity entity = repository.findByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());
        Integer newNumber = entity.getNumber() + 1;

        /* Kiểm tra sản phẩm có đủ ko */
        if(entity.getProduct().getNumber() < newNumber){
            throw new RuntimeException("Sản phẩm không đủ");
        }
        BigDecimal total = entity.getProduct().getPrice().multiply(BigDecimal.valueOf(newNumber));
        entity.setNumber(newNumber);
        entity.setTotal(total);
        repository.save(entity);

        /* Lưu thành tiền giỏ hàng */
        totalOfCart(entity.getCart().getId());
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> updateNumberDown(CartDetailInput input) {
        CartDetailEntity entity = repository.findByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());
        Integer newNumber = entity.getNumber() - 1;

        /* Nếu sản phẩm <=0 thì xóa khỏi giỏ hàng */
        if(newNumber <= 0){
            CartDetalInputDelete newInput = new CartDetalInputDelete();
            newInput.setCartId(input.getCartId());
            newInput.setProductId(input.getProductId());
            System.out.println(newInput.getCartId());
            delete(newInput);
            return ResponseEntity.ok().body(mapper.entityToDto(entity));
        }


        BigDecimal total = entity.getProduct().getPrice().multiply(BigDecimal.valueOf(newNumber));
        entity.setNumber(newNumber);
        entity.setTotal(total);
        repository.save(entity);

        totalOfCart(entity.getCart().getId());
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> updateNumber(CartDetailInput input) {

        /* Lấy thông tin sản phẩm */
        ProductEntity product = productRepository.getById(input.getProductId());

        /* Kiểm tra có đủ sản phẩm trong kho để thêm vào giỏ hàng hay ko */
        if(product.getNumber() < input.getNumber()){
            throw new RuntimeException("Sản phẩm trong kho không đủ");
        }

        /* Kiểm tra số lượng trong giỏ phải < 15 */
        int checkNumOfCartDetail = repository.checkNumberOfCartDetail(input.getCartId());
        if(checkNumOfCartDetail >=15){
            throw new RuntimeException("Số lượng trong giỏ hàng không vượt quá 15 sản phẩm");
        }

        /* Nếu số lượng <=0 thì xóa sản phẩm khỏi giỏ hàng */
        if(input.getNumber() <= 0){
            throw new RuntimeException("Số lượng sản phẩm phải lớn hơn 1");
        }

        /* Lấy thông tin Giỏ hàng */
        CartEntity cartEntity = cartRepository.getById(input.getCartId());

        CartDetailEntity entity = repository.findByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());
        BigDecimal price = product.getPrice();
        mapper.inputToEntity(input, entity);
        entity.setTotal(price.multiply(BigDecimal.valueOf(input.getNumber())));
        repository.save(entity);

        totalOfCart(input.getCartId());
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> delete(CartDetalInputDelete input) {
        CartDetailEntity entity = repository.findByCart_IdAndProduct_Id(input.getCartId(), input.getProductId());
        repository.delete(entity);
        CartEntity cartEntity = cartRepository.getById(input.getCartId());
        cartEntity.setTotal(totalOfCart(input.getCartId()));
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }

    @Override
    @Transactional
    public BigDecimal totalOfCart(Integer cartId) {
        BigDecimal finalTotal = repository.totalOfCart(cartId);
        CartEntity cartEntity = cartRepository.getById(cartId);
        cartEntity.setTotal(finalTotal);
        return finalTotal;
    }

    @Override
    public Integer numberOfCartDetail(Integer cartId) {
        return null;
    }

    @Override
    @Transactional
    public ResponseEntity<CartDetailDto> getOne(Integer cartDetailId) {
        CartDetailEntity entity = repository.getById(cartDetailId);
        return ResponseEntity.ok().body(mapper.entityToDto(entity));
    }
}
