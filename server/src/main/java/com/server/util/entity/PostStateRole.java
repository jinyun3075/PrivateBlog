package com.server.util.entity;

public enum PostStateRole{
    RELEASED(1L), TEMP(2L), WATING(3L), DELETED(4L);

    private final long id;
    private PostStateRole(long id) {
        this.id = id;
    }
    public long getId() {
        return id;
    }
}