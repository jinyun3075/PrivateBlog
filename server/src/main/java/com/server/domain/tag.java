package com.server.domain;

import java.sql.Date;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class tag {
    private Long id;
    private String name;
    private String description;
    private Date reg_date;
    private Date mod_date;
    private char use_yn;
}
