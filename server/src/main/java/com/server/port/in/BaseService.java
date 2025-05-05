package com.server.port.in;

import java.util.List;

public interface BaseService<Entity, Domain> {
    Entity create(Entity t);
    Entity update(Entity t);
    void delete(Long id);
    Entity findById(Long id);
    List<Entity> findAll();
    Domain entityToDomain(Entity entity);
    Entity domainToEntity(Domain domain);
}
