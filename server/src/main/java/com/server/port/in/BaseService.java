package com.server.port.in;

import java.util.List;

public interface BaseService<req, res, Domain> {
    res create(req entity);
    res update(req entity);
    void delete(Long id);
    res findById(Long id);
    List<res> findAll();
    Domain entityToDomain(req entity);
    res domainToEntity(Domain domain);
}
