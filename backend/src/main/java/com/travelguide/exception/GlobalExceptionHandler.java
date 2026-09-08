package com.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
	    ErrorResponse error = new ErrorResponse(
	        HttpStatus.NOT_FOUND.value(),
	        "Resource Not Found",
	        ex.getMessage()
	    );
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
	    ErrorResponse error = new ErrorResponse(
	        HttpStatus.INTERNAL_SERVER_ERROR.value(),
	        "Internal Server Error",
	        "Something went wrong!"
	    );
	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}
}