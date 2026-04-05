package com.finance.finance_backend.dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String username;
    private String password;
    private String role; // used only for register
}