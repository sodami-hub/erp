package com.erp.beneficiarymanagement.beneficiary_management.repository;

import com.erp.beneficiarymanagement.beneficiary_management.entity.Beneficiaries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeneficiariesRepository extends JpaRepository<Beneficiaries, Long> {

}
