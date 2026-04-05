package com.finance.finance_backend.service;

import com.finance.finance_backend.entity.FinancialRecord;
import com.finance.finance_backend.repository.FinancialRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FinancialService {

    private final FinancialRecordRepository repo;

    public FinancialRecord create(FinancialRecord record) {
        return repo.save(record);
    }

    public List<FinancialRecord> getAll(){
        return repo.findAll();
    }

    public void delete(Long id) {
        FinancialRecord record = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        record.setDeleted(true);
        repo.save(record);
    }

    public Page<FinancialRecord> getRecords(
            String category,
            String type,
            LocalDate start,
            LocalDate end,
            Pageable pageable
    ) {

        Page<FinancialRecord> records = repo.findByDeletedFalse(pageable);

        if (category != null && type != null) {
            return repo.findByCategoryAndType(category, type, pageable);
        }

        if (start != null && end != null) {
            return repo.findByDateBetween(start, end, pageable);
        }

        return repo.findAll(pageable);
    }

    public void deleteRecord(Long id) {
        repo.deleteById(id);
    }

    public FinancialRecord updateRecord(Long id, FinancialRecord newRecord) {
        FinancialRecord existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        existing.setAmount(newRecord.getAmount());
        existing.setType(newRecord.getType());
        existing.setCategory(newRecord.getCategory());
        existing.setDate(newRecord.getDate());

        return repo.save(existing);
    }

    public FinancialRecord getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }
}
