package com.srmpjt.boardback.constants;

public enum Token {
    HEADER("Authorization"), PREFIX("Bearer "), TYPE("JWT");

    public String text;

    private Token(String text) {
        this.text = text;
    }
}
