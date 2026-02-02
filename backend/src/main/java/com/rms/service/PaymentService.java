package com.rms.service;

import com.rms.dtos.PaymentConfirmReq;

public interface PaymentService {
	void handleSuccessfulPayment(PaymentConfirmReq req);
}
