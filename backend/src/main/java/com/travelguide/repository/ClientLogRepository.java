package com.travelguide.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelguide.model.ClientLog;

public interface ClientLogRepository extends JpaRepository<ClientLog, Long> {}
