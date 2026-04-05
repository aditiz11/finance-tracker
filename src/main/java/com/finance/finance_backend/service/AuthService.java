package com.finance.finance_backend.service;

import com.finance.finance_backend.dto.AuthRequest;
import com.finance.finance_backend.entity.Role;
import com.finance.finance_backend.entity.User;
import com.finance.finance_backend.repository.UserRepository;
import com.finance.finance_backend.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(AuthRequest request) {

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        String roleFromRequest = request.getRole();

        if (roleFromRequest == null || roleFromRequest.isEmpty()) {
            user.setRole(Role.ROLE_VIEWER); // default role ✅
        } else {
            user.setRole(Role.valueOf("ROLE_" + roleFromRequest.toUpperCase()));
        }

        user.setActive(true);

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(AuthRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getUsername(), user.getRole().name());
    }
}