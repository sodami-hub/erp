package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.DependencyDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<DependencyDocuments, Long> {

}
