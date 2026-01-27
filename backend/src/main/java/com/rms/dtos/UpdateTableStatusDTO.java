package com.rms.dtos;
import com.rms.entities.TableStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTableStatusDTO {

    @NotNull(message = "Status is required")
    private TableStatus status;
}
