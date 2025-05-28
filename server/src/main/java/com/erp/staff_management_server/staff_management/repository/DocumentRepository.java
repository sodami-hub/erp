package com.erp.staff_management_server.staff_management.repository;

import com.erp.staff_management_server.staff_management.entity.DependencyDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<DependencyDocuments, Long> {

}
