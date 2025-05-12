package com.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.adapter.in.BlogPacade;
import com.server.dto.TagDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class blogController {
    private final BlogPacade blogPacade;

    @PostMapping("/insert/tag")
    public ResponseEntity<TagDTO> insertTag(@RequestBody TagDTO dto) {
        return new ResponseEntity<>(blogPacade.createTag(dto), HttpStatus.OK);
    }
}
