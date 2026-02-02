package com.rms.service;

import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rms.dtos.ApiResponse;
import com.rms.dtos.TableResponseDTO;
import com.rms.entities.TableEntity;
import com.rms.entities.TableStatus;
import com.rms.repository.TableRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepo;

    @Autowired
    private ModelMapper modelMapper;

    public TableServiceImpl(TableRepository tableRepo) {
        this.tableRepo = tableRepo;
    }

    @Override
    public List<TableResponseDTO> getAllTables() {
        List<TableEntity> tableEntities = tableRepo.findAll();
        List<TableResponseDTO> tableDtos = new ArrayList<>();

        for (TableEntity entity : tableEntities) {
            TableResponseDTO dto = new TableResponseDTO();

            dto.setTableId(entity.getId());
            // Use the getter from DTO: setTableNo
            dto.setTable_no(entity.getTable_no());
            dto.setCapacity(entity.getCapacity());
            dto.setReservationPrice(entity.getReservationPrice());
            // Fix: Convert Enum to String for the DTO
            if (entity.getStatus() != null) {
                dto.setStatus(entity.getStatus().name());
            }

            tableDtos.add(dto);
        }
        return tableDtos;
    }

    @Override
    public ApiResponse addTable(TableResponseDTO request) {
        TableEntity table = new TableEntity();

        // Lombok generates getTable_no() because your field name is table_no
        table.setTable_no(request.getTable_no());
        table.setCapacity(request.getCapacity());
        table.setReservationPrice(request.getReservationPrice());
        // Fix Status Mapping
        if (request.getStatus() != null) {
            try {
                table.setStatus(TableStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                table.setStatus(TableStatus.AVAILABLE);
            }
        } else {
            table.setStatus(TableStatus.AVAILABLE);
        }

        tableRepo.save(table);

        // Use request.getTable_no() so the message shows the actual number
        return new ApiResponse("Table " + request.getTable_no() + " added successfully", "Success");
    }

    @Override
    public ApiResponse updateTable(Long tableId, TableResponseDTO request) {
        // 1. Find the existing table or throw an exception
        TableEntity table = tableRepo.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found with ID: " + tableId));

        // 2. Update the fields from the DTO
        table.setTable_no(request.getTable_no());
        table.setCapacity(request.getCapacity());
        table.setReservationPrice(request.getReservationPrice());
        // 3. Update Status (Enum conversion)
        if (request.getStatus() != null) {
            try {
                table.setStatus(TableStatus.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Keep existing status if input is invalid
            }
        }

        // 4. Save the updated entity
        tableRepo.save(table);

        return new ApiResponse("Table " + table.getTable_no() + " updated successfully", "Success");
    }

    @Override
    public ApiResponse deleteTable(Long tableId) {
        TableEntity table = tableRepo.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found with ID: " + tableId));
        tableRepo.delete(table);
        return new ApiResponse("Table " + table.getTable_no() + " deleted successfully", "Success");
    }

    @Override
    public ApiResponse updateTableStatus(Long tableId, String status) {
        TableEntity table = tableRepo.findById(tableId)
                .orElseThrow(() -> new RuntimeException("Table not found with ID: " + tableId));

        try {
            table.setStatus(TableStatus.valueOf(status.toUpperCase()));
            tableRepo.save(table);
            return new ApiResponse("Table " + table.getTable_no() + " status updated to " + status, "Success");
        } catch (IllegalArgumentException e) {
            return new ApiResponse("Invalid status: " + status, "Error");
        }
    }
}