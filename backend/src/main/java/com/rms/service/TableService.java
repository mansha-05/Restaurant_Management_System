package com.rms.service;

import java.util.List;
import com.rms.dtos.TableResponseDTO;
import com.rms.dtos.ApiResponse; // Ensure this is imported

public interface TableService {

    // For the Management Dashboard Grid
    List<TableResponseDTO> getAllTables();

    // For the "Add New Table" Modal
    // This MUST return ApiResponse to match your Controller's expectations
    ApiResponse addTable(TableResponseDTO request);

	ApiResponse updateTable(Long tableId, TableResponseDTO request);
    ApiResponse deleteTable(Long tableId);
    ApiResponse updateTableStatus(Long tableId, String status);
}