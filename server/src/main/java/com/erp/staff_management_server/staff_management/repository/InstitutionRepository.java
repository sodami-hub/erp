package com.erp.staff_management_server.staff_management.repository;

import com.erp.staff_management_server.staff_management.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, String> {

}
