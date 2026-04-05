package com.finance.finance_backend.service;

import com.finance.finance_backend.entity.FinancialRecord;
import com.finance.finance_backend.repository.FinancialRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final FinancialRecordRepository repo;

    public Map<String, Double> getSummary(){
        List<FinancialRecord> records = repo.findAll();

        double income = records.stream()
                .filter(r -> r.getType().equals("INCOME"))
                .mapToDouble(FinancialRecord::getAmount)
                .sum();

        double expense = records.stream()
                .filter(r -> r.getType().equals("EXPENSE"))
                .mapToDouble(FinancialRecord::getAmount)
                .sum();

        Map<String, Double> map = new HashMap<>();
        map.put("totalIncome", income);
        map.put("totalExpense", expense);
        map.put("netBalance", income - expense);

        return map;

    }

    public Map<String, Double> categorySummary() {
        return repo.findAll().stream()
                .collect(Collectors.groupingBy(
                        FinancialRecord::getCategory,
                        Collectors.summingDouble(FinancialRecord::getAmount)
                ));
    }

    public Map<Month, Double> monthlyExpenses() {
        return repo.findAll().stream()
                .filter(r -> r.getType().equals("EXPENSE"))
                .collect(Collectors.groupingBy(
                        r -> r.getDate().getMonth(),
                        Collectors.summingDouble(FinancialRecord::getAmount)
                ));
    }
}
