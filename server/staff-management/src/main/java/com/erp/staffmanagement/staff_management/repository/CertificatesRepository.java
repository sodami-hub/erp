package com.erp.staffmanagement.staff_management.repository;

import com.erp.staffmanagement.staff_management.entity.Certificates;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificatesRepository extends JpaRepository<Certificates, Long> {

  List<Certificates> findCertificatesByStaffId(Long id);
}
