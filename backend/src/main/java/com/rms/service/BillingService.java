package com.rms.service;

import java.util.List;
import java.util.Map;

import com.rms.dtos.BillCalcReq;
import com.rms.dtos.BillSummaryResp;
import com.rms.dtos.CartItemReq;
import com.rms.entities.TableReservation;

public interface BillingService {
	BillSummaryResp generateBill(List<CartItemReq> items, TableReservation reservation
    );
}
