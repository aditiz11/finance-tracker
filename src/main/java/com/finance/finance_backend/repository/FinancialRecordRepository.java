package com.finance.finance_backend.repository;

import com.finance.finance_backend.entity.FinancialRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {
    List<FinancialRecord> findByType(String type);

    Page<FinancialRecord> findByCategory(String category, Pageable pageable);

    Page<FinancialRecord> findByCategoryAndType(String category, String type, Pageable pageable);

    Page<FinancialRecord> findByDateBetween(LocalDate start, LocalDate end, Pageable pageable);

    Page<FinancialRecord> findByNotesContaining(String keyword, Pageable pageable);

    Page<FinancialRecord> findByDeletedFalse(Pageable pageable);

    Page<FinancialRecord> findByCategoryAndTypeAndDeletedFalse(
            String category,
            String type,
            Pageable pageable
    );

    Page<FinancialRecord> findByDateBetweenAndDeletedFalse(
            LocalDate start,
            LocalDate end,
            Pageable pageable
    );
}
