package com.finance.finance_backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String role; //admin, analyst, viewer
}
