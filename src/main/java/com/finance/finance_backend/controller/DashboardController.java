package com.finance.finance_backend.controller;


import com.finance.finance_backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Month;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService service;

    @GetMapping("/summary")
    public Map<String, Double> summary(){
        return service.getSummary();
    }

    @GetMapping("/category-summary")
    public Map<String, Double> categorySummary() {
        return service.categorySummary();
    }

    @GetMapping("/monthly-expenses")
    public Map<Month, Double> monthlyExpenses() {
        return service.monthlyExpenses();
    }
}
