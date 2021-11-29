package com.demo.duan.controller.login;

import com.demo.duan.entity.CustomerEntity;
import com.demo.duan.entity.StaffEntity;
import com.demo.duan.repository.customer.CustomerRepository;
import com.demo.duan.repository.staff.StaffRepository;
import com.demo.duan.service.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/check-link")
@CrossOrigin(origins = "*")
public class CheckLink {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Value("${secrert.login}")
    private String JWT_SECRET;
    @GetMapping
    public ResponseEntity<Object> checkLink(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        bearerToken =bearerToken.substring(7);
        if (StringUtils.hasText(bearerToken) && tokenProvider.validateToken(bearerToken,JWT_SECRET)) {
            // Lấy id user từ chuỗi jwt
            String email = tokenProvider.getUserIdFromJWT(bearerToken, JWT_SECRET);
            Optional<StaffEntity> staff = staffRepository.findByEmail(email);
            if(staff.isPresent()){
                staff.get().setToken(bearerToken);
                if(staff.get().getRole()==1){
                    return ResponseEntity.ok("STAFF");
                }else {
                    return ResponseEntity.ok("ADMIN");
                }
            }else {
                CustomerEntity customer = customerRepository.findByEmail(email).get();
                customer.setToken(bearerToken);
                return ResponseEntity.ok("USER");
            }
        }else{
            return new ResponseEntity<Object>(false, HttpStatus.BAD_REQUEST);
        }
    }
}