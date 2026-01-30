package com.rms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.TableResponseDTO;
import com.rms.service.TableService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/manager/tables")
@RequiredArgsConstructor
public class ManagerTableController {

    private final TableService tableService;

    @GetMapping
    public ResponseEntity<List<TableResponseDTO>> getAllTables() {
        return ResponseEntity.ok(tableService.getAllTables());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addTable(@RequestBody TableResponseDTO dto) {
        return ResponseEntity.ok(tableService.addTable(dto));
    }

    @PutMapping("/{tableId}")
    public ResponseEntity<ApiResponse> updateTable(
            @PathVariable Long tableId,
            @RequestBody TableResponseDTO dto) {
        return ResponseEntity.ok(tableService.updateTable(tableId, dto));
    }

    @DeleteMapping("/{tableId}")
    public ResponseEntity<ApiResponse> deleteTable(@PathVariable Long tableId) {
        return ResponseEntity.ok(tableService.deleteTable(tableId));
    }

}