package com.server.repository.user;
import com.server.domain.info.Intro;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Intro, Long>{

}