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

    void Parse(std::shared_ptr<ASTNode> & ast);
    std::shared_ptr<ASTNode> ParseStatements();         // multiple statements in a row
    std::shared_ptr<ASTNode> ParseDeclaration();        // decl var
    std::shared_ptr<ASTNode> ParseAssignment();         // identifier equals value
    std::shared_ptr<ASTNode> ParseNumber();             // constant        3
    std::shared_ptr<ASTNode> ParseIdentifier();         // identifier      nFred
    std::shared_ptr<ASTNode> ParseOperator();           // + - * / etc
    std::shared_ptr<ASTNode> ParseExpression();         // A + B etc

    std::shared_ptr<ASTNode> ParseWhile();
    std::shared_ptr<ASTNode> ParseIf();
    std::shared_ptr<ASTNode> ParseBlock();
    std::shared_ptr<ASTNode> ParseProcedure();
    std::shared_ptr<ASTNode> ParseFunc();

protected:
    std::vector<Token> tokens;
    std::vector<Token>::iterator tokenItor;
    std::shared_ptr<ASTNode> abstractSyntaxTree;
};

