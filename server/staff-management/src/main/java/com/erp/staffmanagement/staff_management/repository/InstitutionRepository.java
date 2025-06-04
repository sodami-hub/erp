package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, String> {

}
