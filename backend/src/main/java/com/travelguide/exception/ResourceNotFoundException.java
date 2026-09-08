package com.travelguide.exception;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
