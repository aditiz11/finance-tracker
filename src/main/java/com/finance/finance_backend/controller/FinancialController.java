package com.finance.finance_backend.controller;

import com.finance.finance_backend.entity.FinancialRecord;
import com.finance.finance_backend.service.FinancialService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@EnableMethodSecurity
@RequestMapping("/api/records")
@RequiredArgsConstructor
public class FinancialController {
    private final FinancialService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public FinancialRecord create(@RequestBody FinancialRecord record) {
        return service.create(record);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Record deleted successfully");
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    public ResponseEntity<?> getRecords(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) LocalDate start,
            @RequestParam(required = false) LocalDate end,
            Pageable pageable
    ) {

        Page<FinancialRecord> page = service.getRecords(category, type, start, end, pageable);

        return ResponseEntity.ok(
                java.util.Map.of(
                        "content", page.getContent(),
                        "page", page.getNumber(),
                        "size", page.getSize(),
                        "totalElements", page.getTotalElements(),
                        "totalPages", page.getTotalPages()
                )
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    @PutMapping("/{id}")
    public FinancialRecord updateRecord(
            @PathVariable Long id,
            @RequestBody FinancialRecord record) {
        System.out.println("UPDATE HIT");
        return service.updateRecord(id, record);

    }

    @GetMapping("/{id}")
    public FinancialRecord getById(@PathVariable Long id) {
        return service.getById(id);
    }

}
