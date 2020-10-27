//
// Created by sean on 25/09/2020.
//

#pragma once

#include <vector>
#include <memory>
#include "Tokens.h"

class ASTNode;

class Parser {
public:
    Parser() = default;

    void SetInput(const std::vector<Token> T) {
        tokens = T;
        position = 0;
    }

    Token* GetNextToken() {
        return currentToken = &(tokens[position++]);
    }

    Token* GetCurrentToken() {
        return currentToken = &(tokens[position]);
    }

    Token LookAhead(int offset = 1) {
        return tokens[position + offset];
    }

    void Parse();
    std::shared_ptr<ASTNode> ParseStatement();
    std::shared_ptr<ASTNode> ParseDeclaration();
    std::shared_ptr<ASTNode> ParseAssignment();

protected:
    Token* currentToken = nullptr;
    unsigned int position = 0;
    std::vector<Token> tokens;
    std::shared_ptr<ASTNode> abstractSyntaxTree;
};

