package com.skillsory.service;

import com.skillsory.dto.LoginRequest;
import com.skillsory.dto.LoginResponse;
import com.skillsory.dto.RegisterRequest;
import com.skillsory.entity.User;
import com.skillsory.repository.UserRepository;
import com.skillsory.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) throws Exception {
        Optional<User> user = userRepository.findByEmail(request.getEmail());
        
        if (user.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User foundUser = user.get();
        
        if (!passwordEncoder.matches(request.getPassword(), foundUser.getPassword())) {
            throw new Exception("Invalid password");
        }
        
        if (!foundUser.getIsActive()) {
            throw new Exception("User account is inactive");
        }
        
        String token = jwtUtil.generateToken(foundUser.getId(), foundUser.getEmail(), foundUser.getRole().toString());
        
        return new LoginResponse(
                true,
                token,
                foundUser.getId(),
                foundUser.getName(),
                foundUser.getEmail(),
                foundUser.getRole().toString()
        );
    }
    
    public LoginResponse register(RegisterRequest request) throws Exception {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new Exception("Email already registered");
        }
        
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));
        newUser.setIsActive(true);
        
        User savedUser = userRepository.save(newUser);
        
        String token = jwtUtil.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRole().toString());
        
        return new LoginResponse(
                true,
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole().toString()
        );
    }
}
