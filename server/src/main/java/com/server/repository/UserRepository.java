package com.server.repository;
import com.server.domain.info.Intro;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Intro, Long>{

}