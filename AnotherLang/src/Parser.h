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


    Token* OldGetNextToken() {
        return currentToken = &(tokens[position++]);
    }

//    Token* GetCurrentToken() {
//        return currentToken = &(tokens[position]);
//    }
//
//    Token LookAhead(int offset = 1) {
//        return tokens[position + offset];
//    }

    void Parse();
    std::shared_ptr<ASTNode> ParseDeclaration();
    std::shared_ptr<ASTNode> ParseAssignment();         // identifier equals value
    std::shared_ptr<ASTNode> ParseValue();              // identifier or constant
    std::shared_ptr<ASTNode> ParseOperator();           // + - * / etc
    std::shared_ptr<ASTNode> ParseExpression();         // A + B etc
    std::shared_ptr<ASTNode> ParseParenExpression();    // (A + B ) etc

protected:
    Token* currentToken = nullptr;
    unsigned int position = 0;
    std::vector<Token> tokens;
    std::vector<Token>::iterator tokenItor;
    std::shared_ptr<ASTNode> abstractSyntaxTree;
};

