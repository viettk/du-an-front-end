package com.demo.duan.service.cartdetail;

import com.demo.duan.entity.LocalStorageCartDetail;
import com.demo.duan.entity.ProductEntity;
import com.demo.duan.service.cartdetail.dto.CartDetailDto;
import com.demo.duan.service.cartdetail.input.CartDetailInput;
import com.demo.duan.service.cartdetail.input.CartDetalInputDelete;
import com.demo.duan.service.cartdetail.param.CartDetailParam;
import com.demo.duan.service.product.dto.ProductDto;
import com.demo.duan.service.product.param.ProductParam;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

public interface CartDetailService {
    public ResponseEntity<List<CartDetailDto>> find(CartDetailParam param);

    public ResponseEntity<CartDetailDto> addToCartDetail(CartDetailInput input);

    /* tăng số lượng sp  */
    public ResponseEntity<CartDetailDto> updateNumberUp(CartDetailInput input);

    /* Giảm số lượng sp */
    public ResponseEntity<CartDetailDto> updateNumberDown(CartDetailInput input);

    public ResponseEntity<CartDetailDto> updateNumber(CartDetailInput input);

   /* xóa sản phẩm trong giỏ hàng */
    public ResponseEntity<CartDetailDto> delete(CartDetalInputDelete input);

    /* Tính thành tiền của Giỏ hàng - Cart */
    public BigDecimal totalOfCart(Integer cartId);

    /* Kiểm tra số lượng sp trong giỏ hàng */
    Integer numberOfCartDetail(Integer cartId);

    /* lấy sản phẩm trong 1 giỏ hàng chi tiếts */
    public ResponseEntity<CartDetailDto> getOne(Integer cartDetailId);

    public boolean checkNumberOfCart(Integer cartid, Integer productId);

    /* lấy thông tin cân nặng của sản phẩm trong giỏ hàng */
    public Float getAllWeight(Integer cartId);

    /* lấy tổng số lượng sp trong đơn hàng */
    public Integer getTotalItems(Integer cartid);

    public ResponseEntity<List<CartDetailDto>> createByCustomerNotLogin(Integer id , List<LocalStorageCartDetail> input);

    public Integer soluongtronggio(Integer idCusomer);
}