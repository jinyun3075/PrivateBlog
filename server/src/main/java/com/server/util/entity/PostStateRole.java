package com.server.util.entity;

public enum PostStateRole{
    RELEASED(0L), TEMP(1L), WATING(2L), DELETED(3L);

    private final long id;
    private PostStateRole(long id) {
        this.id = id;
    }
    public long getId() {
        return id;
    }
}