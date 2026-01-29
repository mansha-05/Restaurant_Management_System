package com.rms.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackRequestDto {

    private Long userId;
    private Long orderId;
    private int rating;
    private String comments;
}
