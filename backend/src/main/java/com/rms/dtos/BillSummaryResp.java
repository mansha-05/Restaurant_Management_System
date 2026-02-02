package com.rms.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillSummaryResp {
    private double subtotal;
    private double tax;
    private double reservationPrice;
//    private double reservationDeduction; // 90%
//    private double refundableAmount;
    private double finalPayable;
    private boolean firstOrder;
}
