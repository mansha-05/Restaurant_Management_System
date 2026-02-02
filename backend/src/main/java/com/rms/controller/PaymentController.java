package com.rms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.rms.dtos.PaymentConfirmReq;
import com.rms.dtos.StripeCheckoutReq;
import com.rms.service.PaymentService;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PaymentController {
	private final PaymentService paymentService;
	
    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(
            @RequestBody StripeCheckoutReq req
    ) {
        try {
            SessionCreateParams params =
                SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:5173/checkout")
                    .addLineItem(
                        SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("inr")
                                    .setUnitAmount((long)(req.getAmount() * 100)) // ₹ → paise
                                    .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Restaurant Bill Payment")
                                            .build()
                                    )
                                    .build()
                            )
                            .build()
                    )
                    .build();

            Session session = Session.create(params);

            return ResponseEntity.ok(
                java.util.Map.of("url", session.getUrl())
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(
            @RequestBody PaymentConfirmReq req
    ) {
        paymentService.handleSuccessfulPayment(req);
        return ResponseEntity.ok(Map.of("status", "ORDER_CREATED"));
    }

}
