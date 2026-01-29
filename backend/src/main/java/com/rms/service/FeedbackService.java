package com.rms.service;

import com.rms.dtos.FeedbackRequestDto;
import com.rms.entities.Feedback;

public interface FeedbackService {

    Feedback addFeedback(FeedbackRequestDto dto);

}
