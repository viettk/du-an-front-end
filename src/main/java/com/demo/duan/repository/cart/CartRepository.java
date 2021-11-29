package com.demo.duan.repository.cart;

import com.demo.duan.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer> {
    Optional<CartEntity> findByCustomer_Id(Integer id);

    CartEntity getByCustomer_Id(Integer id);
}
