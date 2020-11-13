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
    }

    void Parse();
    std::shared_ptr<ASTNode> ParseDeclaration();
    std::shared_ptr<ASTNode> ParseAssignment();         // identifier equals value
    std::shared_ptr<ASTNode> ParseValue();              // identifier or constant
    std::shared_ptr<ASTNode> ParseNumber();              // constant        3
    std::shared_ptr<ASTNode> ParseIdentifier();          // identifier      nFred
    std::shared_ptr<ASTNode> ParseOperator();           // + - * / etc
    std::shared_ptr<ASTNode> ParseExpression();         // A + B etc


protected:
    std::vector<Token> tokens;
    std::vector<Token>::iterator tokenItor;
    std::shared_ptr<ASTNode> abstractSyntaxTree;
};

